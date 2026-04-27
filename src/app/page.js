import FeaturedBooks from "@/components/FeaturedBooks";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <main>
        <Hero />

        {/* This container ensures content looks good on all screens */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Collections</h2>
            <div className="divider w-24 mx-auto divider-primary"></div>
          </div>

          <FeaturedBooks></FeaturedBooks>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
          </div>
        </section>
      </main>
    </>
  );
}
