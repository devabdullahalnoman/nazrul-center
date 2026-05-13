import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const userDashboardApi = {
  async fetchMyOrders(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id:order_id,
        order_id,
        created_at,
        status,
        total_amount,
        items,
        customer_address,
        customer:profiles!user_id(full_name, email),
        operator:profiles!operator_id(full_name)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
