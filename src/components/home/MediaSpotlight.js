// src/components/MediaSpotlight.js
export default function MediaSpotlight() {
  const videoId = "Fy6LJAT2hkI?si=Pkp2auyzEn-lVZlu";

  return (
    <section className="py-20 bg-[#fcfaf9]">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Biography of Nazrul
          </h2>
          <div className="h-1.5 w-20 bg-[#be123c] mt-4 rounded-full"></div>
        </div>

        {/* Bigger Video Player Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Video Player - Left (or Top on Mobile) */}
          <div className="w-full lg:w-3/4">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black group">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Biography of Kazi Nazrul Islam"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>

          {/* Context/Description Side - Right (or Bottom on Mobile) */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="space-y-4">
              <p className="text-xl text-gray-600 italic font-medium leading-relaxed border-l-4 border-gray-200 pl-4">
                &quot;I am the rebel poet, I am the heart of the world.&quot;
              </p>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                Watch the award-winning documentary covering the scattered
                memories of Nazrul Islam from Churulia to Dhaka. This film
                explores his unwavering spirit and revolutionary contributions.
              </p>
            </div>

            <div className="pt-4">
              <button className="w-full py-3 px-6 rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all active:scale-95">
                Watch Film Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
