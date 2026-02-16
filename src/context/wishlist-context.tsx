"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { getProductById } from "@/lib/data";

type WishlistContextValue = {
  items: string[];
  count: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  clearWishlist: () => void;
  products: Array<NonNullable<ReturnType<typeof getProductById>>>;
};

const STORAGE_KEY = "mnovaes:wishlist";
const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as string[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      isFavorite: (productId) => items.includes(productId),
      toggleFavorite: (productId) => {
        setItems((current) => {
          if (current.includes(productId)) {
            return current.filter((id) => id !== productId);
          }
          return [...current, productId];
        });
      },
      clearWishlist: () => setItems([]),
      products: items
        .map((productId) => getProductById(productId))
        .filter(Boolean) as Array<NonNullable<ReturnType<typeof getProductById>>>
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
