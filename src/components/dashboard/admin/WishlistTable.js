"use client";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useWishlistTable } from "@/hooks/useWishlistTable";
import { adminWishlistApi } from "@/api/admin-wishlist";

export default function WishlistTable({ wishlist = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const supabase = createClient();

  const {
    paginatedWishlist,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useWishlistTable(wishlist);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // This updatedRecord will now contain the 'updater' object
      const updatedRecord = await adminWishlistApi.updateWishlistStatus(
        id,
        newStatus,
        user.id,
      );

      // Crucial: Update the item currently shown in the modal
      if (selectedItem?.id === id) {
        setSelectedItem(updatedRecord);
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
      {/* Header & Search */}
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-gray-800">
          Operational Wishlist
        </h3>
        <input
          placeholder="Search items, names or emails..."
          className="px-6 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-72 transition-all shadow-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4">Customer Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedWishlist.map((w) => (
              <tr key={w.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-5 font-bold text-gray-900">
                  {w.product?.item_name || "Unknown"}
                </td>
                <td className="px-6 py-5 font-serif italic text-gray-700">
                  {w.customer?.full_name || "Guest"}
                </td>
                <td className="px-6 py-5 text-center font-black text-[#946659]">
                  {w.quantity}
                </td>
                <td className="px-6 py-5 text-gray-500 font-medium text-xs">
                  {w.customer?.email}
                </td>
                <td className="px-6 py-5">
                  <select
                    defaultValue={w.availability_status}
                    onChange={(e) => handleStatusUpdate(w.id, e.target.value)}
                    className={`text-[9px] font-black uppercase rounded-lg px-2 py-1 outline-none border transition-colors ${
                      w.availability_status === "available"
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-gray-50 text-gray-400 border-gray-200"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => setSelectedItem(w)}
                    className="text-[10px] font-black bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-[#946659] transition-all shadow-sm"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Requested Pagination Style */}
      <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          Total Wishlists:{" "}
          <span className="text-[#946659]">{wishlist.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-xl disabled:opacity-20 transition-all hover:border-[#946659]"
          >
            Prev
          </button>
          <div className="bg-white border border-gray-100 px-3 py-2 rounded-xl text-[10px] font-bold text-[#946659]">
            {currentPage} / {totalPages || 1}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-gray-100 rounded-xl disabled:opacity-20 transition-all hover:border-[#946659]"
          >
            Next
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-left">
    <div className="bg-white w-full max-w-4xl rounded-[40px] p-10 shadow-2xl overflow-y-auto max-h-[90vh] relative animate-in zoom-in duration-300">
      {/* Close Button */}
      <button
        onClick={() => setSelectedItem(null)}
        className="absolute top-8 right-8 text-gray-300 hover:text-black text-2xl transition-colors"
      >
        ✕
      </button>

      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">
        Wishlist Entry Details
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Image & Type */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <Image
              src={selectedItem.product?.image_url || "https://placehold.co/400x600"}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 bg-[#946659]/5 rounded-2xl border border-[#946659]/10 text-center">
            <p className="text-[9px] font-black uppercase text-[#946659] mb-1 tracking-widest">
              Inventory Type
            </p>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-tighter">
              {selectedItem.product?.item_type || "General"}
            </p>
          </div>
        </div>

        {/* Right Column: Information */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Row: Requested Item & Quantity side-by-side */}
          <div className="flex gap-4 items-stretch">
            {/* Requested Item */}
            <div className="flex-grow p-5 bg-gray-900 rounded-3xl shadow-xl shadow-gray-200">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">
                Requested Item
              </p>
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                {selectedItem.product?.item_name || "Unknown Product"}
              </h3>
            </div>

            {/* Quantity Box */}
            <div className="w-24 p-5 bg-white border border-gray-100 rounded-3xl flex flex-col justify-center items-center text-center shadow-sm">
              <p className="text-[9px] font-black uppercase text-gray-400 mb-1 leading-none">
                Qty
              </p>
              <p className="text-3xl font-serif font-bold text-[#946659] leading-none">
                {selectedItem.quantity || 1}
              </p>
            </div>
          </div>

          {/* Customer Details Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                Customer Name
              </p>
              <p className="font-serif font-bold text-lg text-gray-900 leading-none">
                {selectedItem.customer?.full_name || "Guest"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                Customer Email
              </p>
              <p className="font-bold text-gray-800 break-all leading-tight pt-1">
                {selectedItem.customer?.email}
              </p>
            </div>
          </div>

          {/* User Request Notes - Now Spans Full Width with break-words fix */}
          <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-100/50">
            <p className="text-[10px] font-black uppercase text-amber-600 mb-2 tracking-widest">
              User Request Notes
            </p>
            <p className="text-sm font-medium text-gray-700 italic break-words leading-relaxed">
              &quot;
              {selectedItem.description || "No specific details provided."}
              &quot;
            </p>
          </div>

          {/* Footer Row: Audit & Managed By */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">
                Audit Timeline
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p className="flex justify-between border-b border-gray-50 pb-1">
                  <span>Created:</span>{" "}
                  <span className="font-bold text-gray-900">
                    {new Date(selectedItem.created_at).toLocaleDateString()}
                  </span>
                </p>
                <p className="flex justify-between border-b border-gray-50 pb-1">
                  <span>Last Update:</span>{" "}
                  <span className="font-bold text-[#946659]">
                    {selectedItem.updated_at
                      ? new Date(selectedItem.updated_at).toLocaleString()
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">
                Managed By
              </p>
              {selectedItem.updater ? (
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {selectedItem.updater.full_name}
                  </p>
                  <p className="text-[10px] text-[#946659] font-medium italic break-all leading-tight">
                    {selectedItem.updater.email}
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5 text-gray-400 italic">
                  <p className="text-sm font-bold leading-none uppercase">
                    System Record
                  </p>
                  <p className="text-[10px]">No handler data found</p>
                </div>
              )}
              <div className="pt-2">
                 <span className="text-[9px] px-2 py-0.5 bg-gray-100 text-[#946659] rounded-md font-black uppercase border border-gray-200">
                   Status: {selectedItem.availability_status}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Close Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setSelectedItem(null)}
          className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#946659] transition-all"
        >
          Close Entry
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
