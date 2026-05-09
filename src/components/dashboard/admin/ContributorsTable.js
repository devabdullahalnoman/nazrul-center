"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { useContributorTable } from "@/hooks/useContributorTable";

export default function ContributorsTable({ contributors = [] }) {
  const {
    paginatedData,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedContributor,
    setSelectedContributor,
  } = useContributorTable(contributors, 5);

  // --- Modal Pagination State ---
  const [modalPage, setModalPage] = useState(1);
  const itemsPerModalPage = 5;

  // Uses 'total_handled' logic if the orders array isn't joined
  const paginatedOrders = useMemo(() => {
    if (!selectedContributor?.orders) return [];
    const start = (modalPage - 1) * itemsPerModalPage;
    return selectedContributor.orders.slice(start, start + itemsPerModalPage);
  }, [selectedContributor, modalPage]);

  const modalTotalPages =
    Math.ceil((selectedContributor?.orders?.length || 0) / itemsPerModalPage) ||
    1;

  const handleOpenProfile = (c) => {
    setModalPage(1);
    setSelectedContributor(c);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-gray-800">
          Contributors Ledger
        </h3>
        <input
          placeholder="Search name or email..."
          className="px-6 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-72 transition-all shadow-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="relative w-10 h-10 shadow-sm">
                    <Image
                      src={
                        c.avatar_url ||
                        `https://ui-avatars.com/api/?name=${c.full_name}&background=random`
                      }
                      alt=""
                      fill
                      className="rounded-full object-cover border border-gray-100"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {c.full_name}
                </td>
                <td className="px-6 py-4 text-gray-500 font-medium">
                  {c.email}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleOpenProfile(c)}
                    className="text-[10px] font-black bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-[#946659] transition-all shadow-md"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          Total Contributors:{" "}
          <span className="text-[#946659]">{contributors.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-xl disabled:opacity-20 hover:border-[#946659] transition-all"
          >
            Prev
          </button>
          <div className="bg-white border border-gray-100 px-3 py-2 rounded-xl text-[10px] font-bold text-[#946659]">
            {currentPage} / {totalPages}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-xl disabled:opacity-20 hover:border-[#946659] transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* Contributor Profile Modal */}
      {selectedContributor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-6 text-left">
          <div className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedContributor(null)}
              className="absolute top-8 right-8 text-gray-300 hover:text-black text-2xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-50">
              <div className="relative w-28 h-28">
                <Image
                  src={
                    selectedContributor.avatar_url ||
                    `https://ui-avatars.com/api/?name=${selectedContributor.full_name}`
                  }
                  alt=""
                  fill
                  className="rounded-[32px] object-cover shadow-xl border-4 border-white"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 leading-none">
                  {selectedContributor.full_name}
                </h2>
                <p className="text-[#946659] font-medium italic mt-1">
                  {selectedContributor.email}
                </p>
                <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500 font-bold uppercase tracking-tighter">
                  <span>
                    📞 {selectedContributor.phone || "No phone listed"}
                  </span>
                  <span>
                    📍 {selectedContributor.address || "No address listed"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black uppercase text-[10px] text-gray-400 tracking-widest">
                Handling History
              </h4>
              <span className="text-[10px] font-black bg-[#946659]/10 text-[#946659] px-3 py-1 rounded-full uppercase">
                {/* Fixed to use the handled count from API */}
                Total Handled:{" "}
                {selectedContributor.total_handled ||
                  selectedContributor.orders?.length ||
                  0}
              </span>
            </div>

            <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100/50 font-black text-[9px] uppercase text-gray-400">
                  <tr>
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Value</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((o) => (
                      <tr
                        key={o.id}
                        className="hover:bg-white transition-colors"
                      >
                        <td className="p-4 font-black text-gray-400 text-[10px]">
                          {o.order_id}
                        </td>
                        <td className="p-4 font-black text-[#946659]">
                          ${o.total_amount}
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-white border border-gray-100 rounded-md">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="p-10 text-center text-gray-400 italic"
                      >
                        No handled orders yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="px-6 py-4 bg-gray-100/50 border-t border-gray-100 flex justify-between items-center">
                <button
                  disabled={modalPage === 1}
                  onClick={() => setModalPage((p) => p - 1)}
                  className="px-3 py-1 text-[10px] font-black uppercase bg-white border border-gray-200 rounded-lg disabled:opacity-30 hover:text-[#946659] transition-all"
                >
                  Prev
                </button>
                <span className="text-[10px] font-bold text-gray-400">
                  {modalPage} / {modalTotalPages}
                </span>
                <button
                  disabled={
                    modalPage === modalTotalPages ||
                    paginatedOrders.length === 0
                  }
                  onClick={() => setModalPage((p) => p + 1)}
                  className="px-3 py-1 text-[10px] font-black uppercase bg-white border border-gray-200 rounded-lg disabled:opacity-30 hover:text-[#946659] transition-all"
                >
                  Next
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedContributor(null)}
              className="mt-10 w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-[#946659] transition-all shadow-lg"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
