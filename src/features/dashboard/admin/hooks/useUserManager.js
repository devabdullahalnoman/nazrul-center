"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminUsersApi } from "../api/users.api";

export function useUserManager(itemsPerPage = 5) {
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users-list"],
    queryFn: adminUsersApi.fetchAllUsers,
  });

  const filtered = useMemo(
    () =>
      roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter),
    [users, roleFilter],
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    paginatedData,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount: filtered.length,
    isLoading,
  };
}
