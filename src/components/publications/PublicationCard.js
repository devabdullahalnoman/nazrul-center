import Image from "next/image";

export default function PublicationCard({ work }) {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-all border border-base-200 h-full">
      <figure className="px-4 pt-4">
        {/* Container with fixed aspect ratio and light background */}
        <div className="relative aspect-3/4 w-full bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
          {work.cover_url ? (
            <Image
              src={work.cover_url}
              alt={work.title}
              fill // Using fill for Next.js 16 within a relative container
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain p-2" // object-contain prevents cropping
              priority={false}
            />
          ) : (
            <span className="text-gray-400 italic">No Cover Image</span>
          )}
        </div>
      </figure>

      <div className="card-body items-center text-center p-6">
        <div className="badge badge-outline badge-sm mb-2 opacity-70">
          {work.type}
        </div>
        <h2 className="card-title text-lg font-bold">{work.title}</h2>
        <p className="text-sm text-gray-500">Year: {work.year}</p>
        <div className="card-actions mt-4 w-full">
          <button className="btn btn-neutral btn-block btn-sm">
            Read Details
          </button>
        </div>
      </div>
    </div>
  );
}
