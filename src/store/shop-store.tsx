"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/src/types/store";

type ShopState = {
  cart: CartItem[];
  favorites: number[];
  hydrated: boolean;
  add: (product: Product, variants?: Record<string, string>) => void;
  remove: (key: string) => void;
  toggleFavorite: (id: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

const ShopContext = createContext<ShopState | null>(null);
export const cartItemKey = (item: Pick<CartItem, "productId" | "variants">) =>
  `${item.productId}:${Object.entries(item.variants).sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => `${name}=${value}`).join("&")}`;

function readCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("nord-cart") ?? "[]");
    if (Array.isArray(saved)) {
      return saved.filter((item): item is CartItem =>
        typeof item?.productId === "number" && typeof item?.quantity === "number" && item.variants && typeof item.variants === "object",
      );
    }
    if (saved && typeof saved === "object") {
      return Object.entries(saved).flatMap(([id, quantity]) =>
        typeof quantity === "number" && quantity > 0
          ? [{ productId: Number(id), quantity, variants: {} }]
          : [],
      );
    }
  } catch {
    localStorage.removeItem("nord-cart");
  }
  return [];
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readCart());
    try {
      const saved: unknown = JSON.parse(localStorage.getItem("nord-favorites") ?? "[]");
      setFavorites(Array.isArray(saved) ? saved.filter((id): id is number => typeof id === "number") : []);
    } catch {
      localStorage.removeItem("nord-favorites");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("nord-cart", JSON.stringify(cart));
      localStorage.setItem("nord-favorites", JSON.stringify(favorites));
    }
  }, [cart, favorites, hydrated]);

  const state = useMemo<ShopState>(() => ({
    cart,
    favorites,
    hydrated,
    add: (product, variants = {}) => setCart((current) => {
      const key = cartItemKey({ productId: product.id, variants });
      const existing = current.find((item) => cartItemKey(item) === key);
      const selectedSize = product.sizes.find((size) => size.value === variants.Talla);
      const stockLimit = selectedSize?.stock ?? product.stock;
      if (stockLimit <= 0 || (existing?.quantity ?? 0) >= stockLimit) return current;
      return existing
        ? current.map((item) => cartItemKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId: product.id, quantity: 1, variants }];
    }),
    remove: (key) => setCart((current) => current.filter((item) => cartItemKey(item) !== key)),
    toggleFavorite: (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    setQuantity: (key, quantity) => setCart((current) => current.map((item) => cartItemKey(item) === key ? { ...item, quantity: Math.max(1, quantity) } : item)),
    clear: () => setCart([]),
  }), [cart, favorites, hydrated]);

  return <ShopContext.Provider value={state}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}
