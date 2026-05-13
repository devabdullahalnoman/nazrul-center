"use client";
import { useState } from "react";
import Image from "next/image";
import { DataTable } from "@/features/dashboard/shared/components/DataTable";

export function UserTable({ users, onUpdateRole, onOpenProfile, isUpdating }) {
  // Local state to track dropdown selections before they are saved
  const [localRoles, setLocalRoles] = useState({});

  const handleRoleChange = (userId, role) => {
    setLocalRoles((prev) => ({ ...prev, [userId]: role }));
  };

  const handleConfirm = async (userId) => {
    const newRole = localRoles[userId];
    if (!newRole) return;

    await onUpdateRole({ userId, role: newRole });

    // Clear ONLY the local state for this specific user after success
    setLocalRoles((prev) => {
      const newState = { ...prev };
      delete newState[userId];
      return newState;
    });
  };

  const columns = [
    {
      header: "Photo",
      render: (u) => (
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-nazrul-terracotta/10 border border-gray-100 shadow-sm">
          <Image
            src={
              u.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(u.full_name)}&background=946659&color=fff`
            }
            alt=""
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: "Name",
      render: (u) => (
        <span className="font-bold text-gray-900">{u.full_name}</span>
      ),
    },
    { header: "Email", accessor: "email" },
    {
      header: "Role Assignment",
      render: (u) => {
        const currentRole = localRoles[u.id] || u.role;
        const hasChanged = localRoles[u.id] && localRoles[u.id] !== u.role;

        return (
          <div className="flex items-center gap-2 min-w-40">
            <div className="relative flex-1">
              <select
                className="w-full text-[10px] font-black uppercase border border-gray-200 rounded-lg pl-3 pr-8 py-2 outline-none appearance-none bg-white cursor-pointer focus:border-nazrul-terracotta"
                value={currentRole}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
              >
                <option value="user">User</option>
                <option value="contributor">Contributor</option>
                <option value="admin">Admin</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-gray-400">
                ▼
              </div>
            </div>
            <button
              disabled={isUpdating || !hasChanged}
              onClick={() => handleConfirm(u.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                hasChanged
                  ? "bg-nazrul-terracotta text-white shadow-md"
                  : "bg-gray-100 text-gray-300 opacity-20"
              }`}
            >
              ✓
            </button>
          </div>
        );
      },
    },
    {
      header: "Action",
      align: "right",
      render: (u) => (
        <button
          onClick={() => onOpenProfile(u)}
          className="text-[10px] font-black bg-gray-900 text-white px-5 py-2.5 rounded-xl uppercase hover:bg-nazrul-terracotta transition-all"
        >
          View Profile
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={users} showPagination={false} />;
}
