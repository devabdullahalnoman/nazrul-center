"use client";
import { useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { OrderPool } from "../../shared/order-pool/components/OrderPool";
import { ContributorsLedger } from "./ContributorsLedger";
import { WishlistPool } from "../../shared/wishlist-pool/components/WishlistPool";
import { UniversalModal } from "@/components/ui/UniversalModal";
import { OrderDetailsContent } from "../../shared/order-pool/components/OrderDetailsContent";
import { ContributorDetailsContent } from "./ContributorDetailsContent";
import { StatsGrid } from "./StatsGrid";

export function AdminView() {
  const { contributors, stats, isLoading } = useAdmin();
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeStaff, setActiveStaff] = useState(null);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-nazrul-terracotta animate-pulse">
        Syncing Command Center...
      </div>
    );

  return (
    <div className="p-8 space-y-16 animate-in fade-in duration-700 bg-nazrul-base min-h-screen">
      <header className="border-b border-nazrul-sand pb-8">
        <h1 className="text-5xl font-serif font-bold text-nazrul-ink tracking-tight">
          Command Center
        </h1>
        <p className="text-nazrul-terracotta font-medium italic mt-2 text-lg">
          Platform Oversight & Archive Logistics
        </p>
      </header>

      <StatsGrid stats={stats} />

      <div className="space-y-12">
        <OrderPool onOpenDetail={setActiveOrder} />
        <ContributorsLedger
          contributors={contributors}
          onOpenDetail={setActiveStaff}
        />
        <WishlistPool />
      </div>

      <UniversalModal
        isOpen={!!activeOrder}
        onClose={() => setActiveOrder(null)}
        title="Order Detailed Dossier"
      >
        <OrderDetailsContent order={activeOrder} />
      </UniversalModal>

      <UniversalModal
        isOpen={!!activeStaff}
        onClose={() => setActiveStaff(null)}
        title="Staff Personnel Profile"
      >
        <ContributorDetailsContent contributor={activeStaff} />
      </UniversalModal>
    </div>
  );
}
