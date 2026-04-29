import Image from "next/image";

export default function NewsCard({ article, isHorizontal = false }) {
  return (
    <div
      className={`group bg-base-100 border border-base-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${isHorizontal ? "flex flex-col lg:flex-row" : "rounded-2xl"}`}
    >
      <div
        className={`relative ${isHorizontal ? "lg:w-1/2 aspect-video" : "aspect-video"}`}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 badge badge-primary font-bold">
          {article.category}
        </div>
      </div>

      <div
        className={`p-6 ${isHorizontal ? "lg:w-1/2 flex flex-col justify-center" : ""}`}
      >
        <p className="text-sm font-bold text-primary mb-2">
          {article.date} • {article.source}
        </p>
        <h3
          className={`${isHorizontal ? "text-3xl" : "text-xl"} font-bold text-neutral mb-4 group-hover:text-primary transition-colors`}
        >
          {article.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-3">{article.excerpt}</p>
        <button className="btn btn-link p-0 h-auto min-h-0 text-neutral font-bold no-underline hover:text-primary">
          Read Full Story →
        </button>
      </div>
    </div>
  );
}
