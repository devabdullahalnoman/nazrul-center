"use client";
import { useState } from "react";
import { useUserManagement } from "../hooks/useUserManagement";
import { UserTable } from "./UserTable";
import { UserDetailsModal } from "./UserDetailsModal";
import { DashboardFilter } from "../../shared/components/DashboardFilter";
import { DashboardSearch } from "../../shared/components/DashboardSearch";
import { DashboardPagination } from "@/features/dashboard/shared/components/DashboardPagination";

export function UserManagementManager() {
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    updateRole,
    isUpdating,
  } = useUserManagement();

  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const filterOptions = [
    { label: "All Identities", value: "All" },
    { label: "Admins", value: "admin" },
    { label: "Contributors", value: "contributor" },
    { label: "Users", value: "user" },
  ];

  if (loading)
    return (
      <div className="p-20 text-center font-serif italic text-nazrul-terracotta animate-pulse text-xl">
        Verifying Personnel Credentials...
      </div>
    );

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end pb-8 border-b border-nazrul-sand">
        <div>
          <h1 className="text-5xl font-serif font-bold text-nazrul-ink uppercase tracking-tight">
            User Management
          </h1>
          <p className="text-nazrul-terracotta font-medium italic mt-2 text-lg">
            Identity Verification & Privilege Delegation
          </p>
        </div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-100">
          {users.length} Active Accounts
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/50 p-4 rounded-3xl border border-gray-100 shadow-sm">
        <DashboardFilter
          options={filterOptions}
          activeFilter={roleFilter}
          onFilterChange={(val) => {
            setRoleFilter(val);
            setCurrentPage(1);
          }}
        />
        <DashboardSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search name, email, or phone..."
        />
      </div>

      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <UserTable
          users={paginatedUsers}
          onUpdateRole={updateRole}
          isUpdating={isUpdating}
          onOpenProfile={setSelectedUser}
        />

        <DashboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={users.length}
          onPageChange={setCurrentPage}
          label="Identity Archive"
        />
      </div>

      <UserDetailsModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
}
