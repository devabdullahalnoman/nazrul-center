"use client";
import { createClient } from "@/lib/supabase/client";
import { useOrderTable } from "@/hooks/useOrderTable";
import { orderPoolApi } from "@/api/order-pool";

export default function OrderTable({ orders = [] }) {
  const supabase = createClient();
  const {
    paginatedOrders,
    searchQuery,
    handleSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedOrder,
    setSelectedOrder,
  } = useOrderTable(orders, 6);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return alert("Please log in.");

      const updated = await orderPoolApi.updateOrderStatus(
        id,
        newStatus,
        user.id,
      );

      if (selectedOrder?.id === id) {
        setSelectedOrder(updated);
      }
    } catch (err) {
      console.error("Status Update Error:", err.message);
      alert("Permission Denied: Only staff can change status.");
    }
  };

  const statusStyles = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    processing: "bg-blue-50 text-blue-600 border-blue-100",
    completed: "bg-green-50 text-green-600 border-green-100",
    cancelled: "bg-red-50 text-red-600 border-red-100",
    returned: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
      {/* RESTORED SEARCH HEADER */}
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-gray-800">
          Orders Pool
        </h3>
        <input
          type="text"
          placeholder="Search Order ID or Name..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-6 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-72 transition-all shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Ref ID</th>
              <th className="px-6 py-4">Items & Qty</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/30 transition-colors"
              >
                <td className="px-6 py-5 font-black text-gray-400 text-xs">
                  {order.order_id}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-0.5">
                    {order.items?.map((item, i) => (
                      <span key={i} className="text-gray-700 font-medium">
                        {item.name}{" "}
                        <span className="text-[#946659] font-black italic text-xs">
                          x{item.qty}
                        </span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 font-black text-[#946659] text-lg">
                  ${order.total_amount}
                </td>
                <td className="px-6 py-5 text-center">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`text-[9px] font-black uppercase rounded-lg px-2 py-1 outline-none border transition-colors ${statusStyles[order.status] || "bg-gray-50"}`}
                  >
                    {Object.keys(statusStyles).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-[10px] font-black bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-[#946659] transition-all shadow-md"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESTORED PAGINATION FOOTER */}
      <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          Recent Orders: <span className="text-[#946659]">{orders.length}</span>
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
      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-left">
          <div className="bg-white rounded-[40px] p-8 md:p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-8 right-8 text-gray-300 hover:text-black text-2xl transition-colors"
            >
              ✕
            </button>

            <div className="mb-8 border-b border-gray-50 pb-6">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                Order Invoice
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[#946659] font-black text-xs tracking-widest uppercase">
                  {selectedOrder.order_id}
                </p>
                <span
                  className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase ${statusStyles[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Customer Info */}
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
                  Customer Info
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {selectedOrder.customer?.full_name || "Guest"}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {selectedOrder.customer?.email}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {selectedOrder.customer?.phone || "No Phone"}
                </p>
                <div className="mt-4">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                    Shipping Address
                  </p>
                  <p className="text-xs font-serif italic text-gray-600 leading-relaxed break-words">
                    {selectedOrder.customer_address || "No address provided"}
                  </p>
                </div>
              </div>

              {/* Operator Info */}
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">
                  Order Managed By
                </p>
                {selectedOrder.operator ? (
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-900">
                      {selectedOrder.operator.full_name}
                    </p>
                    <p className="text-[10px] text-[#946659] font-medium italic">
                      {selectedOrder.operator.email}
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-400 italic">
                    <p className="text-sm font-bold uppercase text-xs">
                      Unassigned
                    </p>
                    <p className="text-[10px]">Awaiting Processing</p>
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                    Processed On
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {selectedOrder.updated_at
                      ? new Date(selectedOrder.updated_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Line Items Container */}
            <div className="bg-gray-50/50 rounded-3xl p-6 mb-8 border border-gray-100">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">
                Line Items
              </p>
              <div className="space-y-3">
                {selectedOrder.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm border-b border-white pb-2"
                  >
                    <span className="font-medium text-gray-700">
                      {item.name}
                      <span className="font-black text-[#946659] italic ml-2">
                        x{item.qty}
                      </span>
                    </span>
                    <span className="font-bold text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs font-black uppercase text-gray-400 tracking-widest">
                  Total Amount
                </span>
                <span className="text-3xl font-serif font-bold text-[#946659]">
                  ${selectedOrder.total_amount}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#946659] transition-all shadow-lg"
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
