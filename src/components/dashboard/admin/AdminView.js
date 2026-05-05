"use client";
import StatCard from "./StatCard";

export default function AdminView({ user }) {
  return (
    <div className="space-y-12">
      <header className="border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900">
          Command Center
        </h1>
        <p className="text-[#946659] font-medium italic mt-2">
          Operational Oversight for {user.full_name}
        </p>
      </header>

      {/* TIER 1: HIGH LEVEL STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Revenue"
          value="$24,500"
          icon="💰"
          color="text-[#946659]"
        />
        <StatCard title="Active Reports" value="05" icon="📊" />
        <StatCard title="Pending Approvals" value="12" icon="📥" />
        <StatCard title="Pending Reviews" value="08" icon="🔍" />
        <StatCard title="Total Contributors" value="14" icon="👥" />
      </div>

      {/* TIER 2: DETAILED INVENTORY & TRAFFIC */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <StatCard title="Visitors" value="1.8k" mini />
        <StatCard title="User Accounts" value="920" mini />
        <StatCard title="Shop Items" value="156" mini />
        <StatCard title="Digital Books" value="48" mini />
        <StatCard title="Completed Orders" value="312" mini />
      </div>

      {/* LIVE ORDERS LIST */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Order Activity</h3>
          <span className="text-[10px] font-black bg-[#946659]/10 text-[#946659] px-3 py-1 rounded-full uppercase">
            Real-time
          </span>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Items (Qty)</th>
              <th className="px-6 py-4">Total Price</th>
              <th className="px-6 py-4">Customer Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Contributor Handler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr>
              <td className="px-6 py-5">
                <span className="font-bold block">Agnibina Facsimile</span>
                <span className="text-xs text-gray-400 italic">Qty: 01</span>
              </td>
              <td className="px-6 py-5 font-bold text-[#946659]">$45.00</td>
              <td className="px-6 py-5 text-xs">
                <span className="font-bold block">Tanvir Ahmed</span>
                <span>tanvir@mail.com</span>
              </td>
              <td className="px-6 py-5">
                <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase">
                  Pending
                </span>
              </td>
              <td className="px-6 py-5 flex items-center gap-3">
                <span className="font-medium">Hasan R.</span>
                <button className="text-[9px] border border-gray-200 px-2 py-1 rounded bg-white hover:bg-gray-50 uppercase font-black">
                  Profile
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
