// "use client";
// import { useState, useMemo } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { usersApi } from "../api/users.api";

// export function useUserManagement() {
//   const queryClient = useQueryClient();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [roleFilter, setRoleFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data: users = [], isLoading } = useQuery({
//     queryKey: ["admin-users-list"],
//     queryFn: usersApi.fetchUsers,
//   });

//   const filteredUsers = useMemo(() => {
//     return users.filter((u) => {
//       const searchLower = searchQuery.toLowerCase();
//       const matchesSearch =
//         u.full_name?.toLowerCase().includes(searchLower) ||
//         u.email?.toLowerCase().includes(searchLower) ||
//         u.phone?.includes(searchQuery);

//       const matchesRole = roleFilter === "All" || u.role === roleFilter;
//       return matchesSearch && matchesRole;
//     });
//   }, [users, searchQuery, roleFilter]);

//   const updateRoleMutation = useMutation({
//     mutationFn: ({ userId, role }) => usersApi.updateUserRole(userId, role),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["admin-users-list"] });
//     },
//   });

//   return {
//     users: filteredUsers,
//     loading: isLoading,
//     searchQuery,
//     setSearchQuery,
//     roleFilter,
//     setRoleFilter,
//     currentPage,
//     setCurrentPage,
//     updateRole: updateRoleMutation.mutate,
//     isUpdating: updateRoleMutation.isPending,
//   };
// }

import { useState, useEffect, useTransition } from "react";
import { changeUserRole } from "@/app/actions/admin";
import { createClient } from "@/lib/supabase/client";

export function useUserManagement(initialUsers = []) {
  const [rawUsers, setRawUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(initialUsers.length === 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (initialUsers.length > 0) return;

    async function fetchProfiles() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setRawUsers(data);
      }
      setLoading(false);
    }

    fetchProfiles();
  }, [initialUsers]);

  const updateRole = (userId, newRole) => {
    startTransition(async () => {
      try {
        await changeUserRole(userId, newRole);

        // Optimistically update local UI state
        setRawUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user,
          ),
        );
      } catch (err) {
        alert(err.message || "Failed to update role.");
      }
    });
  };

  const filteredUsers = rawUsers.filter((user) => {
    const matchesRole =
      roleFilter === "All" ||
      user.role?.toLowerCase() === roleFilter.toLowerCase();

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      user.full_name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query);

    return matchesRole && matchesSearch;
  });

  return {
    users: filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    updateRole,
    isUpdating: isPending,
  };
}
