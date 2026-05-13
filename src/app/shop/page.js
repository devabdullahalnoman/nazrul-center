import { shopApi } from "@/features/shop/api/shop.api";
import ShopView from "@/features/shop/components/ShopView";

export default async function ShopPage() {
  const products = await shopApi.getProducts();

  return (
    <div className="min-h-screen pb-20 bg-nazrul-base">
      {/* Shop Header Section */}
      <div className="py-16 px-4 bg-nazrul-honeycomb">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 text-nazrul-base">
            Official Shop
          </h1>
          <p className="text-xl font-semibold text-nazrul-olive">
            Carry the legacy of the Rebel Poet with you.
          </p>
        </div>
      </div>

      {/* Interactive Feature View */}
      <ShopView initialProducts={products} />
    </div>
  );
}
