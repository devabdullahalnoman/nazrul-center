"use client";
import Image from "next/image";
import { DataTable } from "@/features/dashboard/shared/components/DataTable";

export function PublicationTable({ items, onManage }) {
  const columns = [
    {
      header: "Cover",
      render: (p) => (
        <div className="relative w-12 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={
              p.cover_url || "https://placehold.co/400x600/png?text=No+Cover"
            }
            alt={p.title}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      ),
    },
    {
      header: "Title & Author",
      render: (p) => (
        <div className="flex flex-col">
          <span className="font-bold text-nazrul-ink leading-tight">
            {p.title}
          </span>
          <span className="text-[10px] text-nazrul-terracotta italic font-medium">
            {p.author}
          </span>
        </div>
      ),
    },
    {
      header: "Category",
      render: (p) => (
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">
          {p.category}
        </span>
      ),
    },
    {
      header: "Year",
      render: (p) => (
        <span className="font-mono text-xs text-gray-600">{p.year || "—"}</span>
      ),
    },
    {
      header: "Featured",
      align: "center",
      render: (p) =>
        p.is_featured ? (
          <div className="w-5 h-5 bg-nazrul-terracotta/10 rounded-full flex items-center justify-center text-nazrul-terracotta text-[10px]">
            ★
          </div>
        ) : (
          <span className="text-gray-200 text-xs">☆</span>
        ),
    },
    {
      header: "Action",
      align: "right",
      render: (p) => (
        <button
          onClick={() => onManage(p)}
          className="text-[10px] font-black bg-nazrul-ink text-white px-5 py-2 rounded-xl hover:bg-nazrul-terracotta transition-all uppercase shadow-md"
        >
          Manage
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={items} showPagination={false} />;
}
