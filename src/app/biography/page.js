import Image from "next/image";
import BioSidebar from "../../components/biography/BioSidebar";
import BioContent from "../../components/biography/BioContent";

export default function BiographyPage() {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Biography Of Kazi Nazrul Islam
          </h1>
          <p className="text-xl text-primary font-medium tracking-wide">
            The Rebel Poet of Bengal
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-11/12 px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <BioSidebar></BioSidebar>

          <BioContent></BioContent>

          {/* RIGHT SIDEBAR: Portrait */}
          <aside className="lg:w-1/3 order-1 lg:order-3">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://placehold.co/400x500/1e3a8a/white?text=Nazrul+Portrait"
                  alt="Kazi Nazrul Islam Portrait"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <p className="text-center mt-4 text-sm italic text-gray-500 font-bold">
                The Rebel Poet of Bengal
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
