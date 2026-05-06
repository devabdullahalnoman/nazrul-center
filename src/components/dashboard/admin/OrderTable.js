// "use client";
// import { useState } from "react";
// import Link from "next/link";

// export default function OrderTable({ orders }) {
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const statusStyles = {
//     pending: "bg-amber-50 text-amber-600",
//     processing: "bg-blue-50 text-blue-600",
//     completed: "bg-green-50 text-green-600",
//     cancelled: "bg-red-50 text-red-600",
//     returned: "bg-purple-50 text-purple-600",
//   };

//   return (
//     <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden mt-10">
//       <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 font-serif font-bold text-xl text-gray-800">
//         Order Logistics
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
//             <tr>
//               <th className="px-6 py-4">Items Ordered</th>
//               <th className="px-6 py-4">Total Price</th>
//               <th className="px-6 py-4">Orderer</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-6 py-4">Contributor</th>
//               <th className="px-6 py-4">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {orders.map((order) => (
//               <tr
//                 key={order.id}
//                 className="hover:bg-gray-50/30 transition-colors"
//               >
//                 <td className="px-6 py-5">
//                   {order.items?.map((item, i) => (
//                     <div key={i} className="text-gray-700 font-medium">
//                       {item.name}{" "}
//                       <span className="text-[#946659] font-black">
//                         x{item.qty}
//                       </span>
//                     </div>
//                   )) || "No items"}
//                 </td>
//                 <td className="px-6 py-5 font-black text-[#946659] text-lg">
//                   ${order.total_amount}
//                 </td>
//                 <td className="px-6 py-5 font-serif italic text-gray-600">
//                   {order.customer?.full_name || "Guest"}
//                 </td>
//                 <td className="px-6 py-5 text-[9px]">
//                   <span
//                     className={`px-3 py-1 rounded-full font-black uppercase ${statusStyles[order.status] || "bg-gray-100"}`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-5">
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-bold text-gray-400 truncate max-w-[80px]">
//                       {order.operator?.full_name || "N/A"}
//                     </span>
//                     {order.operator && (
//                       <Link
//                         href={`/dashboard/profile/${order.operator.id}`}
//                         className="p-1.5 bg-gray-50 rounded-full hover:text-[#946659]"
//                       >
//                         👤
//                       </Link>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-5">
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

//       {/* Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
//             <h2 className="font-serif text-3xl font-bold mb-6">
//               Order Details
//             </h2>
//             <div className="space-y-4">
//               <p className="text-xs font-black uppercase text-gray-400 tracking-widest">
//                 Phone
//               </p>
//               <p className="text-lg font-bold text-gray-900">
//                 {selectedOrder.customer?.phone || "No phone listed"}
//               </p>
//               <p className="text-xs font-black uppercase text-gray-400 tracking-widest">
//                 Shipping Address
//               </p>
//               <p className="text-lg font-serif italic text-gray-600">
//                 {selectedOrder.customer_address || "No address found"}
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedOrder(null)}
//               className="mt-10 w-full py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs hover:bg-gray-200 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";

export default function OrderTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusStyles = {
    pending: "bg-amber-50 text-amber-600",
    processing: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    cancelled: "bg-red-50 text-red-600",
    returned: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-32px border border-gray-100 shadow-sm overflow-hidden mt-10">
      <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 font-serif font-bold text-xl text-gray-800">
        Order Logistics
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Items & Qty</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Orderer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Contributor</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/30 transition-colors"
              >
                <td className="px-6 py-5">
                  {order.items?.map((item, i) => (
                    <div key={i} className="text-gray-700 font-medium">
                      {item.name}{" "}
                      <span className="text-[#946659] font-black italic">
                        x{item.qty}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-5 font-black text-[#946659] text-lg">
                  ${order.total_amount}
                </td>
                <td className="px-6 py-5 font-serif italic text-gray-600">
                  {order.customer?.full_name || "Guest"}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusStyles[order.status] || "bg-gray-100"}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">
                      {order.operator?.full_name || "N/A"}
                    </span>
                    {order.operator && (
                      <Link
                        href={`/dashboard/profile/${order.operator.id}`}
                        className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:text-[#946659] transition-all"
                      >
                        👤
                      </Link>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-[10px] font-black bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-[#946659] transition-all"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <h2 className="font-serif text-3xl font-bold mb-6">
              Delivery Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Phone
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {selectedOrder.customer?.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Address
                </p>
                <p className="text-lg font-serif italic text-gray-600 leading-relaxed">
                  {selectedOrder.customer_address || "N/A"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-10 w-full py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
