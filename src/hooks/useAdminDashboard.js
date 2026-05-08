"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { adminApi } from "@/api/admin";
import { adminWishlistApi } from "@/api/admin-wishlist";
import { adminOrdersApi } from "@/api/admin-orders";
import { adminContributorsApi } from "@/api/admin-contributors"; // New Import
import { createClient } from "@/lib/supabase/client";

export function useAdminDashboard() {
  const [data, setData] = useState({
    stats: { contributors: 0, revenue: 0, ordersPending: 0, inventoryCount: 0, bookCount: 0, messages: 0, totalOrders: 0, visitors: "0" },
    orders: [],
    contributors: [],
    wishlist: [],
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const isMounted = useRef(true);

  const loadAllData = useCallback(async () => {
    try {
      const [s, o, c, w] = await Promise.all([
        adminApi.getDashboardStats(),
        adminOrdersApi.getRecentOrders(),
        adminContributorsApi.getContributors(), // Updated to specific API
        adminWishlistApi.getWishlist(),
      ]);

      if (isMounted.current) {
        setData({
          stats: s || data.stats,
          orders: o || [],
          contributors: c || [],
          wishlist: w || [],
        });
      }
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const init = async () => await loadAllData();
    init();

    const channel = supabase
      .channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, loadAllData)
      .on("postgres_changes", { event: "*", schema: "public", table: "wishlists" }, loadAllData)
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, loadAllData)
      .subscribe();

    return () => {
      isMounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [loadAllData, supabase]);

  return { ...data, loading };
}