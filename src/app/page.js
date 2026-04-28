import BioSpotlight from "@/components/BioSpotlight";
import FeaturedBooks from "@/components/FeaturedBooks";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <main>
        <Hero />

        {/* This container ensures content looks good on all screens */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <FeaturedBooks></FeaturedBooks>

          <BioSpotlight></BioSpotlight>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><br></br></div>
        </section>
      </main>
    </>
  );
}
