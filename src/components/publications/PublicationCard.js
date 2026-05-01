import Image from "next/image";

export default function PublicationCard({ work }) {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-all border border-base-200 h-full">
      <figure className="px-4 pt-4">
        {/* If there is a cover_url in the DB, show it. Otherwise, show placeholder */}
        <div className="aspect-3/4 w-full bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden">
          {work.cover_url ? (
            <Image
              src={work.cover_url}
              alt={work.title}
              width={0}
              height={0}
              sizes=""
              className="w-full h-full object-cover"
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
