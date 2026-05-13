import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const wishlistApi = {
  async fetchWishlist() {
    try {
      const [wishlistResponse, profilesResponse] = await Promise.all([
        supabase
          .from("wishlists")
          .select("*, product:inventory!item_id(*)")
          .order("created_at", { ascending: true }),
        supabase.from("profiles").select("*"),
      ]);

      if (wishlistResponse.error) throw wishlistResponse.error;
      const allProfiles = profilesResponse.data || [];

      return (wishlistResponse.data || []).map((w) => {
        const customer = allProfiles.find((p) => p.id === w.user_id);
        const operator = allProfiles.find((p) => p.id === w.updated_by);

        return {
          ...w,
          customer: {
            full_name: customer?.full_name || "Guest User",
            email: customer?.email || "N/A",
          },
          updater: {
            full_name: operator?.full_name || "System",
            email: operator?.email || "",
          },
          display: {
            itemName: w.product?.item_name || "Unknown Item",
            itemType: w.product?.item_type || "N/A",
          },
        };
      });
    } catch (error) {
      console.error("Wishlist API Error:", error);
      return [];
    }
  },

  async updateWishlistStatus({ wishlistId, status, adminId }) {
    const { data, error } = await supabase
      .from("wishlists")
      .update({
        availability_status: status,
        updated_by: adminId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", wishlistId)
      .select();

    if (error) throw error;
    return data[0];
  },
};
