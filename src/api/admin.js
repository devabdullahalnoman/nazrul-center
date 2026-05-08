import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminApi = {
  async getDashboardStats() {
    try {
      const [contribs, orders, items, books, msgs] = await Promise.all([
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "contributor"),
        supabase.from("orders").select("total_amount, status"),
        supabase.from("inventory").select("*", { count: "exact", head: true }),
        supabase
          .from("publications")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("tickets")
          .select("*", { count: "exact", head: true })
          .eq("status", "open"),
      ]);

      return {
        contributors: contribs.count || 0,
        revenue:
          orders.data?.reduce(
            (acc, curr) => acc + Number(curr.total_amount || 0),
            0,
          ) || 0,
        ordersPending:
          orders.data?.filter((o) => o.status === "pending").length || 0,
        inventoryCount: items.count || 0,
        bookCount: books.count || 0,
        messages: msgs.count || 0,
        totalOrders: orders.data?.length || 0,
        visitors: "1.8k",
      };
    } catch (err) {
      console.error("Stats Error:", err);
      return {
        contributors: 0,
        revenue: 0,
        ordersPending: 0,
        inventoryCount: 0,
        bookCount: 0,
        messages: 0,
        totalOrders: 0,
        visitors: "0",
      };
    }
  },
};
