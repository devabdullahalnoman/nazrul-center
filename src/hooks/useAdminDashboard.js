"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { adminApi } from "@/api/admin";
import { createClient } from "@/lib/supabase/client";

export function useAdminDashboard() {
  const [stats, setStats] = useState({
    contributors: 0,
    revenue: 0,
    ordersPending: 0,
    inventoryCount: 0,
    bookCount: 0,
    messages: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const isMounted = useRef(true);

  const loadData = useCallback(async () => {
    try {
      const [s, o] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRecentOrders(100), // Fetch more for better search/pagination coverage
      ]);
      if (isMounted.current) {
        setStats(s);
        setOrders(o);
      }
    } catch (err) {
      console.error("Hook Sync Failure:", err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;

    const initialize = async () => {
      await loadData();
    };
    initialize();

    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        loadData,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory" },
        loadData,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tickets" },
        loadData,
      )
      .subscribe();

    return () => {
      isMounted.current = false;
      supabase.removeChannel(channel);
    };
  }, [loadData, supabase]);

  return { stats, orders, loading };
}
