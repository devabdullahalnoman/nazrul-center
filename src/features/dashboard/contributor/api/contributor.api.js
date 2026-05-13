import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const contributorApi = {
  async getContributorStats(profileId) {
    try {
      const [ordersRes, inventoryRes, publicationsRes, wishlistRes] =
        await Promise.all([
          supabase.from("orders").select("status, operator_id"),
          supabase.from("inventory").select("id"),
          supabase.from("publications").select("id"),
          supabase.from("wishlists").select("id"),
        ]);

      const orders = ordersRes.data || [];

      return {
        totalOrders: orders.length,
        completedByMe: orders.filter(
          (o) => o.operator_id === profileId && o.status === "completed",
        ).length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        wishlistCount: wishlistRes.data?.length || 0,
        inventoryItems: inventoryRes.data?.length || 0,
        publicationCount: publicationsRes.data?.length || 0,
      };
    } catch (error) {
      console.error("Contributor API Error:", error);
      throw error;
    }
  },
};
