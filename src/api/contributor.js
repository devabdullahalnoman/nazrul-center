import { orderPoolApi } from "./order-pool";
import { wishlistPoolApi } from "./wishlist-pool";

export const contributorApi = {
  /**
   * Fetches the subset of stats relevant to staff operations.
   */
  async getQuickStats() {
    const [orders, wishlist] = await Promise.all([
      orderPoolApi.getRecentOrders(),
      wishlistPoolApi.getWishlist(),
    ]);

    return {
      pendingOrders: orders.filter((o) => o.status === "pending").length,
      wishlistCount: wishlist.length,
      totalAssigned: orders.length,
    };
  },

  // We reuse the methods from the Pool APIs to keep it DRY
  getOrders: orderPoolApi.getRecentOrders,
  getWishlist: wishlistPoolApi.getWishlist,
  updateOrderStatus: orderPoolApi.updateOrderStatus,
  updateWishlist: wishlistPoolApi.updateWishlistStatus,
};
