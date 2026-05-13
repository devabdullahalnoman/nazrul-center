"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/hooks/useCartStore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { checkoutApi } from "@/features/checkout/api/checkout.api";
import { ordersApi } from "@/features/dashboard/shared/api/order.api";

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
  const [formData, setFormData] = useState({ address: "", phone: "" });

  useEffect(() => {
    if (items.length === 0) router.replace("/shop");
  }, [items, router]);

  if (items.length === 0) return null;

  const total = getTotalPrice() + 100;

  const handleFinalize = async () => {
    // 1. Stock Check
    for (const item of items) {
      if (item.stock_quantity <= 0) {
        alert(`Inventory Alert: ${item.name} is out of stock.`);
        return;
      }
    }

    setLoading(true);
    const orderPayload = {
      user_id: user?.id,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total_amount: total,
      address: `${formData.address} | Phone: ${formData.phone}`,
      payment_method: paymentMethod,
    };

    try {
      if (paymentMethod === "sslcommerz") {
        const gatewayUrl = await checkoutApi.initiateSSLCommerz(
          orderPayload,
          user,
        );
        sessionStorage.setItem("pending_order", JSON.stringify(orderPayload));
        clearCart();
        window.location.href = gatewayUrl;
      } else {
        // COD FLOW
        await checkoutApi.saveOrder(orderPayload);

        // DECREASE STOCK IMMEDIATELY FOR COD
        await ordersApi.syncStock(orderPayload.items, "reduce");

        router.push("/checkout/success?method=cod");
        setTimeout(() => clearCart(), 500);
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nazrul-base py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <h1 className="text-5xl font-serif font-bold text-nazrul-ink mb-12 uppercase tracking-tighter">
            Checkout
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
            />
          )}
        </div>
        <div className="lg:col-span-5">
          <CheckoutSummary
            items={items}
            subtotal={getTotalPrice()}
            shipping={100}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
