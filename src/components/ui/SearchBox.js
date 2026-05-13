import { Search } from "lucide-react";

/**
 * Project-Wide Search Component
 * Fixed Hydration Mismatch by standardizing className string
 */
export default function SearchBox({
  value,
  onChange,
  placeholder = "Search the archive...",
}) {
  return (
    <div className="relative w-full max-w-xl mx-auto group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-nazrul-sand group-focus-within:text-nazrul-crimson transition-colors" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-6 py-4 bg-white border border-nazrul-sand/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-nazrul-crimson/5 focus:border-nazrul-crimson transition-all font-serif italic text-nazrul-ink shadow-sm"
      />
    </div>
  );
}
