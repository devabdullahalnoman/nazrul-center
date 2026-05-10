"use client";
import { useShop } from "@/hooks/useShop";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
  const {
    products,
    loading,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    categories,
  } = useShop();

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-20">
      {/* Premium Boutique Header */}
      <div className="pt-32 pb-20 px-8 text-center border-b border-gray-100 bg-white">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          The Archive Shop
        </h1>
        <p className="text-[#946659] font-serif italic text-xl max-w-2xl mx-auto">
          &ldquo;Carry the legacy of the Rebel Poet through our curated
          collection of literature, music, and memorabilia.&rdquo;
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Controls Section: Categories & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setCurrentPage(1);
                }}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-gray-900 text-white shadow-xl scale-105"
                    : "bg-white border border-gray-100 text-gray-400 hover:border-[#946659] hover:text-[#946659]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search the archive..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-8 py-4 bg-white border border-gray-100 rounded-[24px] outline-none focus:border-[#946659] shadow-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-[#946659]/10 border-t-[#946659] rounded-full animate-spin"></div>
            <p className="font-serif italic text-[#946659]">
              Curating the collection...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="py-40 text-center">
            <p className="font-serif italic text-gray-400 text-xl">
              No items found in this section of the archive.
            </p>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => p - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white border border-gray-100 rounded-[20px] text-[10px] font-black uppercase tracking-widest disabled:opacity-20 hover:border-[#946659] transition-all shadow-sm"
            >
              Prev
            </button>
            <div className="px-6 py-4 bg-white border border-gray-100 rounded-[20px] font-serif font-bold text-[#946659] shadow-inner">
              {currentPage} / {totalPages}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white border border-gray-100 rounded-[20px] text-[10px] font-black uppercase tracking-widest disabled:opacity-20 hover:border-[#946659] transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
