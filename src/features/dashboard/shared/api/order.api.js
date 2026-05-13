import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const ordersApi = {
  async fetchOrders() {
    try {
      const [ordersResponse, profilesResponse] = await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: true }),
        supabase.from("profiles").select("*"),
      ]);

      if (ordersResponse.error) throw ordersResponse.error;
      const allProfiles = profilesResponse.data || [];

      return (ordersResponse.data || []).map((order) => {
        const customer = allProfiles.find((p) => p.id === order.user_id);
        const operator = allProfiles.find((p) => p.id === order.operator_id);

        return {
          ...order,
          id: order.order_id,
          customer: {
            full_name: customer?.full_name || order.customer_name || "Guest",
            email: customer?.email || "N/A",
          },
          operator: {
            full_name: operator?.full_name || "Unassigned",
            email: operator?.email || "No contact info", // Stitched email
          },
          items: Array.isArray(order.items) ? order.items : [],
        };
      });
    } catch (error) {
      console.error("Order Pool API Error:", error.message);
      return [];
    }
  },

  async syncStock(items, mode) {
    const multiplier = mode === "reduce" ? -1 : 1;
    for (const item of items) {
      const { data: inv } = await supabase
        .from("inventory")
        .select("stock_quantity")
        .eq("id", item.id)
        .single();

      if (!inv) continue;

      // Use qty (from payload) or quantity (from raw store)
      const amount = item.qty || item.quantity || 0;
      const newStock = inv.stock_quantity + amount * multiplier;

      await supabase
        .from("inventory")
        .update({ stock_quantity: Math.max(0, newStock) })
        .eq("id", item.id);
    }
  },

  async updateOrderStatus({ orderId, status, operatorId }) {
    const { data, error } = await supabase
      .from("orders")
      .update({
        status,
        operator_id: operatorId,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId)
      .select();

    if (error) throw error;
    return data[0];
  },
};
