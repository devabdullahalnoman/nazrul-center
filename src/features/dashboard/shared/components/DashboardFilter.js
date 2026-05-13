"use client";

export function DashboardFilter({ options, activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onFilterChange(opt.value)}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm whitespace-nowrap ${
            activeFilter === opt.value
              ? "bg-nazrul-ink text-white"
              : "bg-white text-nazrul-ink border border-nazrul-sand hover:bg-nazrul-base"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
