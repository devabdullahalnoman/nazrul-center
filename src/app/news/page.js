import { newsArticles } from "@/components/news/newsData";
import NewsCard from "@/components/news/NewsCard";

export default function MediaNewsPage() {
  const featuredArticle = newsArticles.find((a) => a.isFeatured);
  const regularArticles = newsArticles.filter((a) => !a.isFeatured);

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Media & News</h1>
          <p className="text-xl text-primary font-medium">
            Latest updates from the world of Nazrul.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* FEATURED SECTION */}
        {featuredArticle && (
          <div className="mb-16">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-6">
              Featured News
            </h2>
            <NewsCard article={featuredArticle} isHorizontal={true} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* LATEST NEWS GRID */}
          <div className="lg:col-span-2">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-6">
              Latest Updates
            </h2>
          </div>
          {regularArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* NEWSLETTER CTA */}
        <div className="mt-20 p-12 bg-primary rounded-3xl text-primary-content flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black mb-2">Stay Updated</h2>
            <p className="opacity-90">
              Get the latest news and event announcements directly in your
              inbox.
            </p>
          </div>
          <div className="flex w-full lg:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full lg:w-80 text-neutral"
            />
            <button className="btn btn-neutral">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
