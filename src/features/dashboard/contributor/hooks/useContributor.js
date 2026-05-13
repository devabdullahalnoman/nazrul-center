"use client";
import { useQuery } from "@tanstack/react-query";
import { contributorApi } from "../api/contributor.api";

export function useContributor(profileId) {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contributor-stats", profileId],
    queryFn: () => contributorApi.getContributorStats(profileId),
    enabled: !!profileId,
  });

  return {
    stats: stats || {},
    isLoading,
    error,
  };
}
