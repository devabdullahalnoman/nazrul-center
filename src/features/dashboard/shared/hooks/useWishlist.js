"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistApi } from "../api/wishlist.api";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useWishlist() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["shared-wishlist-pool"],
    queryFn: wishlistApi.fetchWishlist,
    staleTime: 1000 * 60 * 5,
  });

  const updateMutation = useMutation({
    mutationFn: (payload) =>
      wishlistApi.updateWishlistStatus({
        ...payload,
        adminId: user?.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shared-wishlist-pool"] });
    },
  });

  return {
    wishlist,
    isLoading,
    updateWishlistStatus: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
