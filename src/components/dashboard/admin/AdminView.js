// "use client";
// import StatCard from "./StatCard";

// export default function AdminView({ user }) {
//   return (
//     <div className="space-y-12">
//       <header className="border-b border-gray-100 pb-8">
//         <h1 className="text-4xl font-serif font-bold text-gray-900">
//           Command Center
//         </h1>
//         <p className="text-[#946659] font-medium italic mt-2">
//           Operational Oversight for {user.full_name}
//         </p>
//       </header>

//       {/* TIER 1: HIGH LEVEL STATUS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//         <StatCard
//           title="Total Revenue"
//           value="$24,500"
//           icon="💰"
//           color="text-[#946659]"
//         />
//         <StatCard title="Active Reports" value="05" icon="📊" />
//         <StatCard title="Pending Approvals" value="12" icon="📥" />
//         <StatCard title="Pending Reviews" value="08" icon="🔍" />
//         <StatCard title="Total Contributors" value="14" icon="👥" />
//       </div>

//       {/* TIER 2: DETAILED INVENTORY & TRAFFIC */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
//         <StatCard title="Visitors" value="1.8k" mini />
//         <StatCard title="User Accounts" value="920" mini />
//         <StatCard title="Shop Items" value="156" mini />
//         <StatCard title="Digital Books" value="48" mini />
//         <StatCard title="Completed Orders" value="312" mini />
//       </div>

//       {/* LIVE ORDERS LIST */}
//       <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
//         <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//           <h3 className="font-bold text-gray-800">Recent Order Activity</h3>
//           <span className="text-[10px] font-black bg-[#946659]/10 text-[#946659] px-3 py-1 rounded-full uppercase">
//             Real-time
//           </span>
//         </div>
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
//             <tr>
//               <th className="px-6 py-4">Items (Qty)</th>
//               <th className="px-6 py-4">Total Price</th>
//               <th className="px-6 py-4">Customer Details</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-6 py-4">Contributor Handler</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             <tr>
//               <td className="px-6 py-5">
//                 <span className="font-bold block">Agnibina Facsimile</span>
//                 <span className="text-xs text-gray-400 italic">Qty: 01</span>
//               </td>
//               <td className="px-6 py-5 font-bold text-[#946659]">$45.00</td>
//               <td className="px-6 py-5 text-xs">
//                 <span className="font-bold block">Tanvir Ahmed</span>
//                 <span>tanvir@mail.com</span>
//               </td>
//               <td className="px-6 py-5">
//                 <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase">
//                   Pending
//                 </span>
//               </td>
//               <td className="px-6 py-5 flex items-center gap-3">
//                 <span className="font-medium">Hasan R.</span>
//                 <button className="text-[9px] border border-gray-200 px-2 py-1 rounded bg-white hover:bg-gray-50 uppercase font-black">
//                   Profile
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import StatCard from "./StatCard";
import Link from "next/link";

export default function AdminView() {
  const { stats, orders, loading } = useAdminDashboard();

  if (loading) return (
    <div className="h-64 flex items-center justify-center font-serif italic text-[#946659] animate-pulse">
      Connecting to Nazrul Center Database...
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-serif font-bold text-gray-900">Command Center</h1>
        <p className="text-[#946659] font-medium italic">Operational Oversight</p>
      </header>

      {/* HERO SECTION: These use the 'Standard' StatCard style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toFixed(2)}`} 
          icon="💰" 
          color="text-[#946659]" 
        />
        <StatCard 
          title="Contributors" 
          value={stats.contributors} 
          icon="👥" 
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.ordersPending} 
          icon="📥" 
          color="text-amber-600" 
        />
        <StatCard 
          title="Open Tickets" 
          value={stats.messages} 
          icon="✉️" 
          color="text-red-500" 
        />
      </div>

      {/* UTILITY SECTION: These use the 'Mini' StatCard style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Shop Stock" value={stats.inventoryCount} mini />
        <StatCard title="E-Books" value={stats.bookCount} mini />
        <StatCard title="Total Visitors" value="1.2k" mini />
        <StatCard title="Active Reports" value="03" mini />
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="font-bold text-gray-800 font-serif">Logistics Stream</h3>
          <Link href="/dashboard/orders" className="text-xs font-black uppercase text-[#946659] hover:underline">View Ledger</Link>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-8 py-4">Destination</th>
              <th className="px-8 py-4">Total</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Handler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-5 text-gray-600 italic truncate max-w-[200px]">
                  {order.customer_address || "Pick-up Point"}
                </td>
                <td className="px-8 py-5 font-black text-[#946659]">${order.total_amount}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                    order.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right font-bold text-gray-400">
                  {order.operator?.full_name || "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}