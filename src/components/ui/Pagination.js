"use client";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  //   if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 px-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-nazrul-ink bg-white border border-nazrul-sand rounded-2xl hover:bg-nazrul-base transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
      >
        <span className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
        Previous
      </button>

      {/* Page Indicator */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Page
        </span>
        <div className="flex items-center justify-center w-9 h-9 text-xs font-black rounded-full bg-nazrul-ink text-white shadow-lg border-2 border-white">
          {currentPage}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-nazrul-ink bg-white border border-nazrul-sand rounded-2xl hover:bg-nazrul-base transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
      >
        Next
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </div>
  );
}
