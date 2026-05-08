"use client";
import { useState } from "react";
import Image from "next/image";
import { adminUsersApi } from "@/api/admin-users";

export default function UserTable({ data }) {
  const [pendingRoles, setPendingRoles] = useState({});

  const handleConfirmRole = async (userId) => {
    try {
      await adminUsersApi.updateUserRole(userId, pendingRoles[userId]);
      const updatedPending = { ...pendingRoles };
      delete updatedPending[userId];
      setPendingRoles(updatedPending);
    } catch (err) {
      alert("Role update failed: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
          <tr>
            <th className="px-6 py-4">User Details</th>
            <th className="px-6 py-4">Email Address</th>
            <th className="px-6 py-4 text-center">Current Role</th>
            <th className="px-6 py-4 text-right">Assign Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                  <Image
                    src={
                      user.avatar_url ||
                      `https://ui-avatars.com/api/?name=${user.full_name}&background=946659&color=fff`
                    }
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-gray-900">
                  {user.full_name}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 font-medium">
                {user.email}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                    user.role === "admin"
                      ? "bg-purple-50 text-purple-600"
                      : user.role === "contributor"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-50 text-gray-400"
                  }`}
                >
                  {user.role || "user"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <select
                    value={pendingRoles[user.id] || user.role || "user"}
                    onChange={(e) =>
                      setPendingRoles({
                        ...pendingRoles,
                        [user.id]: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-[10px] font-black uppercase outline-none focus:ring-1 ring-[#946659] cursor-pointer"
                  >
                    <option value="user">User</option>
                    <option value="contributor">Contributor</option>
                    <option value="admin">Admin</option>
                  </select>
                  {pendingRoles[user.id] &&
                    pendingRoles[user.id] !== user.role && (
                      <button
                        onClick={() => handleConfirmRole(user.id)}
                        className="bg-[#946659] text-white text-[9px] font-black uppercase px-4 py-2 rounded-xl transition-all hover:bg-black active:scale-95"
                      >
                        Confirm
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
