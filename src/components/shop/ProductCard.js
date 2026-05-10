"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  const imageSrc =
    product?.image_url || "https://placehold.co/400x500?text=Nazrul+Center";
  const productName = product?.item_name || "Untitled Work";

  return (
    <div
      onClick={() => router.push(`/shop/${product.id}`)}
      className="group cursor-pointer bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Image
          src={imageSrc}
          alt={productName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {product?.is_featured && (
          <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#946659] shadow-sm">
            Featured
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        <p className="text-[10px] font-black uppercase text-[#946659] tracking-[0.2em] mb-2">
          {product?.item_type}
        </p>
        <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#946659] transition-colors duration-300">
          {productName}
        </h3>

        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
          <span className="text-2xl font-serif font-bold text-gray-900">
            ৳{product?.price}
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-[#946659] transition-all duration-300 shadow-lg">
            <span className="text-lg">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
