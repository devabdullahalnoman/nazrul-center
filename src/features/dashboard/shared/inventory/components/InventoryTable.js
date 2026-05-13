"use client";
import Image from "next/image";
import { DataTable } from "@/features/dashboard/shared/components/DataTable";

export function InventoryTable({ items, onManage }) {
  const columns = [
    {
      header: "Item",
      render: (item) => (
        <div className="relative w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={
              item.image_url || "https://placehold.co/400x400/png?text=No+Image"
            }
            alt=""
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: "Title",
      render: (item) => (
        <span className="font-bold text-gray-900">{item.item_name}</span>
      ),
    },
    {
      header: "Type",
      render: (item) => (
        <span className="text-[10px] font-black uppercase text-gray-400">
          {item.item_type}
        </span>
      ),
    },
    {
      header: "Price",
      render: (item) => (
        <span className="font-black text-nazrul-terracotta">${item.price}</span>
      ),
    },
    {
      header: "Stock",
      align: "center",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black ${item.stock_quantity < 10 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}
        >
          {item.stock_quantity}
        </span>
      ),
    },
    {
      header: "Action",
      align: "right",
      render: (item) => (
        <button
          onClick={() => onManage(item)}
          className="text-[10px] font-black bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-nazrul-terracotta transition-all uppercase"
        >
          Manage
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
      {/* showPagination={false} ensures we don't get two sets of controls */}
      <DataTable columns={columns} data={items} showPagination={false} />
    </div>
  );
}
