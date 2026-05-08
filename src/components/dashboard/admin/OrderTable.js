// "use client";
// import { useOrderTable } from "@/hooks/useOrderTable";
// import Link from "next/link";

// export default function OrderTable({ orders }) {
//   const {
//     paginatedOrders,
//     searchQuery,
//     handleSearch,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     selectedOrder,
//     setSelectedOrder,
//   } = useOrderTable(orders, 6);

//   const statusStyles = {
//     pending: "bg-amber-50 text-amber-600",
//     processing: "bg-blue-50 text-blue-600",
//     completed: "bg-green-50 text-green-600",
//     cancelled: "bg-red-50 text-red-600",
//     returned: "bg-purple-50 text-purple-600",
//   };

//   return (
//     <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
//       {/* Search Header */}
//       <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
//         <h3 className="font-serif font-bold text-xl text-gray-800">
//           Order Logistics
//         </h3>
//         <input
//           type="text"
//           placeholder="Search Order ID or Name..."
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-64 transition-all"
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
//             <tr>
//               <th className="px-6 py-4">Ref ID</th>
//               <th className="px-6 py-4">Items & Qty</th>
//               <th className="px-6 py-4">Total</th>
//               <th className="px-6 py-4">Orderer</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-6 py-4">Contributor</th>
//               <th className="px-6 py-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {paginatedOrders.map((order) => (
//               <tr
//                 key={order.id}
//                 className="hover:bg-gray-50/30 transition-colors"
//               >
//                 <td className="px-6 py-5 font-black text-gray-400 text-xs">
//                   {order.order_id}
//                 </td>
//                 <td className="px-6 py-5">
//                   <div className="flex flex-col">
//                     {order.items?.map((item, i) => (
//                       <span key={i} className="text-gray-700 font-medium">
//                         {item.name}{" "}
//                         <span className="text-[#946659] font-black italic">
//                           x{item.qty}
//                         </span>
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-5 font-black text-[#946659] text-lg">
//                   ${order.total_amount}
//                 </td>
//                 <td className="px-6 py-5 font-serif italic text-gray-600">
//                   {order.customer?.full_name || "Guest"}
//                 </td>
//                 <td className="px-6 py-5">
//                   <span
//                     className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusStyles[order.status]}`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-5">
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-bold text-gray-400 truncate max-w-[80px]">
//                       {order.operator?.full_name || "Unassigned"}
//                     </span>
//                     {order.operator && (
//                       <Link
//                         href={`/dashboard/profile/${order.operator.id}`}
//                         className="w-7 h-7 flex items-center justify-center bg-gray-50 rounded-full hover:text-[#946659] transition-all"
//                       >
//                         👤
//                       </Link>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-5 text-center">
//                   <button
//                     onClick={() => setSelectedOrder(order)}
//                     className="text-[10px] font-black bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-[#946659] transition-all"
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="p-4 border-t border-gray-50 flex justify-center gap-4 items-center">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className="text-[10px] font-black uppercase disabled:opacity-20"
//         >
//           Prev
//         </button>
//         <span className="text-[10px] font-bold text-gray-400">
//           Page {currentPage} of {totalPages || 1}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className="text-[10px] font-black uppercase disabled:opacity-20"
//         >
//           Next
//         </button>
//       </div>

//       {/* Detailed Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//           <div className="bg-white rounded-[40px] p-8 md:p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h2 className="font-serif text-3xl font-bold text-gray-900">
//                   Order Invoice
//                 </h2>
//                 <p className="text-[#946659] font-black text-xs tracking-tighter mt-1">
//                   {selectedOrder.order_id}
//                 </p>
//               </div>
//               <span
//                 className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${statusStyles[selectedOrder.status]}`}
//               >
//                 {selectedOrder.status}
//               </span>
//             </div>

//             <div className="grid grid-cols-2 gap-6 border-y border-gray-50 py-6 mb-6">
//               <div>
//                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
//                   Customer Name
//                 </p>
//                 <p className="text-sm font-bold text-gray-800">
//                   {selectedOrder.customer?.full_name || "Guest User"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
//                   Phone Number
//                 </p>
//                 <p className="text-sm font-bold text-gray-800">
//                   {selectedOrder.customer?.phone || "N/A"}
//                 </p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
//                   Shipping Address
//                 </p>
//                 <p className="text-sm font-serif italic text-gray-600 leading-relaxed">
//                   {selectedOrder.customer_address || "N/A"}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3 mb-8">
//               <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
//                 Itemized Breakdown
//               </p>
//               {selectedOrder.items?.map((item, i) => (
//                 <div key={i} className="flex justify-between text-sm">
//                   <span>
//                     {item.name}{" "}
//                     <span className="font-black text-[#946659] italic ml-1">
//                       x{item.qty}
//                     </span>
//                   </span>
//                   <span className="font-bold text-gray-800">
//                     ${(item.price * item.qty).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//               <div className="pt-4 mt-2 border-t flex justify-between items-center">
//                 <span className="text-xs font-black uppercase text-gray-400">
//                   Grand Total
//                 </span>
//                 <span className="text-2xl font-serif font-bold text-[#946659]">
//                   ${selectedOrder.total_amount}
//                 </span>
//               </div>
//             </div>

//             <button
//               onClick={() => setSelectedOrder(null)}
//               className="w-full py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs hover:bg-gray-200 transition-colors"
//             >
//               Close Details
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useOrderTable } from "@/hooks/useOrderTable";
import Link from "next/link";

export default function OrderTable({ orders = [] }) {
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

  const statusStyles = {
    pending: "bg-amber-50 text-amber-600",
    processing: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    cancelled: "bg-red-50 text-red-600",
    returned: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
      {/* Search Header */}
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-gray-800">
          Order Logistics
        </h3>
        <input
          type="text"
          placeholder="Search Order ID or Name..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-64 transition-all"
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
              <th className="px-6 py-4 text-center">Action</th>
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
                        <span className="text-[#946659] font-black italic">
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
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-[10px] font-black bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-[#946659] transition-all shadow-md"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Premium Pagination Footer */}
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

      {/* Modal - Kept as requested */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-8 md:p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  Order Invoice
                </h2>
                <p className="text-[#946659] font-black text-xs tracking-tighter mt-1">
                  {selectedOrder.order_id}
                </p>
              </div>
              <span
                className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${statusStyles[selectedOrder.status]}`}
              >
                {selectedOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 border-y border-gray-50 py-6 mb-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                  Customer
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {selectedOrder.customer?.full_name || "Guest"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                  Phone
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {selectedOrder.customer?.phone || "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                  Address
                </p>
                <p className="text-sm font-serif italic text-gray-600 leading-relaxed">
                  {selectedOrder.customer_address || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {selectedOrder.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>
                    {item.name}{" "}
                    <span className="font-black text-[#946659] italic ml-1">
                      x{item.qty}
                    </span>
                  </span>
                  <span className="font-bold text-gray-800">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-4 mt-2 border-t flex justify-between items-center">
                <span className="text-xs font-black uppercase text-gray-400">
                  Total
                </span>
                <span className="text-2xl font-serif font-bold text-[#946659]">
                  ${selectedOrder.total_amount}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs hover:bg-gray-200 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
