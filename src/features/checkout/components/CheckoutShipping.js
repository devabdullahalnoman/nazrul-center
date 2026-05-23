// "use client";

// export default function CheckoutShipping({ formData, setFormData, onNext }) {
//   const isValid = formData.address.length > 5 && formData.phone.length >= 11;

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <div className="space-y-6">
//         <div className="space-y-2">
//           <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">Shipping Address</label>
//           <textarea
//             className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm min-h-30"
//             placeholder="House, Road, Area, City..."
//             value={formData.address}
//             onChange={(e) => setFormData({...formData, address: e.target.value})}
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">Phone</label>
//           <input
//             className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm"
//             placeholder="01XXXXXXXXX"
//             value={formData.phone}
//             onChange={(e) => setFormData({...formData, phone: e.target.value})}
//           />
//         </div>
//       </div>
//       <button
//         onClick={onNext}
//         disabled={!isValid}
//         className="w-full bg-nazrul-ink text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-nazrul-terracotta transition-all disabled:opacity-30"
//       >
//         Select Payment Method
//       </button>
//     </div>
//   );
// }

// "use client";

// export default function CheckoutShipping({ formData, setFormData, onNext }) {
//   const isValid = formData.address.length > 5 && formData.phone.length >= 11;

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <div className="space-y-6">
//         <div className="space-y-2">
//           <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">
//             Shipping Address
//           </label>
//           <textarea
//             className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm min-h-30"
//             placeholder="House, Road, Area, City..."
//             value={formData.address}
//             maxLength={255} // Client-side limitation validation
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">
//             Phone
//           </label>
//           <input
//             className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm"
//             placeholder="01XXXXXXXXX"
//             value={formData.phone}
//             maxLength={20} // Client-side limitation validation
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//           />
//         </div>
//       </div>
//       <button
//         onClick={onNext}
//         disabled={!isValid}
//         className="w-full bg-nazrul-ink text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-nazrul-crimson disabled:opacity-50 disabled:hover:bg-nazrul-ink transition-all active:scale-[0.98] shadow-xl"
//       >
//         Continue to Payment
//       </button>
//     </div>
//   );
// }

"use client";

export default function CheckoutShipping({ formData, setFormData, onNext }) {
  // Validate text constraints AND require a selected region checkbox to enable proceeding
  const isValid =
    formData.address.trim().length > 5 &&
    formData.phone.trim().length >= 11 &&
    (formData.shippingRegion === "inside_dhaka" ||
      formData.shippingRegion === "outside_dhaka");

  const handleRegionSelect = (region) => {
    setFormData({ ...formData, shippingRegion: region });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">
            Shipping Address
          </label>
          <textarea
            className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm min-h-30"
            placeholder="House, Road, Area, City..."
            value={formData.address}
            maxLength={255}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">
            Phone
          </label>
          <input
            className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm"
            placeholder="01XXXXXXXXX"
            value={formData.phone}
            maxLength={20}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        {/* REGION SELECTION INPUTS CONTAINER */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1 block">
            Shipping Region
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => handleRegionSelect("inside_dhaka")}
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all bg-white select-none ${
                formData.shippingRegion === "inside_dhaka"
                  ? "border-nazrul-terracotta bg-nazrul-terracotta/5"
                  : "border-nazrul-sand/20 hover:border-nazrul-sand/50"
              }`}
            >
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.shippingRegion === "inside_dhaka"}
                  readOnly
                  className="w-4 h-4 accent-nazrul-terracotta rounded cursor-pointer"
                />
              </div>
              <div>
                <p className="font-bold text-nazrul-ink text-xs">
                  Inside Dhaka
                </p>
                <p className="text-[10px] text-nazrul-sand">
                  Delivery Charge: ৳70
                </p>
              </div>
            </div>

            <div
              onClick={() => handleRegionSelect("outside_dhaka")}
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all bg-white select-none ${
                formData.shippingRegion === "outside_dhaka"
                  ? "border-nazrul-terracotta bg-nazrul-terracotta/5"
                  : "border-nazrul-sand/20 hover:border-nazrul-sand/50"
              }`}
            >
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.shippingRegion === "outside_dhaka"}
                  readOnly
                  className="w-4 h-4 accent-nazrul-terracotta rounded cursor-pointer"
                />
              </div>
              <div>
                <p className="font-bold text-nazrul-ink text-xs">
                  Outside Dhaka
                </p>
                <p className="text-[10px] text-nazrul-sand">
                  Delivery Charge: ৳130
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full bg-nazrul-ink text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-nazrul-crimson disabled:opacity-50 disabled:hover:bg-nazrul-ink transition-all active:scale-[0.98] shadow-xl"
      >
        Continue to Payment
      </button>
    </div>
  );
}
