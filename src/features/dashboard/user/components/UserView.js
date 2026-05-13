"use client";
import { useState } from "react";
import { useUserDashboard } from "../hooks/useUserDashboard";
import { DataTable } from "@/features/dashboard/shared/components/DataTable";
import { UniversalModal } from "@/components/ui/UniversalModal";
import { OrderDetailsContent } from "../../shared/order-pool/components/OrderDetailsContent";
import { History, Loader2 } from "lucide-react";

export function UserView() {
  const { orders, isLoading } = useUserDashboard();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderColumns = [
    {
      header: "Order ID",
      render: (r) => (
        <span className="font-mono text-[10px] text-gray-400">
          {r.order_id}
        </span>
      ),
    },
    {
      header: "Items & Qty",
      render: (r) => <span className="font-medium">{r.displayItems}</span>,
    },
    {
      header: "Customer",
      render: (r) => (
        <div className="flex flex-col">
          <span className="font-bold text-xs">{r.customerName}</span>
          <span className="text-[10px] text-gray-400">{r.customerEmail}</span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (r) => (
        <span className="text-[10px] font-black uppercase px-3 py-1 bg-nazrul-base text-nazrul-terracotta rounded-full">
          {r.status}
        </span>
      ),
    },
    {
      header: "Total",
      render: (r) => (
        <span className="font-black text-nazrul-ink">BDT {r.total_amount}</span>
      ),
    },
    {
      header: "Action",
      align: "right",
      render: (r) => (
        <button
          onClick={() => setSelectedOrder(r)}
          className="px-5 py-2 text-[10px] font-black bg-nazrul-ink text-white rounded-xl hover:bg-nazrul-terracotta transition-all uppercase"
        >
          Details
        </button>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center italic text-nazrul-terracotta">
        <Loader2 className="animate-spin mr-2" />
        Syncing Archive...
      </div>
    );

  return (
    <div className="p-8 space-y-12 bg-nazrul-base min-h-screen">
      <header className="border-b border-nazrul-sand pb-8">
        <h1 className="text-5xl font-serif font-bold text-nazrul-ink uppercase tracking-tight">
          My Archive
        </h1>
      </header>

      <DataTable columns={orderColumns} data={orders} />

      <UniversalModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Details"
      >
        {/* selectedOrder now contains items with 'qty' keys for the modal */}
        <OrderDetailsContent order={selectedOrder} />
      </UniversalModal>
    </div>
  );
}
