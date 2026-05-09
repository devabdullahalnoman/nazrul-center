"use client";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import StatCard from "../StatCard";
import OrderTable from "../OrderPool";
import ContributorsTable from "./ContributorsTable";
import WishlistTable from "../WishlistPool";

export default function AdminView() {
  const { stats, orders, contributors, wishlist, loading } =
    useAdminDashboard();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-[#946659] animate-pulse">
        Syncing Command Center...
      </div>
    );

  return (
    <div className="space-y-10 p-8">
      <header>
        <h1 className="text-4xl font-serif font-bold text-gray-900">
          Command Center
        </h1>
        <p className="text-[#946659] font-medium italic">
          Operational Oversight
        </p>
      </header>

      {/* Row 1: Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.revenue}
          icon="💰"
          color="text-[#946659]"
        />
        <StatCard title="Contributors" value={stats.contributors} icon="👥" />
        <StatCard
          title="Pending Orders"
          value={stats.ordersPending}
          icon="📥"
        />
        <StatCard
          title="Open Tickets"
          value={stats.messages}
          icon="✉️"
          color="text-red-500"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders} mini />
        <StatCard title="Shop Stock" value={stats.inventoryCount} mini />
        <StatCard title="E-Books" value={stats.bookCount} mini />
        <StatCard title="Visitors" value={stats.visitors} mini />
      </div>

      {/* Data Tables */}
      <div className="space-y-16">
        <OrderTable orders={orders} />
        <ContributorsTable contributors={contributors} />
        <WishlistTable wishlist={wishlist} />
      </div>
    </div>
  );
}
