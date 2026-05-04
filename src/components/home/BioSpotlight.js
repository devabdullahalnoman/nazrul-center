import Image from "next/image";
import Link from "next/link";

export default function BioSpotlight() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* Image Side - Centered and Sized Down */}
          <div className="w-full lg:w-[40%] flex justify-center">
            <div className="relative w-full max-w-[320px] md:max-w-400px aspect-3/4 rounded-2xl overflow-hidden shadow-xl">
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

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              The Rebel Poet
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              Kazi Nazrul Islam: <br />
              <span className="text-primary">A Voice for Freedom</span>
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Kazi Nazrul Islam was a Bengali poet, writer, and musician, and
                the national poet of Bangladesh. Known as the{" "}
                <span className="font-bold italic text-gray-800">
                  Bidrohi Kobi
                </span>{" "}
                (Rebel Poet), his works explored themes of humanism, freedom,
                and revolution against oppression.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                He composed over 4,000 songs, known as{" "}
                <span className="font-semibold text-gray-800">
                  Nazrul Sangeet
                </span>
                , which are widely popular across the Bengali-speaking world
                today.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/biography"
                className="inline-block bg-[#946659] text-white font-bold py-4 px-10 rounded-full hover:bg-primary transition-all shadow-lg active:scale-95"
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
