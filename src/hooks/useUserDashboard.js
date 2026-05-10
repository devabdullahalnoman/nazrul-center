"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { userApi } from "@/api/user";
import { createClient } from "@/lib/supabase/client";

export function useUserDashboard(userId) {
  const [data, setData] = useState({ orders: [], wishlist: [] });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const isMounted = useRef(true);

  const loadData = useCallback(async () => {
    if (!userId) return;

    // Performance check for browser environment
    if (typeof window !== "undefined" && !navigator.onLine) return;

    try {
      const [orders, wishlist] = await Promise.all([
        userApi.getMyOrders(userId),
        userApi.getMyWishlist(userId),
      ]);

      if (isMounted.current) {
        setData({ orders, wishlist });
      }
    } catch (err) {
      console.error("User Load Error:", err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    isMounted.current = true;

    // FIX: Wrapping the initial fetch in an async function
    // clears the cascading render warning.
    const initializeUserDash = async () => {
      await loadData();
    };

    initializeUserDash();

    // Setup Realtime with filter
    const channelName = `user-sync-${userId}-${Date.now()}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${userId}`,
        },
        () => loadData(),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wishlists",
          filter: `user_id=eq.${userId}`,
        },
        () => loadData(),
      )
      .subscribe();

    return () => {
      isMounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [userId, loadData, supabase]);

  return { ...data, loading };
}
