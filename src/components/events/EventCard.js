import Image from "next/image";

export default function EventCard({ event }) {
  return (
    <div className="group bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video">
        <Image
          src={event.image}
          alt={event.title}
          fill
          width={0}
          height={0}
          sizes="1vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className={`absolute top-4 right-4 badge font-bold border-none ${
            event.status === "Upcoming"
              ? "bg-primary text-primary-content"
              : "bg-neutral text-neutral-content"
          }`}
        >
          {event.status}
        </div>
      </div>
      <div className="p-6">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          {event.category}
        </span>
        <h3 className="text-xl font-bold text-neutral mt-2 mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="space-y-2 text-sm text-gray-600 mb-6 border-t border-base-200 pt-4">
          <p className="flex items-center gap-2">
            <span className="font-bold">Date:</span> {event.date} • {event.time}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold">Venue:</span> {event.location}
          </p>
        </div>
        <button className="btn btn-outline btn-block btn-sm group-hover:btn-primary">
          {event.status === "Upcoming" ? "Register Now" : "View Gallery"}
        </button>
      </div>
    </div>
  );
}
