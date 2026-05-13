import { shopApi } from "@/features/shop/api/shop.api";
import ProductDetailsView from "@/features/shop/components/ProductDetailsView";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await shopApi.getProductById(id);

  return <ProductDetailsView product={product} />;
}
