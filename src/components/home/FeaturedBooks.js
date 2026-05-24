"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useFeaturedBooks } from "@/hooks/useFeatured";

// CRITICAL: Import these styles
import "swiper/css";
import "swiper/css/navigation";
import FeaturedBookCard from "../featuredBooks/FeaturedBookCard";

export default function FeaturedBooks() {
  const { data: books, isLoading, isError } = useFeaturedBooks();

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;
  if (isError || !books || books.length === 0) return null;

  return (
    <section className="py-16 bg-nazrul-offwhite">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Featured Books
          </h2>
          <div className="h-1 w-12 bg-primary mt-2"></div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          // This links the logic to the custom class names below
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-8"
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <FeaturedBookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BOTTOM CONTROLS AREA */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
          {/* View All Button */}
          <Link
            href="/publications/featured"
            className="text-sm font-bold text-gray-900 hover:text-primary transition-all border-b-2 border-gray-900 hover:border-primary pb-1"
          >
            View All Featured Publications
          </Link>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button className="btn-prev p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-900 hover:text-white transition-all shadow-sm active:scale-90 disabled:opacity-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button className="btn-next p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-900 hover:text-white transition-all shadow-sm active:scale-90 disabled:opacity-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
