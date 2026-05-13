// features/dashboard/contributor/components/ContributorView.js
"use client";
import { useState } from "react";
import { useContributor } from "../hooks/useContributor";
import { StatsGrid } from "./StatsGrid";
import { OrderPool } from "../../shared/order-pool/components/OrderPool";
import { WishlistPool } from "../../shared/wishlist-pool/components/WishlistPool";
import { UniversalModal } from "@/components/ui/UniversalModal";
import { OrderDetailsContent } from "../../shared/order-pool/components/OrderDetailsContent";

export function ContributorView({ profile }) {
  const { stats, isLoading } = useContributor(profile.id);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) {
    return <div className="p-10 text-center font-serif italic text-nazrul-terracotta animate-pulse">Initializing Contributor Data...</div>;
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* 1. Status Cards */}
      <StatsGrid stats={stats} />

      {/* 2. Order Pool Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-nazrul-terracotta pl-6">
          <h3 className="text-2xl font-serif font-bold text-nazrul-ink">Active Order Pool</h3>
          <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Global Logistics</span>
        </div>
        <OrderPool onOpenDetail={setSelectedOrder} />
      </section>

      {/* 3. Wishlist Pool Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-nazrul-sand pl-6">
          <h3 className="text-2xl font-serif font-bold text-nazrul-ink">Archives Wishlist</h3>
          <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Interest Ledger</span>
        </div>
        <WishlistPool />
      </section>

      {/* Order Details Modal */}
      <UniversalModal 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        title="Order Detailed Dossier"
      >
        <OrderDetailsContent order={selectedOrder} />
      </UniversalModal>
    </div>
  );
}