"use client";
import dynamic from "next/dynamic";

const CheckoutClient = dynamic(
  () => import("@/features/checkout/components/CheckoutClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-nazrul-base flex items-center justify-center font-serif italic text-nazrul-ink">
        Loading Archive...
      </div>
    ),
  },
);

export default function CheckoutPage() {
  return <CheckoutClient />;
}
