"use client";

export function DashboardSearch({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        placeholder={placeholder}
        className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-1 ring-nazrul-terracotta w-full shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
