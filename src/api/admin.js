import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const adminApi = {
  async getDashboardStats() {
    // parallel fetching for speed
    const [contribs, orders, items, books, msgs] = await Promise.all([
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "contributor"),
      supabase.from("orders").select("total_amount, status"),
      supabase.from("inventory").select("*", { count: "exact", head: true }),
      supabase.from("publications").select("*", { count: "exact", head: true }),
      supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "open"),
    ]);

    const revenue =
      orders.data?.reduce(
        (acc, curr) => acc + Number(curr.total_amount || 0),
        0,
      ) || 0;
    const pending =
      orders.data?.filter((o) => o.status === "pending").length || 0;

    return {
      contributors: contribs.count || 0,
      revenue: revenue,
      ordersPending: pending,
      inventoryCount: items.count || 0,
      bookCount: books.count || 0,
      messages: msgs.count || 0,
    };
  },

  async getRecentOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, operator:profiles!operator_id(id, full_name)`)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;
    return data || [];
  },
};
