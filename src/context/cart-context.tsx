"use client";

import { createContext, useContext, useMemo, useReducer, type PropsWithChildren } from "react";

import { getProductById, initialCartItems } from "@/lib/data";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  lineItems: Array<{ productId: string; quantity: number; product: NonNullable<ReturnType<typeof getProductById>> }>;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

type CartAction =
  | { type: "add"; productId: string; quantity: number }
  | { type: "update"; productId: string; quantity: number }
  | { type: "remove"; productId: string };

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "add") {
    const exists = state.items.find((item) => item.productId === action.productId);
    if (exists) {
      return {
        items: state.items.map((item) =>
          item.productId === action.productId ? { ...item, quantity: item.quantity + action.quantity } : item
        )
      };
    }

    return {
      items: [...state.items, { productId: action.productId, quantity: action.quantity }]
    };
  }

  if (action.type === "update") {
    if (action.quantity <= 0) {
      return {
        items: state.items.filter((item) => item.productId !== action.productId)
      };
    }

    return {
      items: state.items.map((item) =>
        item.productId === action.productId ? { ...item, quantity: action.quantity } : item
      )
    };
  }

  return {
    items: state.items.filter((item) => item.productId !== action.productId)
  };
}

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, { items: initialCartItems });

  const value = useMemo<CartContextValue>(() => {
    const lineItems = state.items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter(Boolean) as CartContextValue["lineItems"];

    const subtotal = lineItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return {
      items: state.items,
      lineItems,
      subtotal,
      addItem: (productId, quantity = 1) => dispatch({ type: "add", productId, quantity }),
      updateQuantity: (productId, quantity) => dispatch({ type: "update", productId, quantity }),
      removeItem: (productId) => dispatch({ type: "remove", productId })
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}