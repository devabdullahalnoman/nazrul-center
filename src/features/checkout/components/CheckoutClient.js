"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/hooks/useCartStore";
import { useAuth } from "@/features/auth/hooks/useAuth";

import CheckoutShipping from "./CheckoutShipping";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutClient() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");

  // Extend state structure definitions to trace chosen region tracking references
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    shippingRegion: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/shop");
    }
  }, [items, router]);

  if (items.length === 0) return null;

  // Calculate local client total matches dynamically based on checkbox parameters
  let shippingCost = 0;
  if (formData.shippingRegion === "inside_dhaka") shippingCost = 70;
  if (formData.shippingRegion === "outside_dhaka") shippingCost = 130;

  const grandTotal = getTotalPrice() + shippingCost;

  const handleFinalize = async () => {
    try {
      setLoading(true);

      const formattedPayload = {
        items: items.map((item) => ({
          id: item.id,
          quantity: Number(item.quantity),
        })),
        shippingDetails: {
          address: formData.address,
          phone: formData.phone,
          shippingRegion: formData.shippingRegion,
        },
        paymentMethod: paymentMethod,
      };

      const response = await fetch("/api/checkout/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          console.error("ZOD VALIDATION FAILED ON THESE FIELDS:", data.details);
          alert(
            `Validation Error: ${data.details[0].path.join(".")} - ${data.details[0].message}`,
          );
        }
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        clearCart();
        router.push("/checkout/success");
      }
    } catch (error) {
      console.error("Checkout Exception:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nazrul-base py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <h1 className="text-5xl font-serif font-bold text-nazrul-ink mb-12 uppercase tracking-tighter">
            Checkout Ledger
          </h1>
          {step === 1 ? (
            <CheckoutShipping
              formData={formData}
              setFormData={setFormData}
              onNext={() => setStep(2)}
            />
          ) : (
            <CheckoutPayment
              method={paymentMethod}
              setMethod={setPaymentMethod}
              onBack={() => setStep(1)}
              onComplete={handleFinalize}
              loading={loading}
              isValid={
                formData.shippingRegion === "inside_dhaka" ||
                formData.shippingRegion === "outside_dhaka"
              }
            />
          )}
        </div>
        <div className="lg:col-span-5">
          <CheckoutSummary
            items={items}
            subtotal={getTotalPrice()}
            shipping={shippingCost}
            total={grandTotal}
          />
        </div>
      </div>
    </div>
  );
}
