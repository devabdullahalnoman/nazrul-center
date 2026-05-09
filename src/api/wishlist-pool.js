import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const wishlistPoolApi = {
  async getWishlist() {
    const { data, error } = await supabase
      .from("wishlists")
      .select(
        `
        *,
        customer:profiles!user_id(full_name, email),
        product:inventory!item_id(item_name, price, image_url, item_type, description),
        updater:profiles!updated_by(full_name, email) 
      `,
      )
      .order("created_at", { ascending: false });
    return error ? [] : data || [];
  },

  async updateWishlistStatus(id, status, adminId) {
    const { data, error } = await supabase
      .from("wishlists")
      .update({
        availability_status: status,
        updated_by: adminId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        `*, customer:profiles!user_id(full_name, email), product:inventory!item_id(item_name, price, image_url, item_type, description), updater:profiles!updated_by(full_name, email)`,
      )
      .single();

    if (error) throw error;
    return data;
  },
};
