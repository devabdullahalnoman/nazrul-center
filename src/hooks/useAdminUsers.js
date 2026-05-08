"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { adminUsersApi } from "@/api/admin-users";
import { createClient } from "@/lib/supabase/client";

export function useAdminUsers() {
  const supabase = createClient();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const isInitialFetched = useRef(false);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await adminUsersApi.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("User Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // FIX: Wrapping the call to avoid synchronous setState inside the effect body
    if (!isInitialFetched.current) {
      const initLoad = async () => {
        await fetchUsers();
      };
      initLoad();
      isInitialFetched.current = true;
    }

    const channel = supabase
      .channel("profiles-admin-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => fetchUsers(),
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [fetchUsers, supabase]);

  const counts = useMemo(
    () => ({
      All: users.length,
      admin: users.filter((u) => u.role === "admin").length,
      contributor: users.filter((u) => u.role === "contributor").length,
      user: users.filter((u) => !u.role || u.role === "user").length,
    }),
    [users],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const normalizedRole = user.role || "user";
      const matchesRole = roleFilter === "All" || normalizedRole === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    users: paginatedUsers,
    loading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    counts,
    totalCount: filteredUsers.length,
  };
}
