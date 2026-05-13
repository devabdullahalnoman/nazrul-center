"use client";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function CheckoutSummary({ items, subtotal, shipping, total }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-nazrul-sand/20 sticky top-32 shadow-sm">
      <h3 className="text-xl font-serif font-bold text-nazrul-ink mb-8">Summary</h3>
      <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-nazrul-ink leading-tight">{item.name}</p>
              <p className="text-xs text-nazrul-sand mt-1">Qty: {item.quantity}</p>
              <p className="text-xs font-black text-nazrul-terracotta mt-1">৳{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t border-nazrul-sand/10 pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-serif italic">Subtotal</span>
          <span className="font-bold text-nazrul-ink">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-serif italic">Shipping</span>
          <span className="font-bold text-nazrul-ink">৳{shipping}</span>
        </div>
        <div className="flex justify-between pt-4 border-t border-nazrul-sand/10">
          <span className="text-lg font-serif font-bold text-nazrul-ink">Total</span>
          <span className="text-2xl font-black text-nazrul-terracotta">৳{total}</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-nazrul-base rounded-2xl flex items-center gap-3">
        <Lock className="w-4 h-4 text-nazrul-sand" />
        <p className="text-[9px] font-black uppercase tracking-widest text-nazrul-sand">Secured Transaction</p>
      </div>
    </div>
  );
}