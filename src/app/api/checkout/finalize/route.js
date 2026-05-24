import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import arcjet, { shield, detectBot, fixedWindow } from "@arcjet/next";
import crypto from "crypto";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { logAudit } from "@/lib/audit";

// ============================================================================
// FRAUD SHIELD CONFIGURATION (Arcjet)
// ============================================================================
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"], // Track by user IP
  rules: [
    // 1. WAF Shield: Blocks XSS, SQLi, and malicious payload structures
    shield({ mode: "LIVE" }),

    // 2. Strict Bot Blocking: NO bots should ever reach a payment gateway
    detectBot({ mode: "LIVE", allow: [] }),

    // 3. Financial Rate Limit: Max 5 checkout attempts per hour per IP
    // Prevents inventory hoarding and credit card testing attacks
    fixedWindow({ mode: "LIVE", window: "1h", max: 5 }),
  ],
});

// ============================================================================
// PAYLOAD VALIDATION (Zod)
// ============================================================================
const checkoutPayloadSchema = z.object({
  items: z
    .array(
      z
        .object({
          id: z.string().uuid(),
          quantity: z.coerce.number().int().positive(),
        })
        .passthrough(),
    )
    .min(1),
  shippingDetails: z.object({
    address: z.string().min(6),
    phone: z.string().min(11),
    shippingRegion: z.enum(["inside_dhaka", "outside_dhaka"]),
  }),
  paymentMethod: z.enum(["sslcommerz", "cod", "cash_on_delivery"]),
});

export async function POST(request) {
  try {
    // ------------------------------------------------------------------------
    // LAYER 1: FRAUD DETECTION & TRAFFIC SHIELD
    // ------------------------------------------------------------------------
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        logger.warn(
          "Fraud Shield: Checkout rate limit exceeded (Card Testing Prevention).",
        );
        return NextResponse.json(
          { error: "Too many checkout attempts. Please try again later." },
          { status: 429 },
        );
      }
      if (decision.reason.isBot()) {
        logger.warn("Fraud Shield: Bot attempt blocked at checkout.");
        return NextResponse.json(
          { error: "Automated checkouts are strictly prohibited." },
          { status: 403 },
        );
      }
      logger.warn("Fraud Shield: Malicious payload blocked by WAF.");
      return NextResponse.json(
        { error: "Request blocked by security rules." },
        { status: 403 },
      );
    }

    // ------------------------------------------------------------------------
    // LAYER 2: AUTHENTICATION
    // ------------------------------------------------------------------------
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Secure session expired or invalid." },
        { status: 401 },
      );
    }

    // ------------------------------------------------------------------------
    // LAYER 3: PAYLOAD VALIDATION
    // ------------------------------------------------------------------------
    const body = await request.json();
    const validation = checkoutPayloadSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Checkout validation failed.", {
        userId: user.id,
        issues: validation.error.errors,
      });
      return NextResponse.json(
        { error: "Invalid checkout data.", details: validation.error.errors },
        { status: 400 },
      );
    }

    let { items, shippingDetails, paymentMethod } = validation.data;
    if (paymentMethod === "cash_on_delivery") paymentMethod = "cod";

    // ------------------------------------------------------------------------
    // LAYER 4: ATOMIC DATABASE TRANSACTION
    // ------------------------------------------------------------------------
    const supabaseAdmin = getSupabaseAdmin();
    const generatedOrderId = crypto.randomUUID();
    const generatedTranId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const sanitizedDbItems = items.map((item) => ({
      id: item.id,
      quantity: Number(item.quantity),
    }));

    const { data: dbExecution, error: dbError } = await supabaseAdmin.rpc(
      "create_order_atomic",
      {
        p_order_id: generatedOrderId,
        p_user_id: user.id,
        p_shipping_address: shippingDetails.address,
        p_phone: shippingDetails.phone,
        p_payment_method: paymentMethod,
        p_tran_id: generatedTranId,
        p_items: sanitizedDbItems,
        p_shipping_region: shippingDetails.shippingRegion,
      },
    );

    if (dbError || !dbExecution?.success) {
      logger.error(
        "Database transaction rejected.",
        dbError || new Error(dbExecution?.error),
      );
      return NextResponse.json(
        { error: dbExecution?.error || "Transaction failed." },
        { status: 500 },
      );
    }

    const totalCalculatedAmount = dbExecution.total_amount;

    // ------------------------------------------------------------------------
    // LAYER 5: SECURE AUDIT LOGGING
    // ------------------------------------------------------------------------
    await logAudit({
      userId: user.id,
      action: "ORDER_CREATED",
      entityType: "order",
      entityId: generatedOrderId,
      metadata: {
        transactionId: generatedTranId,
        totalAmount: totalCalculatedAmount,
        paymentMethod,
      },
    });

    // ------------------------------------------------------------------------
    // LAYER 6: PAYMENT GATEWAY HANDSHAKE
    // ------------------------------------------------------------------------
    const systemBaseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (paymentMethod === "sslcommerz") {
      const gatewayEndpoint =
        process.env.NODE_ENV === "production"
          ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
          : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

      const payload = new URLSearchParams({
        store_id: process.env.SSLCOMMERZ_STORE_ID,
        store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
        total_amount: totalCalculatedAmount.toString(),
        currency: "BDT",
        tran_id: generatedTranId,
        success_url: `${systemBaseUrl}/api/checkout/payment-webhook`,
        fail_url: `${systemBaseUrl}/checkout?error=payment_failed`,
        cancel_url: `${systemBaseUrl}/checkout?error=payment_cancelled`,
        ipn_url: `${systemBaseUrl}/api/checkout/payment-webhook`,
        cus_name: user.user_metadata?.full_name || "Verified Client",
        cus_email: user.email,
        cus_add1: shippingDetails.address,
        cus_phone: shippingDetails.phone,
        shipping_method: "NO",
        product_name: "Nazrul Publication Order",
        product_category: "Books",
        product_profile: "physical-goods",
      });

      const gatewayResponse = await fetch(gatewayEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      const gatewayData = await gatewayResponse.json();
      if (gatewayData?.status === "SUCCESS" && gatewayData?.GatewayPageURL) {
        return NextResponse.json(
          { success: true, url: gatewayData.GatewayPageURL },
          { status: 200 },
        );
      }

      // If SSLCommerz goes down, fail gracefully
      logger.error("SSLCommerz handshake failed", gatewayData);
      return NextResponse.json(
        { error: "Payment gateway is currently unavailable." },
        { status: 502 },
      );
    }

    // COD Flow
    return NextResponse.json(
      {
        success: true,
        url: `/checkout/success?method=cod&tran=${generatedTranId}`,
      },
      { status: 200 },
    );
  } catch (err) {
    logger.error("Fatal checkout interface runtime exception.", err);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 },
    );
  }
}
