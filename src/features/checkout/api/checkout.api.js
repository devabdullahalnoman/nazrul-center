import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const checkoutApi = {
  async saveOrder(orderData) {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: orderData.user_id,
          items: orderData.items,
          total_amount: orderData.total_amount,
          customer_address: orderData.address,
          status: "pending",
          payment_method: orderData.payment_method,
          order_id: `ORD-${Date.now()}`,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  async initiateSSLCommerz(payload, user) {
    const response = await fetch("/api/checkout/ssl-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: `TRAN-${Date.now()}`,
        amount: payload.total_amount,
        customer_name: user?.email,
        customer_email: user?.email,
      }),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Gateway connection failed");
    return data.url;
  },
};
