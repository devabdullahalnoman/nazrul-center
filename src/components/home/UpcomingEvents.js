import Image from "next/image";
import Link from "next/link";

export default function UpcomingEvent() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* NEW SECTION TITLE */}
        <div className="mb-10 text-center lg:text-left l mx-auto">
          <h2 className="text-4xl md:text-4xl font-black text-nazrul-terracotta">
            Upcomming Events
          </h2>
          <div className="w-20 h-1.5 bg-nazrul-crimson mt-4 mx-auto lg:mx-0 rounded-full"></div>
        </div>

        {/* EVENT CARD */}
        {/* Added "items-stretch" here to fix the image collapsing issue */}
        <div className="max-w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 items-stretch">
          {/* Image Section - Left Side */}
          {/* Added a strict min-height to guarantee the Next.js Image renders */}
          <div className="w-full lg:w-[45%] relative min-h-100 lg:min-h-auto bg-white">
            {/* MAKE SURE THIS src MATCHES YOUR EXACT FILENAME IN THE public FOLDER */}
            <Image
              src="/poster.jpeg"
              alt="Event Poster"
              fill
              sizes="100"
              priority
              className="object-contain object-center"
              loading="eager"
            />
            {/* Mobile Title Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent lg:hidden"></div>
            <div className="absolute bottom-6 left-6 pr-6 lg:hidden text-white">
              <span className="bg-[#d4af37] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-sm">
                Next Event
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-nazrul-sand drop-shadow-md">
                127th Nazrul Jayanti
              </h3>
              <p className="text-sm font-medium mt-1 text-nazrul-crimson">
                ১২৭তম নজরুল জয়ন্তী
              </p>
            </div>
          </div>

          {/* Details Section - Right Side */}
          <div className="w-full lg:w-[55%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <div className="hidden lg:inline-flex w-fit px-3 py-1 rounded-md bg-red-50 text-nazrul-crimson font-bold text-sm uppercase tracking-widest mb-6 border border-red-100">
              Upcoming Event
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-nazrul-terracotta leading-tight mb-2">
                127th Nazrul Jayanti
              </h2>
              <h3 className="text-xl md:text-2xl text-nazrul-crimson font-bold">
                ১২৭তম নজরুল জয়ন্তী
              </h3>
            </div>

            <div className="space-y-6 sm:space-y-8 mb-10">
              {/* Date & Time */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="mt-1 bg-red-50 p-3 rounded-full text-red-600 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg sm:text-xl">
                    Sunday, May 24, 2026
                  </p>
                  <p className="text-gray-600 mt-1">
                    12:00 PM - 06:00 PM (১০ জ্যৈষ্ঠ ১৪৩৩)
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="mt-1 bg-red-50 p-3 rounded-full text-red-600 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg sm:text-xl">
                    Jatra Biroti
                  </p>
                  <p className="text-gray-600 mt-1">Banani, Dhaka</p>
                </div>
              </div>

              {/* Performers */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="mt-1 bg-red-50 p-3 rounded-full text-red-600 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg sm:text-xl mb-1">
                    Featured Artists
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Umme Ruma Trophy, Asheesh Kumar Sheel, & Shayla Rahman
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
