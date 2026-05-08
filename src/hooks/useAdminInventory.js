"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAdminInventory() {
  const supabase = createClient();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const isFetched = useRef(false);

  const fetchInventory = useCallback(async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (!isFetched.current) {
      fetchInventory();
      isFetched.current = true;
    }
    const channel = supabase
      .channel("inventory-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory" },
        fetchInventory,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [fetchInventory, supabase]);

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

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    items: paginatedItems,
    loading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount: filteredItems.length,
  };
}
