"use client";
import { useState } from "react";

export default function InventoryList() {
  const [category, setCategory] = useState("All");

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Inventory Management
        </h1>
        <button className="bg-[#946659] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#946659]/20 hover:scale-105 transition-transform">
          + Add New Item
        </button>
      </header>

      {/* CATEGORIZED SORTING */}
      <div className="flex flex-wrap gap-3 border-b border-gray-100 pb-6">
        {[
          "All",
          "Physical Books",
          "Mugs",
          "T-Shirts",
          "Souvenirs",
          "Portraits",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setCategory(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              category === tab
                ? "bg-black text-white"
                : "text-gray-400 hover:text-black hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INVENTORY ITEM ROW */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black text-[#946659] uppercase tracking-tighter">
              Physical Book
            </span>
            <h3 className="text-xl font-serif font-bold text-gray-800">
              Sanchita (Standard Edition)
            </h3>
            <p className="text-sm font-bold text-gray-500 mt-1">
              $12.50 — <span className="italic">Stock: 140</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-gray-400 hover:text-red-500">
              Remove
            </button>
            <button className="text-xs font-bold text-gray-400 hover:text-black">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
