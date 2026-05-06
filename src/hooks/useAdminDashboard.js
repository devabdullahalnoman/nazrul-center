"use client";
import { useState, useEffect, useCallback } from "react";
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

  const loadData = useCallback(async () => {
    try {
      const [resStats, resOrders] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRecentOrders(),
      ]);

      console.log("Dashboard Data Loaded:", resStats); // DEBUG: Check your F12 console
      setStats(resStats);
      setOrders(resOrders);
    } catch (err) {
      console.error("Sync Error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Real-time listener
    const channel = supabase
      .channel("dashboard-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        loadData,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tickets" },
        loadData,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory" },
        loadData,
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [loadData, supabase]);

  return { stats, orders, loading };
}
