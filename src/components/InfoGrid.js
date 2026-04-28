import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Biography",
    desc: "The life and legacy of the Rebel Poet",
    icon: "📜",
    href: "/biography",
    color: "bg-blue-50",
  },
  {
    id: 2,
    title: "Poetry",
    desc: "A digital collection of revolutionary verses",
    icon: "✍️",
    href: "/poetry",
    color: "bg-red-50",
  },
  {
    id: 3,
    title: "Music",
    desc: "Explore 4,000+ Nazrul Sangeet recordings",
    icon: "🎵",
    href: "/music",
    color: "bg-amber-50",
  },
  {
    id: 4,
    title: "Archive",
    desc: "Historical manuscripts and documents",
    icon: "📚",
    href: "/archive",
    color: "bg-green-50",
  },
];

export default function InfoGrid() {
  return (
    <section className="py-12 bg-base-100 px-4">
      <div className="container mx-auto">
        {/* Responsive logic:
            grid-cols-1 (Phone)
            sm:grid-cols-2 (Tablet)
            lg:grid-cols-4 (Desktop)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group p-6 md:p-8 rounded-2xl border border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 ${item.color}`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-4 text-primary font-semibold text-sm inline-flex items-center group-hover:translate-x-2 transition-transform">
                Explore Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
