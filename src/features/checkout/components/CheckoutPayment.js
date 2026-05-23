// "use client";

// export default function CheckoutPayment({
//   method,
//   setMethod,
//   onBack,
//   onComplete,
//   loading,
// }) {
//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <div className="space-y-4">
//         <div
//           onClick={() => setMethod("sslcommerz")}
//           className={`flex items-center gap-4 p-6 border rounded-2xl cursor-pointer transition-all ${method === "sslcommerz" ? "border-nazrul-terracotta bg-nazrul-terracotta/5" : "border-nazrul-sand/20"}`}
//         >
//           <div
//             className={`w-4 h-4 rounded-full border-2 ${method === "sslcommerz" ? "border-nazrul-terracotta bg-nazrul-terracotta" : "border-gray-300"}`}
//           />
//           <div>
//             <p className="font-bold text-nazrul-ink text-sm">
//               Online Payment (SSLCommerz)
//             </p>
//             <p className="text-[10px] italic text-gray-500">
//               Cards, bKash, Nagad
//             </p>
//           </div>
//         </div>

//         <div
//           onClick={() => setMethod("cash_on_delivery")}
//           className={`flex items-center gap-4 p-6 border rounded-2xl cursor-pointer transition-all ${method === "cash_on_delivery" ? "border-nazrul-terracotta bg-nazrul-terracotta/5" : "border-nazrul-sand/20"}`}
//         >
//           <div
//             className={`w-4 h-4 rounded-full border-2 ${method === "cash_on_delivery" ? "border-nazrul-terracotta bg-nazrul-terracotta" : "border-gray-300"}`}
//           />
//           <div>
//             <p className="font-bold text-nazrul-ink text-sm">
//               Cash on Delivery
//             </p>
//             <p className="text-[10px] italic text-gray-500">Pay on arrival</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={onBack}
//           className="flex-1 py-5 border-2 border-nazrul-sand text-nazrul-ink rounded-2xl font-black uppercase text-[10px]"
//         >
//           Back
//         </button>
//         <button
//           onClick={onComplete}
//           disabled={loading}
//           className="flex-2 py-5 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase text-[10px] shadow-xl disabled:opacity-50"
//         >
//           {loading
//             ? "Processing..."
//             : method === "sslcommerz"
//               ? "Pay Now"
//               : "Confirm Order"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

export default function CheckoutPayment({
  method,
  setMethod,
  onBack,
  onComplete,
  loading,
  isValid, // Received from the orchestrator to check if the region is checked
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div
          onClick={() => setMethod("sslcommerz")}
          className={`flex items-center gap-4 p-6 border rounded-2xl cursor-pointer transition-all ${
            method === "sslcommerz"
              ? "border-nazrul-terracotta bg-nazrul-terracotta/5"
              : "border-nazrul-sand/20"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              method === "sslcommerz"
                ? "border-nazrul-terracotta bg-nazrul-terracotta"
                : "border-gray-300"
            }`}
          />
          <div>
            <p className="font-bold text-nazrul-ink text-sm">
              Online Payment (SSLCommerz)
            </p>
            <p className="text-[10px] italic text-gray-500">
              Cards, bKash, Nagad
            </p>
          </div>
        </div>

        <div
          onClick={() => setMethod("cash_on_delivery")}
          className={`flex items-center gap-4 p-6 border rounded-2xl cursor-pointer transition-all ${
            method === "cash_on_delivery"
              ? "border-nazrul-terracotta bg-nazrul-terracotta/5"
              : "border-nazrul-sand/20"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              method === "cash_on_delivery"
                ? "border-nazrul-terracotta bg-nazrul-terracotta"
                : "border-gray-300"
            }`}
          />
          <div>
            <p className="font-bold text-nazrul-ink text-sm">
              Cash on Delivery
            </p>
            <p className="text-[10px] italic text-gray-500">Pay on arrival</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-5 border-2 border-nazrul-sand text-nazrul-ink rounded-2xl font-black uppercase text-[10px]"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          disabled={loading || !isValid} // Disables button if region isn't checked
          className="flex-2 py-5 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase text-[10px] shadow-xl disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : method === "sslcommerz"
              ? "Pay Now"
              : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
