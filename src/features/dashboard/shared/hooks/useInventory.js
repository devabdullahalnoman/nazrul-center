"use client";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "../api/inventory.api";

export function useInventory(itemsPerPage = 8) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: inventoryApi.fetchInventory,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.item_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || item.item_type === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedData = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    items: paginatedData,
    loading: isLoading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount: filteredItems.length,
    refresh: () => queryClient.invalidateQueries(["admin-inventory"]),
  };
}
