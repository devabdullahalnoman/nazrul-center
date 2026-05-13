"use client";

import { useCartStore } from "../hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-nazrul-ink/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-nazrul-base shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
          {/* Header */}
          <div className="p-6 bg-nazrul-ink text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-nazrul-terracotta" />
              <h2 className="text-xl font-serif font-bold tracking-tight">
                Your Selection
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-nazrul-sand" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 bg-nazrul-sand/10 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-nazrul-sand/40" />
                </div>
                <p className="font-serif italic text-gray-500 text-lg">
                  Your archive is currently empty.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 text-[10px] font-black uppercase tracking-widest text-nazrul-terracotta hover:text-nazrul-crimson transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300"
                >
                  <div className="relative w-20 h-24 bg-white rounded-xl overflow-hidden border border-nazrul-sand/10 shrink-0 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-nazrul-ink leading-tight text-sm">
                          {item.name}
                        </h4>
                        <p className="text-[10px] uppercase font-black text-nazrul-terracotta mt-1">
                          ৳{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-nazrul-crimson transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-nazrul-sand/20 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-nazrul-ink" />
                        </button>
                        <span className="px-3 text-xs font-bold text-nazrul-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-nazrul-ink" />
                        </button>
                      </div>
                      <span className="text-xs font-black text-nazrul-ink">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout Button */}
          {items.length > 0 && (
            <div className="p-8 bg-white border-t border-nazrul-sand/20 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif italic text-gray-500">
                  Estimated Total
                </span>
                <span className="text-2xl font-black text-nazrul-ink">
                  ৳{getTotalPrice()}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full bg-nazrul-terracotta text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-nazrul-crimson transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-[9px] text-gray-400 mt-4 uppercase tracking-widest font-bold">
                Secure Archive Checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
