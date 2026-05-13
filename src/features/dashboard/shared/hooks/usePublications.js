"use client";
import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { publicationsApi } from "../api/publications.api";

export function usePublications(itemsPerPage = 8) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: pubs = [], isLoading } = useQuery({
    queryKey: ["shared-publications"],
    queryFn: publicationsApi.fetchPublications,
  });

  const filteredPubs = useMemo(() => {
    return pubs.filter((p) => {
      const matchesSearch =
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [pubs, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredPubs.length / itemsPerPage);
  const paginatedData = filteredPubs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    pubs: paginatedData,
    loading: isLoading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount: filteredPubs.length,
    refresh: () =>
      queryClient.invalidateQueries({ queryKey: ["shared-publications"] }),
  };
}
