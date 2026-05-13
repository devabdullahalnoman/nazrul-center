"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkoutApi } from "@/features/checkout/api/checkout.api";
import { ordersApi } from "@/features/dashboard/shared/api/order.api";
import { CheckCircle, Loader2 } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const [status, setStatus] = useState(
    method === "cod" ? "completed" : "verifying",
  );

  useEffect(() => {
    if (status === "completed") {
      const timer = setTimeout(() => router.push("/dashboard"), 3000);
      return () => clearTimeout(timer);
    }

    const finalizeOnlineOrder = async () => {
      const raw = sessionStorage.getItem("pending_order");
      if (!raw) {
        setStatus("error");
        return;
      }

      try {
        const data = JSON.parse(raw);
        await checkoutApi.saveOrder(data);

        // DECREASE STOCK ONLY ON SUCCESSFUL ONLINE PAYMENT
        await ordersApi.syncStock(data.items, "reduce");

        sessionStorage.removeItem("pending_order");
        setStatus("completed");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    };

    if (method !== "cod" && status === "verifying") finalizeOnlineOrder();
  }, [status, router, method]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-nazrul-base">
      {status === "verifying" ? (
        <Loader2 className="animate-spin" />
      ) : (
        <CheckCircle className="text-green-600 w-16 h-16" />
      )}
      <h1 className="text-2xl font-serif font-bold mt-4 uppercase">
        {status === "completed" ? "Order Successful" : "Verifying..."}
      </h1>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
