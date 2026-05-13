"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { useCartStore } from "../../cart/hooks/useCartStore";

export default function ProductDetailsView({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const addItem = useCartStore((state) => state.addItem);

  // Logic: Determine if the item is out of stock based on inventory
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-nazrul-base pb-20">
      {/* Header Bar */}
      <div className="bg-nazrul-ink py-6 mb-12">
        <div className="container mx-auto max-w-6xl px-4">
          <Link
            href="/shop"
            className="inline-flex items-center text-nazrul-sand hover:text-nazrul-crimson transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Collection
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Main Grid: Image Left, Essential Info Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Image Section */}
          <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border border-nazrul-sand/20 group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
              priority
            />
            {product.isSale && (
              <div className="absolute top-6 left-6 bg-nazrul-crimson text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg">
                On Sale
              </div>
            )}
          </div>

          {/* Core Info Section */}
          <div className="flex flex-col justify-center">
            <span className="text-nazrul-terracotta font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-nazrul-ink mb-6">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-4">
              <span className="text-4xl font-black text-nazrul-ink">
                ৳{product.price}
              </span>
              {product.isSale && product.previousPrice && (
                <span className="text-2xl text-gray-400 line-through decoration-nazrul-crimson decoration-2 opacity-60">
                  ৳{product.previousPrice}
                </span>
              )}
            </div>

            {/* Added: Stock Availability Field */}
            <div
              className={`mb-8 inline-block px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                isOutOfStock
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-nazrul-sand/20 bg-white text-nazrul-terracotta"
              }`}
            >
              {isOutOfStock
                ? "Status: Sold Out"
                : `Units Available: ${product.stock}`}
            </div>

            <p className="text-lg text-gray-600 font-serif italic mb-10 leading-relaxed max-w-md">
              {product.shortDescription}
            </p>

            {/* Selection & CTA Controls */}
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-nazrul-sand">
                  Quantity
                </span>
                <div
                  className={`flex items-center border border-nazrul-sand/30 rounded-xl overflow-hidden bg-white shadow-sm ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={isOutOfStock}
                  >
                    <Minus className="w-4 h-4 text-nazrul-ink" />
                  </button>
                  <span className="px-6 font-bold text-nazrul-ink">
                    {quantity}
                  </span>
                  <button
                    // Prevent quantity from exceeding available stock
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={isOutOfStock || quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4 text-nazrul-ink" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                {/* Updated: Button disabled and styled for out-of-stock state */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-4 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 w-full ${
                    isOutOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-nazrul-terracotta text-white hover:bg-nazrul-crimson"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isOutOfStock ? "Sold Out" : "Add to Cart"}
                </button>
                <button className="flex-1 border-2 border-nazrul-sand rounded-xl flex items-center justify-center hover:border-nazrul-crimson hover:text-nazrul-crimson group transition-all">
                  <Heart className="w-5 h-5 group-hover:fill-nazrul-crimson transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Reviews, etc. */}
        <div className="border-t border-nazrul-sand/20 pt-16">
          <div className="flex gap-12 mb-12 border-b border-nazrul-sand/10">
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-black uppercase tracking-[0.2em] pb-5 transition-all border-b-2 ${
                  activeTab === tab
                    ? "text-nazrul-crimson border-nazrul-crimson"
                    : "text-gray-400 border-transparent hover:text-nazrul-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            {activeTab === "description" ? (
              <div className="space-y-6">
                <p className="text-gray-700 font-serif italic text-xl leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            ) : activeTab === "reviews" ? (
              <p className="text-nazrul-sand italic font-serif">
                Be the first to review this historic collectible.
              </p>
            ) : (
              <p className="text-gray-600 text-sm font-sans">
                Standard delivery in 3-5 business days. International shipping
                available.
              </p>
            )}
          </div>
        </div>

        {/* Related Artifacts Placeholder */}
        <div className="mt-40 border-t border-nazrul-sand/10 pt-20">
          <h2 className="text-3xl font-serif font-bold text-nazrul-ink mb-12 tracking-tight">
            You Might Also Find Interesting
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="h-64 bg-white/50 border border-dashed border-nazrul-sand/30 rounded-3xl flex items-center justify-center italic text-gray-300 text-sm">
              Fetching related items...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
