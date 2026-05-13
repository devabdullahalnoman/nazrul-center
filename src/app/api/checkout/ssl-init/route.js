import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const params = new URLSearchParams();
    params.append("store_id", process.env.SSLCOMMERZ_STORE_ID || "testbox");
    params.append("store_passwd", process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty");
    params.append("total_amount", body.amount.toString());
    params.append("currency", "BDT");
    params.append("tran_id", body.order_id);
    params.append("success_url", `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`);
    params.append("fail_url", `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?payment=fail`);
    params.append("cancel_url", `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?payment=cancel`);
    params.append("cus_name", body.customer_name || "Customer");
    params.append("cus_email", body.customer_email || "test@test.com");
    params.append("cus_phone", "01700000000");
    params.append("cus_add1", "Dhaka");
    params.append("cus_city", "Dhaka");
    params.append("cus_country", "Bangladesh");
    params.append("shipping_method", "NO");
    params.append("product_name", "Artifact");
    params.append("product_category", "General");
    params.append("product_profile", "general");

    const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const result = await response.json();
    return result?.status === "SUCCESS" 
      ? NextResponse.json({ url: result.GatewayPageURL })
      : NextResponse.json({ error: result.failedreason }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}