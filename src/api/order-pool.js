import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const orderPoolApi = {
  async getRecentOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        customer:profiles!user_id(id, full_name, phone, address, email),
        operator:profiles!operator_id(id, full_name, email)
      `,
      ) // This join is crucial for the "Handled By" section
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  },

  async updateOrderStatus(id, status, operatorId) {
    const { data, error } = await supabase
      .from("orders")
      .update({
        status,
        operator_id: operatorId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        `*, customer:profiles!user_id(full_name, phone, email, address), operator:profiles!operator_id(full_name, email)`,
      );

    if (error || !data?.length)
      throw new Error("Update failed or permission denied.");
    return data[0];
  },
};
