import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-4/5 overflow-hidden bg-base-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.tag && (
          <div className="absolute top-4 left-4 badge badge-primary font-bold">
            {product.tag}
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-neutral mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-black text-neutral">
            ৳{product.price}
          </span>
          <button className="btn btn-neutral btn-sm rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
