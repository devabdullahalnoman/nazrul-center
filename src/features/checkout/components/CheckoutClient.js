// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCartStore } from "@/features/cart/hooks/useCartStore";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { checkoutApi } from "@/features/checkout/api/checkout.api";
// import { ordersApi } from "@/features/dashboard/shared/api/order.api";

// import CheckoutShipping from "./CheckoutShipping";
// import CheckoutPayment from "./CheckoutPayment";
// import CheckoutSummary from "./CheckoutSummary";

// export default function CheckoutClient() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const { items, getTotalPrice, clearCart } = useCartStore();

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
//   const [formData, setFormData] = useState({ address: "", phone: "" });

//   useEffect(() => {
//     if (items.length === 0) router.replace("/shop");
//   }, [items, router]);

//   if (items.length === 0) return null;

//   const total = getTotalPrice() + 100;

//   const handleFinalize = async () => {
//     // 1. Stock Check
//     for (const item of items) {
//       if (item.stock_quantity <= 0) {
//         alert(`Inventory Alert: ${item.name} is out of stock.`);
//         return;
//       }
//     }

//     setLoading(true);
//     const orderPayload = {
//       user_id: user?.id,
//       items: items.map((i) => ({
//         id: i.id,
//         name: i.name,
//         price: i.price,
//         quantity: i.quantity,
//       })),
//       total_amount: total,
//       address: `${formData.address} | Phone: ${formData.phone}`,
//       payment_method: paymentMethod,
//     };

//     try {
//       if (paymentMethod === "sslcommerz") {
//         const gatewayUrl = await checkoutApi.initiateSSLCommerz(
//           orderPayload,
//           user,
//         );
//         sessionStorage.setItem("pending_order", JSON.stringify(orderPayload));
//         clearCart();
//         window.location.href = gatewayUrl;
//       } else {
//         // COD FLOW
//         await checkoutApi.saveOrder(orderPayload);

//         // DECREASE STOCK IMMEDIATELY FOR COD
//         await ordersApi.syncStock(orderPayload.items, "reduce");

//         router.push("/checkout/success?method=cod");
//         setTimeout(() => clearCart(), 500);
//       }
//     } catch (err) {
//       console.error("Checkout Error:", err);
//       alert("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-nazrul-base py-20 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
//         <div className="lg:col-span-7">
//           <h1 className="text-5xl font-serif font-bold text-nazrul-ink mb-12 uppercase tracking-tighter">
//             Checkout
//           </h1>
//           {step === 1 ? (
//             <CheckoutShipping
//               formData={formData}
//               setFormData={setFormData}
//               onNext={() => setStep(2)}
//             />
//           ) : (
//             <CheckoutPayment
//               method={paymentMethod}
//               setMethod={setPaymentMethod}
//               onBack={() => setStep(1)}
//               onComplete={handleFinalize}
//               loading={loading}
//             />
//           )}
//         </div>
//         <div className="lg:col-span-5">
//           <CheckoutSummary
//             items={items}
//             subtotal={getTotalPrice()}
//             shipping={100}
//             total={total}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCartStore } from "@/features/cart/hooks/useCartStore";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { checkoutApi } from "@/features/checkout/api/checkout.api";
// import { ordersApi } from "@/features/dashboard/shared/api/order.api";

// import CheckoutShipping from "./CheckoutShipping";
// import CheckoutPayment from "./CheckoutPayment";
// import CheckoutSummary from "./CheckoutSummary";

// export default function CheckoutClient() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const { items, getTotalPrice, clearCart } = useCartStore();

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
//   const [formData, setFormData] = useState({ address: "", phone: "" });

//   useEffect(() => {
//     if (items.length === 0) router.replace("/shop");
//   }, [items, router]);

//   if (items.length === 0) return null;

//   const total = getTotalPrice() + 100;

//   const handleFinalize = async () => {
//     for (const item of items) {
//       if (item.stock_quantity !== undefined && item.stock_quantity <= 0) {
//         alert(`Inventory Alert: ${item.name} is currently out of stock.`);
//         return;
//       }
//     }

//     setLoading(true);

//     // UNIFIED TRACKING FIX: Create the single key token used by the entire framework flow
//     const unifiedId = `TRAN-${Date.now()}`;

//     const orderPayload = {
//       id: unifiedId, // Unifies lookups across all API files
//       user_id: user?.id,
//       items: items.map((cartItem) => ({
//         id: cartItem.id,
//         name: cartItem.name,
//         price: Number(cartItem.price || 0),
//         quantity: Number(cartItem.quantity || 1),
//       })),
//       total_amount: total,
//       address: `${formData.address} | Phone: ${formData.phone}`,
//       phone: formData.phone,
//       payment_method: paymentMethod,
//     };

//     try {
//       if (paymentMethod === "sslcommerz") {
//         sessionStorage.setItem("pending_order", JSON.stringify(orderPayload));

//         const gatewayUrl = await checkoutApi.initiateSSLCommerz(
//           orderPayload,
//           user,
//         );
//         if (gatewayUrl) {
//           window.location.replace(gatewayUrl);
//         } else {
//           throw new Error(
//             "Unable to obtain secure payment gateway redirection link.",
//           );
//         }
//       } else {
//         await checkoutApi.saveOrder(orderPayload);
//         await ordersApi.syncStock(orderPayload.items, "reduce");

//         router.push("/checkout/success?method=cod");
//         setTimeout(() => clearCart(), 500);
//       }
//     } catch (err) {
//       console.error("Checkout System Loop Exception:", err);
//       alert("Checkout Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-nazrul-base py-20 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
//         <div className="lg:col-span-7">
//           <h1 className="text-5xl font-serif font-bold text-nazrul-ink mb-12 uppercase tracking-tighter">
//             Checkout
//           </h1>
//           {step === 1 ? (
//             <CheckoutShipping
//               formData={formData}
//               setFormData={setFormData}
//               onNext={() => setStep(2)}
//             />
//           ) : (
//             <CheckoutPayment
//               method={paymentMethod}
//               setMethod={setPaymentMethod}
//               onBack={() => setStep(1)}
//               onComplete={handleFinalize}
//               loading={loading}
//             />
//           )}
//         </div>
//         <div className="lg:col-span-5">
//           <CheckoutSummary
//             items={items}
//             subtotal={getTotalPrice()}
//             shipping={100}
//             total={total}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useCartStore } from "@/features/cart/hooks/useCartStore";
// import { useAuth } from "@/features/auth/hooks/useAuth";

// import CheckoutShipping from "./CheckoutShipping";
// import CheckoutPayment from "./CheckoutPayment";
// import CheckoutSummary from "./CheckoutSummary";

// export default function CheckoutClient() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const { items, getTotalPrice, clearCart } = useCartStore();

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
//   const [formData, setFormData] = useState({ address: "", phone: "" });

//   useEffect(() => {
//     if (items.length === 0) {
//       router.replace("/shop");
//     }
//   }, [items, router]);

//   if (items.length === 0) return null;

//   const shippingCost = 100;
//   const grandTotal = getTotalPrice() + shippingCost;

//   /**
//    * Transmits state payloads securely down to server boundaries.
//    */
//   const handleFinalize = async () => {
//     try {
//       setLoading(true);

//       // 1. Map your ACTUAL component state variables to the backend Zod schema
//       const formattedPayload = {
//         items: items.map((item) => ({
//           id: item.id,
//           quantity: Number(item.quantity),
//         })),
//         shippingDetails: {
//           address: formData.address,
//           phone: formData.phone,
//         },
//         paymentMethod: paymentMethod,
//       };

//       // 2. Send the request
//       const response = await fetch("/api/checkout/finalize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formattedPayload),
//       });

//       const data = await response.json();

//       // 3. Log exact validation errors if the backend rejects the payload
//       if (!response.ok) {
//         if (data.details) {
//           console.error("ZOD VALIDATION FAILED ON THESE FIELDS:", data.details);
//           alert(
//             `Validation Error: ${data.details[0].path.join(".")} - ${data.details[0].message}`,
//           );
//         }
//         throw new Error(data.error || "Checkout failed");
//       }

//       // THE FIX: Change the order of execution to prevent the /shop race condition loop
//       if (data.url) {
//         // Force immediate external navigation to SSLCommerz without wiping the cart state first
//         window.location.href = data.url;
//       } else {
//         // Only run local store cleanup for non-hosted payment alternatives (e.g. COD fallback)
//         clearCart();
//         router.push("/checkout/success");
//       }
//     } catch (error) {
//       console.error("Checkout Exception:", error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-nazrul-base py-20 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
//         <div className="lg:col-span-7">
//           <h1 className="text-5xl font-serif font-bold text-nazrul-ink mb-12 uppercase tracking-tighter">
//             Checkout Ledger
//           </h1>
//           {step === 1 ? (
//             <CheckoutShipping
//               formData={formData}
//               setFormData={setFormData}
//               onNext={() => setStep(2)}
//             />
//           ) : (
//             <CheckoutPayment
//               method={paymentMethod}
//               setMethod={setPaymentMethod}
//               onBack={() => setStep(1)}
//               onComplete={handleFinalize}
//               loading={loading}
//             />
//           )}
//         </div>
//         <div className="lg:col-span-5">
//           <CheckoutSummary
//             items={items}
//             subtotal={getTotalPrice()}
//             shipping={shippingCost}
//             total={grandTotal}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

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
