"use client";
import { useState, useMemo } from "react";
import { useOrders } from "../../hooks/useOrders";
import { DashboardPagination } from "@/features/dashboard/shared/components/DashboardPagination";

export function OrderPool({ onOpenDetail }) {
  const { orders, updateStatus, isUpdating, isLoading } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.order_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer?.full_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [orders, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse text-nazrul-terracotta">
        Loading...
      </div>
    );

  return (
    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm mt-10 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-nazrul-ink uppercase">
          Archive Pool
        </h3>
        <input
          type="text"
          placeholder="Search..."
          className="px-6 py-2 border border-nazrul-sand rounded-xl text-sm outline-none w-72"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-8 py-4">Ref ID</th>
              <th className="px-8 py-4">Items & Qty</th>
              <th className="px-8 py-4 text-center">Status</th>
              <th className="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedOrders.map((order) => (
              <tr
                key={order.order_id}
                className="hover:bg-nazrul-base transition-colors"
              >
                <td className="px-8 py-5 font-black text-gray-400 text-xs">
                  #{order.order_id}
                </td>
                <td className="px-8 py-5 text-nazrul-ink font-medium italic text-xs">
                  {order.items?.map((item, i) => (
                    <div key={i}>
                      {item.name}{" "}
                      <span className="text-nazrul-terracotta font-black not-italic">
                        x{item.qty || item.quantity}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="px-8 py-5 text-center">
                  <select
                    disabled={isUpdating}
                    value={order.status}
                    onChange={(e) =>
                      updateStatus({
                        orderId: order.order_id,
                        status: e.target.value,
                        orderData: order,
                      })
                    }
                    className="text-[9px] font-black uppercase bg-white border border-nazrul-sand rounded-lg px-2 py-1 outline-none"
                  >
                    {[
                      "pending",
                      "processing",
                      "shipped",
                      "delivered",
                      "cancelled",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-8 py-5 text-right">
                  <button
                    onClick={() => onOpenDetail(order)}
                    className="px-5 py-2 text-[10px] font-black bg-nazrul-ink text-white rounded-xl uppercase"
                  >
                    Details
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
        totalItems={filteredOrders.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
