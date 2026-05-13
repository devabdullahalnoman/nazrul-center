"use client";

export function DashboardPagination({
  currentPage,
  totalPages,
  totalItems,
  label = "Archive",
  onPageChange,
}) {
  return (
    <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
      {/* Left side: Count */}
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic">
        Total {label}:{" "}
        <span className="text-nazrul-terracotta">{totalItems}</span>
      </p>

      {/* Right side: Controls */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-nazrul-sand rounded-xl disabled:opacity-20 text-nazrul-ink hover:bg-nazrul-base transition-all"
        >
          Prev
        </button>

        <div className="bg-white border border-nazrul-sand px-4 py-2 rounded-xl text-[10px] font-bold text-nazrul-terracotta shadow-sm">
          {currentPage} / {totalPages || 1}
        </div>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 text-[10px] font-black uppercase bg-white border border-nazrul-sand rounded-xl disabled:opacity-20 text-nazrul-ink hover:bg-nazrul-base transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}
