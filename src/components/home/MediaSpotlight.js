// src/components/MediaSpotlight.js
export default function MediaSpotlight() {
  const videoId = "Fy6LJAT2hkI?si=Pkp2auyzEn-lVZlu";

  return (
    <section className="py-20 bg-nazrul-offwhite">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-nazrul-terracotta leading-tight">
            <p className="text-3xl text-nazrul-crimson font-medium">Nazrul Center Presents</p><p>Biography of Nazrul</p>
          </h2>
          <div className="h-1.5 w-20 bg-nazrul-crimson mt-4 rounded-full"></div>
        </div>

        {/* Bigger Video Player Section */}
        <div className="flex flex-col justify-center items-center gap-12">
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
          <div className="w-full space-y-6 flex flex-col justify-center items-center lg:w-3/4">
            <div className="space-y-4">
              <p className="text-2xl text-nazrul-crimson italic font-medium leading-relaxed border-l-4 rounded-md border-nazrul-crimson pl-4">
                &quot;I am the rebel poet, I am the heart of the world.&quot;
              </p>
              <p className="text-nazrul-terracotta leading-relaxed text-sm md:text-3xl italic">
                Nazrul Center presents documentary covering the scattered
                memories of Nazrul Islam from Churulia to Dhaka. This film
                explores his unwavering spirit and revolutionary contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
