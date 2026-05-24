import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        // Strict cart validation: Determine total desired amount vs available database stock
        const totalDesiredQuantity = existingItem
          ? existingItem.quantity + quantity
          : quantity;
        const maxStockAvailable = Number(
          product.stock_quantity || product.stock || 0,
        );

        if (totalDesiredQuantity > maxStockAvailable) {
          alert(
            `Cannot add more. Only ${maxStockAvailable} units available in stock.`,
          );
          return;
        }

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          // Map database field names to standard cart fields securely
          const cartItem = {
            id: product.id,
            name: product.item_name || product.title || product.name,
            price: Number(product.price || 0),
            image:
              product.image_url ||
              product.image ||
              product.cover_url ||
              "/placeholder.jpg",
            quantity: quantity,
            stock: maxStockAvailable,
          };
          set({ items: [...currentItems, cartItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;

        const currentItems = get().items;
        const targetItem = currentItems.find((item) => item.id === id);
        if (!targetItem) return;

        // Ensure update value doesn't exceed the product's max available stock limit
        if (quantity > targetItem.stock) {
          alert(
            `Cannot exceed maximum available stock count of ${targetItem.stock}.`,
          );
          return;
        }

        set({
          items: currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getItemCount: () => {
        return get().items.reduce(
          (total, totalItem) => total + totalItem.quantity,
          0,
        );
      },
    }),
    {
      name: "nazrul-cart-storage",
    },
  ),
);
