import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block h-full">
      <div className="bg-white border border-nazrul-sand/20 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <div className="relative aspect-4/5 overflow-hidden bg-nazrul-base">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {product.tag && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-nazrul-base text-xs font-bold shadow-md bg-nazrul-crimson">
              {product.tag}
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col grow">
          <p className="text-[10px] uppercase tracking-widest text-nazrul-terracotta font-black mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-serif font-bold text-nazrul-ink mb-2 group-hover:text-nazrul-crimson transition-colors leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-auto pt-4">
            <span className="text-xl font-black text-nazrul-ink">
              ৳{product.price}
            </span>
            <div className="px-5 py-2.5 rounded-lg text-nazrul-base text-xs font-black bg-nazrul-terracotta hover:text-nazrul-crimson transition-all transform active:scale-95 shadow-md uppercase tracking-widest">
              Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
