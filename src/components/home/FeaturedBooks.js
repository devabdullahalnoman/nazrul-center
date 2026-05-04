"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFeaturedBooks } from "@/hooks/useFeatured";

export default function FeaturedBooks() {
  const { data: books, isLoading, isError } = useFeaturedBooks();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return <div className="py-24 text-center animate-pulse">Loading...</div>;

  // Debug check: If this message shows up, the API is returning an empty array.
  if (!books || books.length === 0) {
    console.warn("No books found with is_featured = true");
    return null;
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Featured Books
            </h2>
            <div className="h-1.5 w-20 bg-[#be123c] mt-6 rounded-full"></div>
          </div>
          <Link
            href="/publications"
            className="group font-bold text-gray-900 flex items-center gap-2 hover:text-[#be123c]"
          >
            View All Library{" "}
            <span className="transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory hide-scrollbar"
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="group min-w-[300px] md:min-w-[340px] snap-center shrink-0"
            >
              <div className="bg-[#fcfaf9] rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-[460px] w-full overflow-hidden bg-gray-200">
                  {book.cover_url ? (
                    <Image
                      src={book.cover_url}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Cover
                    </div>
                  )}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-800">
                    {book.category}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 uppercase font-bold tracking-widest">
                    Pub. Year: {book.year}
                  </p>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-500 uppercase">
                      Kazi Nazrul Islam
                    </span>
                    <Link
                      href={`/publications/${book.id}`}
                      className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#be123c] transition-all"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
