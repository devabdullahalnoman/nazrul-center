"use client";
import { useQuery } from "@tanstack/react-query";
import { shopApi } from "../api/shop.api";

export function useShop() {
  return useQuery({
    queryKey: ["shop-products"],
    queryFn: shopApi.getProducts,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}
