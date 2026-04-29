import { featuredFilm } from "@/components/documentary/docuData";
import VideoPlayer from "@/components/documentary/VideoPlayer";

export default function DocumentaryFilmPage() {
  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Header Area */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Documentary Film
          </h1>
          <p className="text-xl text-primary font-medium italic">
            &ldquo;{featuredFilm.title}&rdquo;
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-12">
        {/* The Video Embed */}
        <VideoPlayer videoId={featuredFilm.youtubeId} />

        {/* Film Details Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 border-b border-base-300 pb-2 text-neutral">
              About the Film
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {featuredFilm.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="badge badge-lg badge-outline p-4">
                {featuredFilm.year}
              </div>
              <div className="badge badge-lg badge-outline p-4">
                Full Documentary
              </div>
              <div className="badge badge-lg badge-primary badge-outline p-4">
                Official Archive
              </div>
            </div>
          </div>

          {/* Credits Sidebar */}
          <div className="bg-base-200 p-8 rounded-3xl h-fit border border-base-300">
            <h3 className="font-bold text-xl mb-4 border-b border-base-300 pb-2">
              Production Credits
            </h3>
            <ul className="space-y-4">
              {featuredFilm.credits.map((credit, idx) => (
                <li key={idx}>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    {credit.role}
                  </p>
                  <p className="text-neutral font-medium">{credit.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
