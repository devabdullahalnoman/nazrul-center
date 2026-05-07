"use client";
import { useState, useMemo } from "react";

export function useOrderTable(orders, itemsPerPage = 6) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return orders.filter(
      (o) =>
        o.order_id?.toLowerCase().includes(query) ||
        o.customer?.full_name?.toLowerCase().includes(query),
    );
  }, [orders, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleSearch = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return {
    paginatedOrders,
    searchQuery,
    handleSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedOrder,
    setSelectedOrder,
    totalCount: filteredOrders.length,
  };
}
