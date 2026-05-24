"use client";
import Link from "next/link";

export default function FloatingContact() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-99 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-nazrul-terracotta text-white rounded-full shadow-2xl hover:bg-primary hover:scale-110 transition-all duration-300 group"
      aria-label="Contact Us"
    >
      {/* Chat Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 md:h-7 md:w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>

      {/* Tooltip Label */}
      <span className="absolute right-16 bg-gray-800 text-white text-[10px] md:text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-gray-700">
        Contact Us
      </span>
    </Link>
  );
}
