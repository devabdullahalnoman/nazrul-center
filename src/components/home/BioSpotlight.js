import Image from "next/image";
import Link from "next/link";

export default function BioSpotlight() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-16">
          {/* Image Side - Centered and Sized Down */}
          <div className="w-full lg:w-[40%] flex justify-center">
            {/* Fixed Tailwind syntax: aspect-[3/4] and md:max-w-[400px] */}
            <div className="relative w-full max-w-70 sm:max-w-[320px] md:max-w-100 aspect-3/4 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/nazrul_portrait.jpg"
                alt="Portrait of Kazi Nazrul Islam"
                fill
                priority
                className="object-contain object-center"
                loading="eager"
              />
            </div>
          </div>

          {/* Text Side - Added max-w-2xl mx-auto to prevent awkward stretching on iPads */}
          <div className="w-full lg:w-1/2 space-y-5 sm:space-y-6 text-center lg:text-left max-w-2xl lg:max-w-none mx-auto">
            <div className="inline-flex px-3 py-1 rounded-md bg-nazrul-crimson/10 text-nazrul-crimson font-bold text-lg sm:text-xl uppercase tracking-widest">
              The Rebel Poet
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-nazrul-terracotta leading-tight">
              Kazi Nazrul Islam: <br className="hidden sm:block" />
              <span className="text-nazrul-crimson">A Voice for Freedom</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base md:text-2xl">
              <p className="text-gray-600 leading-relaxed">
                Kazi Nazrul Islam was a Bengali poet, writer, and musician, and
                the national poet of Bangladesh. Known as the{" "}
                <span className="font-bold italic text-gray-800">
                  Bidrohi Kobi
                </span>{" "}
                (Rebel Poet), his works explored themes of humanism, freedom,
                and revolution against oppression.
              </p>
              <p className="text-gray-600 leading-relaxed">
                He composed over 4,000 songs, known as{" "}
                <span className="font-semibold text-gray-800">
                  Nazrul Sangeet
                </span>
                , which are widely popular across the Bengali-speaking world
                today.
              </p>
            </div>

            <div className="pt-4 sm:pt-6">
              <Link
                href="/biography"
                className="inline-block bg-nazrul-terracotta text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full hover:bg-nazrul-crimson transition-all shadow-lg active:scale-95 text-sm sm:text-base"
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
