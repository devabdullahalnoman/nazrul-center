import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req) {
  try {
    const systemBaseUrl = process.env.BASE_URL || "http://localhost:3000";
    const originHeader = req.headers.get("origin");
    if (
      originHeader &&
      new URL(originHeader).origin !== new URL(systemBaseUrl).origin
    ) {
      return NextResponse.json({ error: "CSRF Exception" }, { status: 403 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            ),
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );

    const { items, address, phone } = await req.json();

    // 🌟 STRICT SERVER-SIDE CALCULATION: Query the DB directly
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
    const productIds = items.map((i) => i.id);
    const { data: dbProducts } = await supabaseAdmin
      .from("inventory")
      .select("id, price, stock_quantity")
      .in("id", productIds);

    let totalCalculatedAmount = 0;
    for (const item of items) {
      const dbProduct = dbProducts.find((p) => p.id === item.id);
      if (!dbProduct || dbProduct.stock_quantity < item.quantity)
        return NextResponse.json(
          { error: "Stock unavailable" },
          { status: 409 },
        );
      totalCalculatedAmount += Number(dbProduct.price) * item.quantity;
    }

    const tran_id = `NC-${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
    const { error: orderError } = await supabaseAdmin.from("orders").insert([
      {
        tran_id,
        user_id: user.id,
        total_amount: totalCalculatedAmount,
        currency: "BDT",
        status: "pending",
        shipping_address: address,
        contact_phone: phone,
        items,
      },
    ]);

    if (orderError) throw orderError;

    const sslcommerzPayload = new URLSearchParams({
      store_id: process.env.SSLCOMMERZ_STORE_ID,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
      total_amount: totalCalculatedAmount,
      currency: "BDT",
      tran_id,
      success_url: `${systemBaseUrl}/api/checkout/payment-webhook?action=success`,
      fail_url: `${systemBaseUrl}/api/checkout/payment-webhook?action=fail`,
      cancel_url: `${systemBaseUrl}/api/checkout/payment-webhook?action=cancel`,
      cus_name: user.email.split("@")[0],
      cus_email: user.email,
      cus_add1: address,
      cus_phone: phone,
      shipping_method: "NO",
      product_name: "Catalog Purchase",
      product_category: "Books",
      product_profile: "physical-goods",
    });

    const sslEndpoint =
      process.env.NODE_ENV === "production"
        ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
        : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
    const res = await fetch(sslEndpoint, {
      method: "POST",
      body: sslcommerzPayload,
    });
    const data = await res.json();

    if (data?.status === "SUCCESS")
      return NextResponse.json({
        url: data.GatewayPageURL,
        transactionId: tran_id,
      });
    return NextResponse.json({ error: "Gateway failure" }, { status: 502 });
  } catch (err) {
    return NextResponse.json({ error: "Server exception" }, { status: 500 });
  }
}
