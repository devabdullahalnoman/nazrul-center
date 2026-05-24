import { createClient } from "@/lib/supabase/client";
import { InputEngine } from "@/lib/validation/inputEngine";

const supabase = createClient();

export const checkoutApi = {
  async saveOrder(orderData) {
    // 🌟 SANITIZE USER INPUTS BEFORE DATABASE INSERTION
    const cleanAddress = InputEngine.sanitizeString(orderData.address);
    const cleanPhone = InputEngine.sanitizeString(orderData.phone);

    if (!cleanAddress || !cleanPhone) {
      throw new Error(
        "Invalid characters detected in shipping or contact information.",
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          id: orderData.id, // Maps directly to your text primary key column 'id'
          user_id: orderData.user_id,
          items: orderData.items,
          total_amount: orderData.total_amount,
          customer_address: cleanAddress,
          phone: cleanPhone,
          status: "pending",
          payment_method: orderData.payment_method,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  async initiateSSLCommerz(payload, user) {
    // Forward the complete payload matching your transactional parameters verbatim
    const response = await fetch("/api/checkout/ssl-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: payload.id, // Pass our generated unified id through
        items: payload.items,
        total_amount: payload.total_amount,
        customer_name: user?.email || "Customer",
        customer_email: user?.email || "",
        phone: InputEngine.sanitizeString(payload.phone), // Sanitize before gateway handoff
        address: InputEngine.sanitizeString(payload.address), // Sanitize before gateway handoff
      }),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Gateway connection failed");
    return data.url;
  },
};
