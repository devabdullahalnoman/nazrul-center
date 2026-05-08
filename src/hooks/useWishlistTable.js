"use client";
import { useState, useMemo } from "react";

export function useWishlistTable(wishlist = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = useMemo(() => {
    const data = Array.isArray(wishlist) ? wishlist : [];
    const query = searchQuery.toLowerCase();
    return data.filter(
      (w) =>
        w.customer?.full_name?.toLowerCase().includes(query) ||
        w.product?.item_name?.toLowerCase().includes(query),
    );
  }, [wishlist, searchQuery]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;

  return {
    paginatedWishlist: filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ),
    searchQuery,
    setSearchQuery: (val) => {
      setSearchQuery(val);
      setCurrentPage(1);
    },
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
