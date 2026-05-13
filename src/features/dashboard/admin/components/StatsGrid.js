"use client";
import { StatCard } from "@/features/dashboard/shared/components/StatCard";
import { useAdmin } from "../hooks/useAdmin";

export function StatsGrid() {
  const { stats, isLoading } = useAdmin();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse h-32 bg-white rounded-4xl w-full border border-gray-100"
          ></div>
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value={`$${Number(stats.revenue || 0).toLocaleString()}`}
        icon="💰"
        valueColorClass="text-nazrul-terracotta"
      />
      <StatCard
        title="Active Staff"
        value={stats.contributors || 0}
        icon="👥"
        valueColorClass="text-nazrul-ink"
      />
      <StatCard
        title="Pending Orders"
        value={stats.ordersPending || 0}
        icon="📥"
        valueColorClass="text-nazrul-ink"
      />
      <StatCard
        title="Open Tickets"
        value={stats.openTickets || 0}
        icon="✉️"
        valueColorClass="text-nazrul-crimson"
      />
    </div>
  );
}
