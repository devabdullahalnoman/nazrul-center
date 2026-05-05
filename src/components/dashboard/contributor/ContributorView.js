"use client";
import StatCard from "../admin/StatCard";

export default function ContributorView({ user }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">
          Contributor <span className="text-[#946659]">Workspace</span>
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Editor: {user.full_name}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Assigned Orders" value="08" icon="📦" />
        <StatCard title="Drafts" value="03" icon="📝" />
        <StatCard title="Pending Review" value="01" icon="⏳" />
      </div>

      <div className="bg-white border-2 border-black rounded-3xl p-8">
        <h3 className="font-black uppercase text-xs text-gray-400 mb-4">
          Current Tasks
        </h3>
        <ul className="divide-y space-y-3">
          <li className="pt-3 flex justify-between font-bold text-sm">
            <span>Verify Nazrul Biography Draft</span>
            <span className="text-orange-500">URGENT</span>
          </li>
          <li className="pt-3 flex justify-between font-bold text-sm">
            <span>Process Order #1204 - Physical Book</span>
            <span className="text-gray-400">PENDING</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
