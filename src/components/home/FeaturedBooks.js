"use client"; // This is now a Client Component for interactivity

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
  // 1. Create a reference to the scrollable div
  const scrollRef = useRef(null);

  // 2. Function to handle the scrolling logic
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; // Adjust this based on card width
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto relative">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <div className="divider w-24 divider-primary"></div>
            <p className="text-gray-600 mt-2">
              Explore masterpieces by the Rebel Poet
            </p>
          </div>
          <Link href="/books" className="btn btn-ghost hidden sm:flex">
            View All →
          </Link>
        </div>

        {/* 3. Attach the ref to this div */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
        >
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

        {/* 4. Floating Arrows at the bottom */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll("left")}
            className="btn btn-circle btn-outline btn-primary shadow-md hover:scale-110 transition-transform flex items-center justify-center"
            aria-label="Scroll Left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            className="btn btn-circle btn-outline btn-primary shadow-md hover:scale-110 transition-transform flex items-center justify-center"
            aria-label="Scroll Right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/books" className="btn btn-outline btn-wide">
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
