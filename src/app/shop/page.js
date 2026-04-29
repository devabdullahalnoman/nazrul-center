"use client";
import { useState } from "react";
import { shopProducts } from "@/components/shop/shopData";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Books", "Music", "Memorabilia", "Apparel"];

  const filteredProducts =
    activeFilter === "All"
      ? shopProducts
      : shopProducts.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Shop Header */}
      <div className="bg-neutral text-neutral-content py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Official Shop</h1>
          <p className="text-xl text-primary font-medium">
            Carry the legacy of the Rebel Poet with you.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`btn btn-sm md:btn-md rounded-full px-8 ${
                activeFilter === cat
                  ? "btn-primary"
                  : "btn-ghost border-base-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
