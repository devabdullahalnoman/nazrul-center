"use client";
import React from "react";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import StatCard from "../StatCard";
import OrderPool from "../OrderPool"; // Reusing the high-end table component
import WishlistPool from "../WishlistPool";

export default function UserView({ user }) {
  const { orders, wishlist, loading } = useUserDashboard(user?.id);

  if (loading)
    return (
      <div className="p-10 animate-pulse font-serif italic text-[#946659]">
        Loading your account...
      </div>
    );

  const pendingCount = orders.filter((o) => o.status !== "completed").length;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          My Account
        </h1>
        <p className="text-[#946659] font-medium italic">
          Track your orders and book requests
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Active Orders"
          value={pendingCount}
          icon="📦"
          color="text-amber-600"
        />
        <StatCard
          title="My Wishlist"
          value={wishlist.length}
          icon="❤️"
          color="text-[#946659]"
        />
      </div>

      <div className="space-y-16">
        <section>
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-800">
              Order History
            </h3>
          </div>
          {/* Reusing OrderPool: It will show only this user's orders */}
          <OrderPool orders={orders} />
        </section>

        <section>
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">
            Personal Wishlist
          </h3>
          <WishlistPool wishlist={wishlist} />
        </section>
      </div>
    </div>
  );
}
