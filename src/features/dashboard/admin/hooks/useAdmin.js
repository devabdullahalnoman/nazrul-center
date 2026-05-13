"use client";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";

export function useAdmin() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-master-data"],
    queryFn: adminApi.getAdminOverview,
    staleTime: 1000 * 60 * 2,
  });

  return {
    stats: data?.stats || {
      revenue: 0,
      contributors: 0,
      ordersPending: 0,
      openTickets: 0,
    },
    contributors: data?.contributors || [],
    isLoading,
    refetch,
  };
}
