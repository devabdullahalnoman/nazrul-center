import Image from "next/image";
import { sanitizeHtml } from "@/lib/validation/sanitize";

export default function PublicationCard({ work }) {
  return (
    <div className="flex flex-col bg-[#F8F8F8] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/60 overflow-hidden h-full group">
      {/* Cover Image Section */}
      <figure className="relative w-full aspect-3/4 bg-white border-b border-gray-100 flex items-center justify-center p-4 overflow-hidden">
        {work.cover_url ? (
          <Image
            src={work.cover_url}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        ) : (
          <span className="text-gray-400 text-[13px] font-medium italic">
            No Cover Image
          </span>
        )}
      </figure>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 lg:p-6">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {work.type && (
            <span
              className="px-2.5 py-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider border border-gray-300 text-gray-600 rounded-full"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(work.type) }}
            />
          )}
          {work.category && (
            <span className="px-2.5 py-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider border border-nazrul-terracotta text-nazrul-terracotta bg-nazrul-terracotta/5 rounded-full">
              {work.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className="text-[17px] xl:text-[19px] font-bold text-gray-800 leading-snug mb-1.5 group-hover:text-nazrul-terracotta transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(work.title) }}
        />

        {/* Author & Year */}
        <div className="flex flex-wrap items-baseline gap-1.5 mb-3">
          <span className="text-[14px] font-semibold text-nazrul-terracotta">
            {work.author}
          </span>
          {work.year && (
            <span className="text-[13px] font-medium text-gray-500">
              • {work.year}
            </span>
          )}
        </div>

        {/* Description (Clamped to prevent layout breaking) */}
        {work.description ? (
          <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
            {work.description}
          </p>
        ) : (
          <div className="flex-1 mb-4" /> // Spacer if no description exists to push button down
        )}

        {/* Action Button */}
        {/* <div className="mt-auto pt-4 border-t border-gray-200/80">
          <button className="w-full py-2.5 bg-[#946659] hover:bg-nazrul-crimson text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm">
            Read Details
          </button>
        </div> */}
      </div>
    </div>
  );
}
