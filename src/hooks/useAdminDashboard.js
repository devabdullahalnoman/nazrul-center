// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { adminApi } from "@/api/admin";
// import { createClient } from "@/lib/supabase/client";

// export function useAdminDashboard() {
//   const [stats, setStats] = useState({
//     contributors: 0,
//     revenue: 0,
//     ordersPending: 0,
//     inventoryCount: 0,
//     bookCount: 0,
//     messages: 0,
//   });
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const supabase = createClient();

//   const loadData = useCallback(async () => {
//     try {
//       const [resStats, resOrders] = await Promise.all([
//         adminApi.getDashboardStats(),
//         adminApi.getRecentOrders(),
//       ]);

//       console.log("Dashboard Data Loaded:", resStats); // DEBUG: Check your F12 console
//       setStats(resStats);
//       setOrders(resOrders);
//     } catch (err) {
//       console.error("Sync Error:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();

//     // Real-time listener
//     const channel = supabase
//       .channel("dashboard-changes")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "orders" },
//         loadData,
//       )
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "tickets" },
//         loadData,
//       )
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "inventory" },
//         loadData,
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, [loadData, supabase]);

//   return { stats, orders, loading };
// }

// "use client";
// import { useState, useEffect, useCallback, useRef } from "react";
// import { adminApi } from "@/api/admin";
// import { createClient } from "@/lib/supabase/client";

// export function useAdminDashboard() {
//   const [stats, setStats] = useState({
//     contributors: 0,
//     revenue: 0,
//     ordersPending: 0,
//     inventoryCount: 0,
//     bookCount: 0,
//     messages: 0,
//   });
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const supabase = createClient();
//   const isInitialMount = useRef(true);

//   // Wrap in useCallback to prevent re-creation on every render
//   const loadDashboardData = useCallback(async () => {
//     try {
//       const [newStats, recentOrders] = await Promise.all([
//         adminApi.getDashboardStats(),
//         adminApi.getRecentOrders(),
//       ]);
//       setStats(newStats);
//       setOrders(recentOrders);
//     } catch (error) {
//       console.error("Dashboard Sync Error:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     // This is the standard way to fetch data on mount without
//     // triggering the "cascading render" warning.
//     const init = async () => {
//       await loadDashboardData();
//     };

//     if (isInitialMount.current) {
//       init();
//       isInitialMount.current = false;
//     }

//     // Subscribe to Realtime changes
//     const channel = supabase
//       .channel("admin-dashboard-sync")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "orders" },
//         loadDashboardData,
//       )
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "inventory" },
//         loadDashboardData,
//       )
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "tickets" },
//         loadDashboardData,
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [loadDashboardData, supabase]);

//   return { stats, orders, loading, refresh: loadDashboardData };
// }

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
    // We don't set loading to true here to avoid flickering on real-time updates
    try {
      const [s, o] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRecentOrders(),
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

    // To satisfy ESLint, we wrap the initial call in an async IIFE
    // or a scoped function to signify synchronization.
    const initializeDashboard = async () => {
      await loadData();
    };

    initializeDashboard();

    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
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
