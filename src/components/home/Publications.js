import Image from "next/image";
import Link from "next/link";

export default function Publications() {
  const books = [
    {
      id: 1,
      src: "https://rhaxakxqjpkjepkhpdnu.supabase.co/storage/v1/object/public/publications-cover/Mrityu%20Khudha.jpg",
      alt: "Mrityukshuda",
    },
    {
      id: 2,
      src: "https://rhaxakxqjpkjepkhpdnu.supabase.co/storage/v1/object/public/publications-cover/rn-image_picker_lib_temp_24eefbba-4401-4e86-9397-151e2e1f60da.jpg",
      alt: "Shiuli Mala",
    },
    {
      id: 3,
      src: "https://rhaxakxqjpkjepkhpdnu.supabase.co/storage/v1/object/public/publications-cover/Samyabadi-By-Kazi-Nazrul-Islam.jpg",
      alt: "Samayabadi",
    },
    {
      id: 4,
      src: "https://rhaxakxqjpkjepkhpdnu.supabase.co/storage/v1/object/public/publications-cover/13498464.jpg",
      alt: "Agni-Bina",
    },
  ];

  return (
    <section className="py-14 bg-nazrul-offwhite">
      <div className="container mx-auto px-6">
        {/* Reduced gap from 10/12 to 6 here */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {/* Left Side: Content */}
          <div className="w-full lg:w-[40%] space-y-5 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-nazrul-terracotta tracking-tight">
                Publications
              </h2>
              <div className="h-1.5 w-16 bg-nazrul-crimson mt-3 rounded-full"></div>
              <p className="text-gray-600 text-sm md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                Explore the literary works of Kazi Nazrul Islam and scholarly
                publications written about his life and contributions.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/publications"
                className="bg-nazrul-terracotta text-white px-7 py-3 rounded-3xl font-bold text-lg  hover:bg-nazrul-crimson transition-all shadow-sm"
              >
                View More
              </Link>
            </div>
          </div>

          {/* Right Side: Compact Image Grid */}
          <div className="w-full lg:w-[45%] flex justify-center items-center">
            {/* max-w-[420px] ensures it doesn't get too large on wide screens */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 w-100">
              {books.map((book, index) => (
                <div
                  key={book.id}
                  className={`relative aspect-4/6 w-full overflow-hidden rounded shadow-md transition-transform duration-500 hover:scale-[1.03] ${
                    // Subtler stagger (mt-6) for a tighter look
                    index % 2 !== 0 ? "mt-6" : ""
                  }`}
                >
                  <Image
                    src={book.src}
                    alt={book.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
