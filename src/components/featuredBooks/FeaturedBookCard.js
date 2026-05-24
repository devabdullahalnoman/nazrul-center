import Image from "next/image";
import Link from "next/link";
import { sanitizeHtml } from "@/lib/validation/sanitize";

export default function FeaturedBookCard({ book }) {
  return (
    // Responsive width: 160px on mobile, 240px on md screens (768px+)
    <div className="group min-w-40 md:min-w-60 snap-center shrink-0">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
        {/* Responsive height: 200px on mobile, 280px on md screens */}
        <div className="relative h-50 md:h-70 w-full overflow-hidden bg-gray-50">
          {book.cover_url ? (
            <Image
              src={book.cover_url}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 160px, 240px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-[10px] uppercase font-bold">
              No Cover
            </div>
          )}

          <div
            className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider text-gray-600"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(book.category) }}
          />
        </div>

        {/* Card Content */}
        <div className="p-3">
          <h3
            className="text-[12px] md:text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(book.title) }}
          />
          <p className="text-[9px] md:text-[10px] text-gray-400 mt-0.5 font-medium">
            {book.year ? `Published: ${book.year}` : "General Collection"}
          </p>

          <div className="mt-2 md:mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
            <Link
              href={`/publications/${book.id}`}
              className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider hover:text-primary-focus transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
