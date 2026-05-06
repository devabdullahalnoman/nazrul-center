// import { createClient } from "@/lib/supabase/client";
// const supabase = createClient();

// export const adminApi = {
//   async getDashboardStats() {
//     const [contribs, orders, items, books, msgs] = await Promise.all([
//       supabase
//         .from("profiles")
//         .select("*", { count: "exact", head: true })
//         .eq("role", "contributor"),
//       supabase.from("orders").select("total_amount, status"),
//       supabase.from("inventory").select("*", { count: "exact", head: true }),
//       supabase.from("publications").select("*", { count: "exact", head: true }),
//       supabase
//         .from("tickets")
//         .select("*", { count: "exact", head: true })
//         .eq("status", "open"),
//     ]);

//     return {
//       contributors: contribs.count || 0,
//       revenue:
//         orders.data?.reduce(
//           (acc, curr) => acc + Number(curr.total_amount || 0),
//           0,
//         ) || 0,
//       ordersPending:
//         orders.data?.filter((o) => o.status === "pending").length || 0,
//       inventoryCount: items.count || 0,
//       bookCount: books.count || 0,
//       messages: msgs.count || 0,
//     };
//   },

//   async getRecentOrders(limit = 10) {
//     const { data, error } = await supabase
//       .from("orders")
//       .select(
//         `
//         *,
//         customer:profiles!user_id(id, full_name, phone, address),
//         operator:profiles!operator_id(id, full_name)
//       `,
//       )
//       .order("created_at", { ascending: false })
//       .limit(limit);

//     if (error) throw error;
//     return data || [];
//   },
// };

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
      };
    } catch (err) {
      console.error("Stats API Error:", err);
      return {
        contributors: 0,
        revenue: 0,
        ordersPending: 0,
        inventoryCount: 0,
        bookCount: 0,
        messages: 0,
      };
    }
  },

  async getRecentOrders(limit = 10) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        customer:profiles!user_id(id, full_name, phone, address),
        operator:profiles!operator_id(id, full_name)
      `,
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Orders API Error:", error.message);
      throw error;
    }
    return data || [];
  },
};
