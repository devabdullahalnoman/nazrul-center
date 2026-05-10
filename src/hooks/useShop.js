"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { shopApi } from "@/api/shop";

export function useShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const isMounted = useRef(true);

  const itemsPerPage = 15;
  const categories = ["All", "Physical Book", "Souvenir", "T-shirt", "Music"];

  const loadProducts = useCallback(async () => {
    // Prevent state updates if user navigates away or is offline
    if (typeof window !== "undefined" && !navigator.onLine) return;

    try {
      const data = await shopApi.fetchProducts();
      if (isMounted.current) {
        setProducts(data || []);
      }
    } catch (err) {
      console.error("Shop Sync Error:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;

    // FIX: Wrap the call in an async IIFE or named function
    // This tells React the state update is an async side effect
    const initializeShop = async () => {
      await loadProducts();
    };

    initializeShop();

    return () => {
      isMounted.current = false;
    };
  }, [loadProducts]);

  // Combined Search and Filter Logic
  const filteredData = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.item_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || p.item_type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [products, searchQuery, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  return {
    products: paginatedProducts,
    loading,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    categories,
  };
}
