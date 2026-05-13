"use client";
import { useState } from "react";

export function DataTable({ title, columns, data = [], isLoading }) {
  if (isLoading)
    return (
      <div className="h-64 w-full bg-white animate-pulse rounded-4xl border border-gray-100" />
    );

  return (
    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
        <h3 className="font-serif font-bold text-2xl text-nazrul-ink">
          {title}
        </h3>
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
          {data.length} Total Records
        </span>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead className="bg-white text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-8 py-5 ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col, j) => (
                  <td
                    key={j}
                    className={`px-8 py-5 ${col.align === "right" ? "text-right" : ""}`}
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
