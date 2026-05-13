"use client";
import { useQuery } from "@tanstack/react-query";
import { userDashboardApi } from "../api/user-dashboard.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useUserDashboard() {
  const { user } = useAuth();

  const ordersQuery = useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: async () => {
      const data = await userDashboardApi.fetchMyOrders(user?.id);
      return data.map((order) => {
        // Normalize items for the Modal (mapping 'quantity' to 'qty')
        const normalizedItems =
          order.items?.map((item) => ({
            ...item,
            qty: item.quantity, // Shared Modal expects 'qty'
          })) || [];

        return {
          ...order,
          id: String(order.order_id), // For UI slice logic
          items: normalizedItems,
          displayItems: normalizedItems
            .map((i) => `${i.name} x${i.qty}`)
            .join(", "),
          customerName: order.customer?.full_name || "Guest",
          customerEmail: order.customer?.email || "No Email",
          handlerName: order.operator?.full_name || "System",
        };
      });
    },
    enabled: !!user?.id,
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: !user || ordersQuery.isLoading,
  };
}
