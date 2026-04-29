// src/components/MediaSpotlight.js
export default function MediaSpotlight() {
  return (
    <section className="py-20 px-4 bg-neutral text-neutral-content">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
          {/* Use an iframe for YouTube or a Video component here */}
          <div className="flex items-center justify-center h-full text-white/20">
            [Documentary Video Player]
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Biography of Nazrul</h2>
          <p className="text-lg opacity-80 italic">
            &quot;I am the rebel poet, I am the heart of the world.&quot;
          </p>
          <p className="opacity-70 leading-relaxed">
            Watch the award-winning documentary covering the scattered memories
            of Nazrul Islam from Churulia to Dhaka.
          </p>
          <button className="btn btn-primary btn-outline">
            Watch Film Details
          </button>
        </div>
      </div>
    </section>
  );
}
