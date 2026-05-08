"use client";
import { useWishlistTable } from "@/hooks/useWishlistTable";
import { adminApi } from "@/api/admin";

export default function WishlistTable({ wishlist = [] }) {
  const {
    paginatedWishlist,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useWishlistTable(wishlist);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminApi.updateWishlistStatus(id, newStatus);
      if (newStatus === "available") {
        alert(
          "Notification sent! Customer will be informed via email/dashboard.",
        );
      }
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-gray-800">
          Wishlists
        </h3>
        <input
          placeholder="Search customer or item..."
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-64"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4">Availability Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedWishlist.length > 0 ? (
              paginatedWishlist.map((w) => (
                <tr
                  key={w.id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-6 py-5 font-serif italic text-gray-600">
                    {w.customer?.full_name || "Guest"}
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-800">
                    {w.product?.item_name || "Unknown Item"}
                  </td>
                  <td className="px-6 py-5 font-black text-[#946659]">
                    {w.quantity || 1}
                  </td>
                  <td className="px-6 py-5">
                    <select
                      defaultValue={w.availability_status}
                      onChange={(e) => handleStatusUpdate(w.id, e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-[10px] font-black uppercase rounded-lg px-2 py-1 outline-none focus:border-[#946659]"
                    >
                      <option value="pending">Pending</option>
                      <option value="available">Available (Notify User)</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-gray-400 italic"
                >
                  No wishlist entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Wishlist Pagination Footer --- */}
      <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          Results: <span className="text-[#946659]">{wishlist.length}</span>
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
            {currentPage} / {totalPages}
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
    </div>
  );
}
