export function DashboardSearch({ placeholder, onSearch }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder || "Search archive..."}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-nazrul-terracotta transition-all text-nazrul-ink"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
    </div>
  );
}
