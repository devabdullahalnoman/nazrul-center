import Image from "next/image";
import Link from "next/link";

export default function BioSpotlight() {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side - Pulls focus on Mobile */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://placehold.co/600x800/1e3a8a/white?text=Nazrul+Portrait"
                alt="Portrait of Kazi Nazrul Islam"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            {/* Decorative background element for that "Production" feel */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary/20 rounded-2xl -z-0"></div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              The Rebel Poet
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Kazi Nazrul Islam: <br />
              <span className="text-primary">A Voice for Freedom</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kazi Nazrul Islam was a Bengali poet, writer, and musician, and
              the national poet of Bangladesh. Known as the{" "}
              <span className="font-semibold italic">Bidrohi Kobi</span> (Rebel
              Poet), his works explored themes of humanism, freedom, and
              revolution against oppression.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              He composed over 4,000 songs, known as Nazrul Sangeet, which are
              widely popular across the Bengali-speaking world today.
            </p>
            <div className="pt-4">
              <Link
                href="/biography"
                className="btn btn-primary btn-lg px-10 shadow-lg"
              >
                Read Full Biography
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
