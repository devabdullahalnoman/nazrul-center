import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";
import { logAudit } from "@/lib/audit";

export async function POST(request) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  let transactionId = "UNKNOWN";

  try {
    const rawFormPayload = await request.text();
    const params = new URLSearchParams(rawFormPayload);
    const webhookData = Object.fromEntries(params.entries());

    transactionId = webhookData.tran_id || "UNKNOWN";
    const validationId = webhookData.val_id;

    // A. DETERMINE CHANNEL ORIGIN IMMEDIATELY
    const acceptHeader = request.headers.get("accept") || "";
    const isBrowserRedirect =
      acceptHeader.includes("text/html") || !webhookData.ipn_notification;

    logger.info(
      `SSLCommerz endpoint hit via ${isBrowserRedirect ? "BROWSER_REDIRECT" : "BACKGROUND_IPN"} channel.`,
      {
        transactionId,
      },
    );

    // B. SEPARATE USER REDIRECTS FROM MECHANICAL MUTATIONS
    // If it's a customer browser redirecting back, do not make them wait for complex validation.
    // Send them straight to the success page where a real-time UI loading element checks fulfillment status.
    if (isBrowserRedirect) {
      logger.info(
        "Fast-tracking client browser context safely to success confirmation page view.",
        { transactionId },
      );
      return NextResponse.redirect(
        new URL(
          `/checkout/success?method=sslcommerz&tran=${transactionId}`,
          baseUrl,
        ),
        303,
      );
    }

    // =========================================================================
    // BACKGROUND AUTOMATED IPN PROCESSING ONLY (Runs asynchronously)
    // =========================================================================
    if (!transactionId || !validationId) {
      logger.error(
        "Fraud Signature Encountered by IPN: Missing parameters.",
        null,
        { transactionId },
      );
      return NextResponse.json(
        { success: false, error: "Missing payload signatures." },
        { status: 400 },
      );
    }

    // 1. Fetch remote validation receipt
    const verificationUrl =
      process.env.NODE_ENV === "production"
        ? `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`
        : `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${validationId}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}`;

    const gatewayResponse = await fetch(verificationUrl, { method: "GET" });
    if (!gatewayResponse.ok) {
      throw new Error(
        "Validation handshake could not be established with remote gateway API.",
      );
    }

    const validationResult = await gatewayResponse.json();
    const verifiedStatus = validationResult?.status || "";

    if (
      verifiedStatus !== "VALID" &&
      verifiedStatus !== "SUCCESS" &&
      verifiedStatus !== "VALIDATED"
    ) {
      logger.warn(
        "Fraud Prevention: Remote gateway signature validation failed.",
        { transactionId, verifiedStatus },
      );
      return NextResponse.json(
        { success: false, error: "Gateway transaction invalid." },
        { status: 400 },
      );
    }

    const gatewayVerifiedAmount = parseFloat(validationResult?.amount || "0");
    const supabaseAdmin = getSupabaseAdmin();

    // 2. RUN THE DATABASE MUTATION VIA ADMINISTRATIVE ELEVATION
    const { data: rpcResponse, error: rpcError } = await supabaseAdmin.rpc(
      "finalize_payment_idempotent",
      {
        p_tran_id: transactionId,
        p_val_id: validationId,
        p_verified_amount: gatewayVerifiedAmount,
        p_raw_payload: validationResult,
      },
    );

    // If it failed because it was already completed, answer back with a clean 200 OK so the gateway knows to stop pinging
    if (!rpcError && rpcResponse?.message?.includes("already finalized")) {
      logger.info(
        "IPN intercepted a duplicate tracking ping for an already completed transaction.",
        { transactionId },
      );
      return NextResponse.json(
        { success: true, message: "Transaction completed previously." },
        { status: 200 },
      );
    }

    if (rpcError || !rpcResponse?.success) {
      logger.error(
        "Settlement rejected by core database security processing engine rules:",
        new Error(rpcError?.message || rpcResponse?.error),
        { transactionId },
      );
      return NextResponse.json(
        { success: false, error: rpcError?.message || rpcResponse?.error },
        { status: 422 },
      );
    }

    // 3. Log external application auditing safely
    try {
      await logAudit({
        userId: null,
        action: "PAYMENT_SETTLED_WEBHOOK",
        entityType: "transaction",
        entityId: transactionId,
        metadata: {
          validationId,
          verifiedAmount: gatewayVerifiedAmount,
          gatewayStatus: verifiedStatus,
        },
      });
    } catch (auditLogErr) {
      logger.warn("Non-blocking audit table write skipped gracefully.", {
        transactionId,
      });
    }

    logger.info(
      "Transaction validated and finalized successfully by background IPN systems.",
      { transactionId },
    );
    return NextResponse.json(
      { success: true, message: "Transaction processed and locked safely." },
      { status: 200 },
    );
  } catch (err) {
    logger.error(
      "Critical Exception caught during webhook compilation processing loop:",
      err,
      { transactionId },
    );
    // Always return headless JSON statuses for core catch blocks to protect API routing protocols
    return NextResponse.json(
      { success: false, error: "Internal processing crash event triggered." },
      { status: 500 },
    );
  }
}
