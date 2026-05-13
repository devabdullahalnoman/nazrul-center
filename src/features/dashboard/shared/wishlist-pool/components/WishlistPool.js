"use client";
import { useState, useMemo } from "react";
import { useWishlist } from "../../hooks/useWishlist";
import { DataTable } from "@/features/dashboard/shared/components/DataTable";
import { DashboardPagination } from "@/features/dashboard/shared/components/DashboardPagination";
import { UniversalModal } from "@/components/ui/UniversalModal";
import { WishlistDetailsContent } from "./WishlistDetailsContent";

export function WishlistPool() {
  const { wishlist, updateWishlistStatus, isUpdating, isLoading } =
    useWishlist();

  // FIX 1: Declare the missing state for the modal
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return wishlist.slice(start, start + itemsPerPage);
  }, [wishlist, currentPage]);

  const columns = [
    {
      header: "Requested Item",
      render: (r) => (
        <span className="font-bold text-nazrul-ink">{r.display?.itemName}</span>
      ),
    },
    {
      header: "Track Status",
      render: (r) => (
        <select
          disabled={isUpdating}
          value={r.availability_status || "pending"}
          onChange={(e) =>
            updateWishlistStatus({ wishlistId: r.id, status: e.target.value })
          }
          className="text-[10px] font-black uppercase bg-white border border-nazrul-sand rounded-lg px-2 py-1 outline-none focus:ring-1 ring-nazrul-terracotta"
        >
          <option value="pending">Pending</option>
          <option value="available">In-Stock</option>
          <option value="unavailable">Unavailable</option>
        </select>
      ),
    },
    {
      header: "Customer",
      render: (r) => (
        <span className="text-nazrul-ink">{r.customer?.full_name}</span>
      ),
    },
    // FIX 2: Add the Action column so users can actually click "Details"
    {
      header: "Action",
      align: "right",
      render: (r) => (
        <button
          onClick={() => setSelected(r)}
          className="px-5 py-2 text-[10px] font-black bg-nazrul-ink text-white rounded-xl hover:bg-nazrul-terracotta transition-all shadow-md uppercase"
        >
          Details
        </button>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="p-12 text-center animate-pulse italic text-nazrul-terracotta">
        Syncing Wishlist...
      </div>
    );

  return (
    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm mt-10 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-nazrul-ink uppercase">
          Wishlist Requests
        </h3>
      </div>

      <DataTable columns={columns} data={paginatedData} hideHeader={true} />

      <DashboardPagination
        currentPage={currentPage}
        totalPages={Math.ceil(wishlist.length / itemsPerPage)}
        totalItems={wishlist.length}
        onPageChange={setCurrentPage}
      />

      {/* This works now because 'selected' and 'setSelected' are defined above */}
      <UniversalModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Request Details"
      >
        <WishlistDetailsContent request={selected} />
      </UniversalModal>
    </div>
  );
}
