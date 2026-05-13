"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { DashboardPagination } from "@/features/dashboard/shared/components/DashboardPagination";

export function ContributorsLedger({ contributors = [], onOpenDetail }) {
  // Local Pagination Logic to replace the missing hook
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return contributors.filter((c) =>
      c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [contributors, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm mt-10 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-nazrul-ink uppercase tracking-tight">
          Personnel Ledger
        </h3>
        <input
          placeholder="Search name..."
          className="px-6 py-2 border border-nazrul-sand rounded-xl text-sm outline-none focus:border-nazrul-terracotta w-72 bg-nazrul-base/20 text-nazrul-ink"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
            <tr>
              <th className="px-8 py-4">Photo</th>
              <th className="px-8 py-4">Full Name</th>
              <th className="px-8 py-4">Email</th>
              <th className="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.map((staff) => (
              <tr
                key={staff.id}
                className="hover:bg-nazrul-base/30 transition-colors"
              >
                <td className="px-8 py-4">
                  <div className="relative w-12 h-12 shadow-sm">
                    <Image
                      src={
                        staff.avatar_url ||
                        `https://ui-avatars.com/api/?name=${staff.full_name}&background=D9C7AD`
                      }
                      alt=""
                      fill
                      className="rounded-full object-cover border border-nazrul-sand"
                    />
                  </div>
                </td>
                <td className="px-8 py-4 font-bold text-nazrul-ink">
                  {staff.full_name}
                </td>
                <td className="px-8 py-4 text-gray-500 italic font-medium">
                  {staff.email}
                </td>
                <td className="px-8 py-4 text-right">
                  <button
                    onClick={() => onOpenDetail(staff)}
                    className="text-[10px] font-black bg-nazrul-ink text-white px-6 py-2.5 rounded-xl hover:bg-nazrul-terracotta transition-all shadow-md uppercase"
                  >
                    Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        label="Staff Count"
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
