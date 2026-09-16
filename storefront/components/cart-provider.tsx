"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/supabase/types";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  loaded: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, selection: { size?: string; color?: string }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "shree-fashion-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(stored)) {
        setItems(stored.filter((item) => item && typeof item.productId === "string").map((item) => ({
          key: typeof item.key === "string" ? item.key : [item.productId, item.size || "no-size", item.color || "no-colour"].join("::"),
          productId: item.productId, slug: typeof item.slug === "string" ? item.slug : "",
          name: String(item.name || "Product"), price: Number(item.price || 0), image: typeof item.image === "string" ? item.image : null,
          size: typeof item.size === "string" ? item.size : null, color: typeof item.color === "string" ? item.color : null,
          quantity: Math.max(1, Number(item.quantity || 1)),
        })));
      }
    } catch { localStorage.removeItem(storageKey); }
    setLoaded(true);
  }, []);

  useEffect(() => { if (loaded) localStorage.setItem(storageKey, JSON.stringify(items)); }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    loaded,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem(product, { size, color }) {
      const selectedSize = size || null;
      const selectedColor = color || null;
      const key = [product.id, selectedSize || "no-size", selectedColor || "no-colour"].join("::");
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
        return [...current, { key, productId: product.id, slug: product.slug, name: product.name, price: Number(product.price), image: product.images?.[0] || null, size: selectedSize, color: selectedColor, quantity: 1 }];
      });
    },
    updateQuantity(key, quantity) { setItems((current) => quantity < 1 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity } : item)); },
    removeItem(key) { setItems((current) => current.filter((item) => item.key !== key)); },
    clearCart() { setItems([]); },
  }), [items, loaded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider");
  return cart;
}
