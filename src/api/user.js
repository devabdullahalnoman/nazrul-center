import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const userApi = {
  async getMyOrders(userId) {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, operator:profiles!operator_id(full_name)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getMyWishlist(userId) {
    const { data, error } = await supabase
      .from("wishlists")
      .select(`*, product:inventory!item_id(*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }
};