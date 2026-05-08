// "use client";
// import Image from "next/image";
// import { useContributorTable } from "@/hooks/useContributorTable";

// export default function ContributorsTable({ contributors }) {
//   const {
//     paginatedData,
//     setSearchQuery,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     selectedContributor,
//     setSelectedContributor,
//   } = useContributorTable(contributors, 5);

//   return (
//     <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
//       <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
//         <h3 className="font-serif font-bold text-xl text-gray-800">
//           Contributors Ledger
//         </h3>
//         <input
//           placeholder="Search name..."
//           className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-64"
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <table className="w-full text-sm text-left">
//         <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
//           <tr>
//             <th className="px-6 py-4">Photo</th>
//             <th className="px-6 py-4">Name</th>
//             <th className="px-6 py-4">Email</th>
//             <th className="px-6 py-4 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-50">
//           {paginatedData.map((c) => (
//             <tr key={c.id} className="hover:bg-gray-50/30 transition-colors">
//               <td className="px-6 py-4">
//                 <div className="relative w-10 h-10">
//                   <Image
//                     src={
//                       c.avatar_url ||
//                       `https://ui-avatars.com/api/?name=${c.full_name}&background=random`
//                     }
//                     alt={c.full_name}
//                     fill
//                     className="rounded-full object-cover border border-gray-100"
//                   />
//                 </div>
//               </td>
//               <td className="px-6 py-4 font-bold text-gray-900">
//                 {c.full_name}
//               </td>
//               <td className="px-6 py-4 text-gray-500">{c.email}</td>
//               <td className="px-6 py-4 text-center">
//                 <button
//                   onClick={() => setSelectedContributor(c)}
//                   className="text-[10px] font-black bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-[#946659] transition-all"
//                 >
//                   View Profile
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="p-4 border-t flex justify-center gap-4 items-center">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className="text-[10px] font-black uppercase disabled:opacity-20"
//         >
//           Prev
//         </button>
//         <span className="text-[10px] font-bold text-gray-400 font-mono">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className="text-[10px] font-black uppercase disabled:opacity-20"
//         >
//           Next
//         </button>
//       </div>

//       {/* Profile Detail Modal */}
//       {selectedContributor && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
//           <div className="bg-white rounded-[40px] p-8 md:p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
//             <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-gray-50">
//               <div className="relative w-32 h-32">
//                 <Image
//                   src={
//                     selectedContributor.avatar_url ||
//                     `https://ui-avatars.com/api/?name=${selectedContributor.full_name}`
//                   }
//                   alt=""
//                   fill
//                   className="rounded-[40px] object-cover shadow-xl"
//                 />
//               </div>
//               <div className="text-center md:text-left">
//                 <h2 className="font-serif text-4xl font-bold text-gray-900">
//                   {selectedContributor.full_name}
//                 </h2>
//                 <p className="text-[#946659] font-medium text-lg italic mt-1">
//                   {selectedContributor.email}
//                 </p>
//                 <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500 font-medium">
//                   <span>
//                     📞 {selectedContributor.phone || "No phone listed"}
//                   </span>
//                   <span>
//                     📍 {selectedContributor.address || "No address provided"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             {/* Handled Orders mapping logic here... */}
//             <button
//               onClick={() => setSelectedContributor(null)}
//               className="mt-10 w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase hover:bg-[#946659] transition-all"
//             >
//               Close Profile
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
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

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm mt-10 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="font-serif font-bold text-xl text-gray-800">
          Contributors Ledger
        </h3>
        <input
          placeholder="Search name or email..."
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#946659] w-64"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
                      alt={c.full_name}
                      fill
                      className="rounded-full object-cover border border-gray-100"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {c.full_name}
                </td>
                <td className="px-6 py-4 text-gray-500">{c.email}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setSelectedContributor(c)}
                    className="text-[10px] font-black bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-[#946659] transition-all shadow-md"
                  >
                    View Profile
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
          Total Contributors:{" "}
          <span className="text-[#946659]">{contributors.length}</span>
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

      {/* Modal - Detailed as requested */}
      {selectedContributor && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-8 md:p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-gray-50">
              <div className="relative w-32 h-32">
                <Image
                  src={
                    selectedContributor.avatar_url ||
                    `https://ui-avatars.com/api/?name=${selectedContributor.full_name}`
                  }
                  alt=""
                  fill
                  className="rounded-[40px] object-cover shadow-xl border-4 border-white"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-serif text-4xl font-bold text-gray-900">
                  {selectedContributor.full_name}
                </h2>
                <p className="text-[#946659] font-medium text-lg italic mt-1">
                  {selectedContributor.email}
                </p>
                <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500 font-medium">
                  <span>
                    📞 {selectedContributor.phone || "No phone listed"}
                  </span>
                  <span>
                    📍 {selectedContributor.address || "No address listed"}
                  </span>
                </div>
              </div>
            </div>

            <h4 className="font-black uppercase text-[10px] text-gray-400 tracking-widest mb-4">
              Handling History
            </h4>
            <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100/50 font-black text-[9px] uppercase text-gray-400">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Value</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedContributor.orders?.length > 0 ? (
                    selectedContributor.orders.map((o) => (
                      <tr
                        key={o.id}
                        className="hover:bg-white transition-colors"
                      >
                        <td className="p-4 font-mono text-gray-400">
                          {o.order_id}
                        </td>
                        <td className="p-4 font-bold text-[#946659]">
                          ${o.total_amount}
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-[9px] font-black uppercase">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="p-8 text-center text-gray-400 italic"
                      >
                        No handled orders yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setSelectedContributor(null)}
              className="mt-10 w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase hover:bg-[#946659] transition-all"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
