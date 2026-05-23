import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const adminApi = {
  async getAdminOverview() {
    try {
      const [
        ordersResponse,
        profilesResponse,
        wishlistResponse,
        // ticketsResponse,
      ] = await Promise.all([
        // Grab everything safely using your original strategy
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: true }),

        supabase.from("profiles").select("*"),

        // Removed the complex relational '!item_id' join string causing engine parsing bugs
        supabase
          .from("wishlists")
          .select("*")
          .order("created_at", { ascending: true }),

        // supabase
        //   .from("tickets")
        //   .select("*"),
      ]);

      if (ordersResponse.error) throw ordersResponse.error;
      if (profilesResponse.error) throw profilesResponse.error;
      // if (ticketsResponse.error) throw ticketsResponse.error;

      const allProfiles = profilesResponse.data || [];

      // Map Orders internally to associate them with contributors
      const orders = (ordersResponse.data || []).map((order) => {
        const customer = allProfiles.find((p) => p.id === order.user_id);
        const operator = allProfiles.find((p) => p.id === order.operator_id);

        return {
          ...order, // Keeps order.id fully intact for all sub-components and modals
          customer: {
            full_name: customer?.full_name || order.customer_name || "Guest",
            email: customer?.email || "N/A",
          },
          operator: {
            full_name: operator?.full_name || "Unassigned",
            email: operator?.email || "",
          },
        };
      });

      // Map Contributors (Personnel Ledger)
      const contributors = allProfiles
        .filter((p) => ["admin", "contributor"].includes(p.role))
        .map((staff) => ({
          ...staff,
          orders: orders.filter((o) => o.operator_id === staff.id),
        }));

      return {
        stats: {
          revenue:
            ordersResponse.data?.reduce(
              (acc, curr) => acc + Number(curr.total_amount || 0),
              0,
            ) || 0,
          contributors: contributors.length,
          ordersPending:
            ordersResponse.data?.filter((o) => o.status === "pending").length ||
            0,
          totalOrders: ordersResponse.data?.length || 0,
          // openTickets: (ticketsResponse.data || []).filter(
          //   (t) => t.status !== "closed"
          // ).length,
        },
        contributors,
      };
    } catch (error) {
      console.error("Dashboard Master API Error:", error.message);
      return {
        stats: {
          revenue: 0,
          contributors: 0,
          ordersPending: 0,
          openTickets: 0,
        },
        contributors: [],
      };
    }
  },
};
