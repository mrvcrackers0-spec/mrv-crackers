import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/database";
import { lineSavings, lineTotal } from "../lib/utils";

export interface CartItem {
  productId: string;
  name: string;
  imageUrl: string | null;
  sellingPrice: number;
  originalPrice: number | null;
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  setQuantity: (product: Product, categoryName: string, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increment: (product: Product, categoryName: string) => void;
  decrement: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      setQuantity: (product, categoryName, quantity) => {
        const qty = Math.max(0, Math.floor(quantity) || 0);
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);

          if (qty === 0) {
            return { items: state.items.filter((i) => i.productId !== product.id) };
          }

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id ? { ...i, quantity: qty } : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                imageUrl: product.image_url,
                sellingPrice: product.selling_price,
                originalPrice: product.original_price,
                quantity: qty,
                category: categoryName,
              },
            ],
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        const qty = Math.max(0, Math.floor(quantity) || 0);
        set((state) => {
          if (qty === 0) {
            return { items: state.items.filter((i) => i.productId !== productId) };
          }
          return {
            items: state.items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
          };
        });
      },

      increment: (product, categoryName) => {
        const current = get().getQuantity(product.id);
        get().setQuantity(product, categoryName, current + 1);
      },

      decrement: (productId) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (!existing) return state;
          if (existing.quantity <= 1) {
            return { items: state.items.filter((i) => i.productId !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },

      clearCart: () => set({ items: [] }),

      getQuantity: (productId) => get().items.find((i) => i.productId === productId)?.quantity ?? 0,
    }),
    { name: "mrv-crackers-cart" }
  )
);

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + lineTotal(i.sellingPrice, i.quantity), 0);
  const savings = items.reduce((sum, i) => sum + lineSavings(i.originalPrice, i.sellingPrice, i.quantity), 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, savings, total: subtotal, itemCount };
}
