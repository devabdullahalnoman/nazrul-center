"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/features/cart/hooks/useCartStore";
import { CheckCircle, Loader2 } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const transactionTrackingToken = searchParams.get("tran");
  const clearCart = useCartStore((state) => state.clearCart);

  // Functional state initialization prevents triggering sequential re-renders on mount
  const [status, setStatus] = useState(() => {
    return method === "cod" ? "completed" : "verifying";
  });

  useEffect(() => {
    if (status === "completed") {
      // clearCart is kept inside the timer block to prevent global route-guards
      // from intercepting an empty cart and kicking the client out early.
      const timer = setTimeout(() => {
        clearCart();
        router.push("/dashboard");
      }, 3500);
      return () => clearTimeout(timer);
    }

    const finalizeOnlineOrder = () => {
      try {
        if (!transactionTrackingToken) {
          setStatus("error");
          return;
        }
        sessionStorage.removeItem("pending_order");
        setStatus("completed");
      } catch (e) {
        console.error("Error clearing transaction cache maps:", e);
        setStatus("error");
      }
    };

    if (method !== "cod" && status === "verifying") {
      finalizeOnlineOrder();
    }
  }, [status, router, method, transactionTrackingToken, clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-nazrul-base">
      {status === "verifying" ? (
        <Loader2 className="animate-spin text-nazrul-ink w-12 h-12" />
      ) : status === "error" ? (
        <div className="text-red-600 font-serif font-bold text-xl">
          Verification Interrupted
        </div>
      ) : (
        <CheckCircle className="text-green-600 w-16 h-16" />
      )}
      <h1 className="text-2xl font-serif font-bold mt-4 uppercase text-nazrul-ink tracking-tight">
        {status === "completed"
          ? "Order Successful"
          : status === "error"
            ? "An error occurred"
            : "Verifying Payment..."}
      </h1>
      <p className="text-sm text-nazrul-sand font-serif italic mt-2">
        {status === "completed"
          ? "Redirecting safely back to your user dashboard panel..."
          : "Synchronizing transaction token metrics directly across bank clearance registers..."}
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-nazrul-base font-serif italic text-nazrul-ink">
          Loading Verification Streams...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
