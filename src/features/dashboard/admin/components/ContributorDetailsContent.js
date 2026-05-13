"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

export function ContributorDetailsContent({ contributor }) {
  // 1. Hooks MUST be at the top level
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const history = useMemo(() => {
    return contributor?.orders || [];
  }, [contributor]);

  const totalPages = Math.ceil(history.length / itemsPerPage) || 1;

  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return history.slice(start, start + itemsPerPage);
  }, [history, currentPage]);

  // 2. Early return moved AFTER hooks
  if (!contributor) return null;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Profile Header */}
      <div className="flex items-center gap-8 border-b border-gray-100 pb-10">
        <div className="relative w-36 h-36">
          <Image
            src={
              contributor.avatar_url ||
              `https://ui-avatars.com/api/?name=${contributor.full_name}&background=D9C7AD&color=1c1b1e`
            }
            alt=""
            fill
            className="rounded-[45px] object-cover shadow-2xl border-4 border-white"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-serif text-4xl font-bold text-nazzul-ink leading-none">
            {contributor.full_name}
          </h2>
          <p className="text-nazrul-terracotta font-medium italic mt-2 text-lg">
            {contributor.email}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500 font-bold uppercase tracking-widest">
            <span>📞 {contributor.phone || "No phone listed"}</span>
            <span>📍 {contributor.address || "No address listed"}</span>
          </div>
        </div>
      </div>

      {/* Handling History Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h4 className="font-black uppercase text-[11px] text-gray-400 tracking-widest">
            Archive Handling Log
          </h4>
          <span className="text-[10px] font-black bg-nazrul-terracotta/10 text-nazrul-terracotta px-4 py-1.5 rounded-full uppercase">
            Total Handled: {history.length}
          </span>
        </div>

        <div className="bg-nazrul-base/30 rounded-4xl border border-nazrul-sand/30 overflow-hidden shadow-inner">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/50 font-black text-[10px] uppercase text-gray-400 border-b border-nazrul-sand/20">
              <tr>
                <th className="px-8 py-4">Ref ID</th>
                <th className="px-8 py-4">Order Total</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nazrul-sand/10">
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/40 transition-colors"
                  >
                    <td className="px-8 py-4 font-black text-gray-400 text-[11px]">
                      #{order.order_id}
                    </td>
                    <td className="px-8 py-4 font-black text-nazrul-terracotta text-base">
                      ${order.total_amount}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-[9px] font-black uppercase px-3 py-1 rounded-md border bg-white border-gray-100">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-8 py-12 text-center text-gray-400 italic text-sm"
                  >
                    No history found for this staff member.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Unified Pagination Footer */}
          <div className="px-8 py-5 bg-gray-50/50 border-t border-nazrul-sand/10 flex justify-between items-center">
            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest italic">
              Log View
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-nazrul-sand rounded-xl disabled:opacity-20 text-nazrul-ink shadow-sm"
              >
                Prev
              </button>
              <div className="bg-white border border-nazrul-sand px-4 py-2 rounded-xl text-[10px] font-bold text-nazrul-terracotta shadow-sm">
                {currentPage} / {totalPages}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-nazrul-sand rounded-xl disabled:opacity-20 text-nazrul-ink shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
