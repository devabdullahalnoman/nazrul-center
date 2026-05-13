"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/order.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

export function useOrders() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["shared-orders-pool"],
    queryFn: ordersApi.fetchOrders,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, orderData }) => {
      const response = await ordersApi.updateOrderStatus({
        orderId,
        status,
        operatorId: user?.id,
      });

      // If status is changed to cancelled, give stock back
      if (status === "cancelled") {
        await ordersApi.syncStock(orderData.items, "increase");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shared-orders-pool"] });
      queryClient.invalidateQueries({ queryKey: ["admin-inventory"] });
      toast.success("Status updated and inventory synced.");
    },
  });

  return {
    orders,
    isLoading,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}
