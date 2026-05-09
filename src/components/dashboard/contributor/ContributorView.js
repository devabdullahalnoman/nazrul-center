"use client";
import React from "react";
import { useContributorDashboard } from "@/hooks/useContributorDashboard";
import StatCard from "../StatCard";
import OrderPool from "../OrderPool"; // Shared component
import WishlistPool from "../WishlistPool"; // Shared component

export default function ContributorView({ user }) {
  const { orders, wishlist, stats, loading } = useContributorDashboard();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-[#946659] animate-pulse">
        Initialising Operational Pools...
      </div>
    );

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Operations Portal
          </h1>
          <p className="text-[#946659] font-medium italic">
            Welcome back, {user?.full_name}
          </p>
        </div>
      </header>

      {/* Reusing StatCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Orders"
          value={stats.pendingOrders}
          icon="📦"
          color="text-amber-600"
        />
        <StatCard
          title="Community Requests"
          value={stats.wishlistCount}
          icon="✨"
          color="text-[#946659]"
        />
        <StatCard title="Pool Total" value={stats.totalAssigned} icon="📊" />
      </div>

      {/* Shared Tables */}
      <div className="space-y-16">
        <section>
          <OrderPool orders={orders} />
        </section>
        <section>
          <WishlistPool wishlist={wishlist} />
        </section>
      </div>
    </div>
  );
}
