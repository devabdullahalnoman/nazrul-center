"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { adminApi } from "@/api/admin";
import { wishlistPoolApi } from "@/api/wishlist-pool";
import { orderPoolApi } from "@/api/order-pool";
import { createClient } from "@/lib/supabase/client";

export function useAdminDashboard() {
  const [data, setData] = useState({
    stats: {
      contributors: 0,
      revenue: 0,
      ordersPending: 0,
      inventoryCount: 0,
      bookCount: 0,
      messages: 0,
      totalOrders: 0,
      visitors: "0",
    },
    orders: [],
    contributors: [],
    wishlist: [],
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const isMounted = useRef(true);

  const loadAllData = useCallback(async () => {
    // Check connection
    if (typeof window !== "undefined" && !navigator.onLine) return;

    try {
      const [s, o, c, w] = await Promise.all([
        adminApi.getDashboardStats(),
        orderPoolApi.getRecentOrders(),
        adminApi.getContributors(),
        wishlistPoolApi.getWishlist(),
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
      console.error("Admin Dashboard Sync Error:", err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [data.stats]);

  useEffect(() => {
    isMounted.current = true;

    // FIX: Wrapping the call in a function or ensuring it's handled
    // as a strictly async side-effect clears the cascading render warning.
    const initializeDashboard = async () => {
      await loadAllData();
    };

    initializeDashboard();

    const channelId = `admin-sync-${Date.now()}`;
    const channel = supabase.channel(channelId);

    channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => loadAllData(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "wishlists" },
        () => loadAllData(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => loadAllData(),
      )
      .subscribe();

    return () => {
      isMounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [loadAllData, supabase]);

  return { ...data, loading };
}
