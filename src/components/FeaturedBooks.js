import Image from "next/image";
import Link from "next/link";

// Mock data for production - replace with real images later!
const featuredBooks = [
  {
    id: 1,
    title: "Agnibeena",
    category: "Poetry",
    img: "https://placehold.co/400x600/1e3a8a/white?text=Agnibeena",
  },
  {
    id: 2,
    title: "Bisher Bashi",
    category: "Poetry",
    img: "https://placehold.co/400x600/1e3a8a/white?text=Bisher+Bashi",
  },
  {
    id: 3,
    title: "Bandhan Hara",
    category: "Novel",
    img: "https://placehold.co/400x600/1e3a8a/white?text=Bandhan+Hara",
  },
  {
    id: 4,
    title: "Rikter Bedan",
    category: "Short Story",
    img: "https://placehold.co/400x600/1e3a8a/white?text=Rikter+Bedan",
  },
  {
    id: 5,
    title: "Bulbul",
    category: "Songs",
    img: "https://placehold.co/400x600/1e3a8a/white?text=Bulbul",
  },
];

export default function FeaturedBooks() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <p className="text-gray-600 mt-2">
              Explore masterpieces by the Rebel Poet
            </p>
          </div>
          <Link href="/books" className="btn btn-ghost hidden sm:flex">
            View All →
          </Link>
        </div>

        {/* Horizontal scroll container with snapping for mobile/tablet */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="card bg-base-100 shadow-xl min-w-62.5 md:min-w-75 snap-center shrink-0 border border-base-200"
            >
              <figure className="relative h-64 w-full bg-base-200">
                <Image
                  src={book.img}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 250px, 300px"
                  className="object-cover"
                />
              </figure>
              <div className="card-body p-5">
                <div className="badge badge-primary badge-outline">
                  {book.category}
                </div>
                <h3 className="card-title text-lg mt-1">{book.title}</h3>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only view all button */}
        <div className="text-center mt-4 sm:hidden">
          <Link href="/books" className="btn btn-outline btn-wide">
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
