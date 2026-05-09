"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { contributorApi } from "@/api/contributor";
import { createClient } from "@/lib/supabase/client";

export function useContributorDashboard() {
  const [data, setData] = useState({
    orders: [],
    wishlist: [],
    stats: { pendingOrders: 0, wishlistCount: 0, totalAssigned: 0 },
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const isMounted = useRef(true);

  const loadData = useCallback(async () => {
    try {
      const [stats, orders, wishlist] = await Promise.all([
        contributorApi.getQuickStats(),
        contributorApi.getOrders(),
        contributorApi.getWishlist(),
      ]);

      if (isMounted.current) {
        setData({ stats, orders, wishlist });
      }
    } catch (err) {
      console.error("Contributor Sync Error:", err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const initialize = async () => await loadData();
    initialize();

    const channel = supabase
      .channel(`contributor-live-${Date.now()}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        loadData,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "wishlists" },
        loadData,
      )
      .subscribe();

    return () => {
      isMounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [loadData, supabase]);

  return { ...data, loading };
}
