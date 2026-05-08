import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminOrdersApi = {
  /**
   * Fetches orders with joined customer and operator info.
   */
  async getRecentOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        customer:profiles!user_id(id, full_name, phone, address, email),
        operator:profiles!operator_id(id, full_name, email)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Order Fetch Error:", error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Updates order status and records the operator handling it.
   */
  async updateOrderStatus(id, status, operatorId) {
    const { data, error } = await supabase
      .from("orders")
      .update({
        status: status,
        operator_id: operatorId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        `
        *,
        customer:profiles!user_id(full_name, phone, email, address),
        operator:profiles!operator_id(full_name, email)
      `,
      )
      .single();

    if (error) throw error;
    return data;
  },
};
