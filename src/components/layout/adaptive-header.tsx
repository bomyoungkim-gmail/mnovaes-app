"use client";

import Link from "next/link";
import { Heart, Menu, Search, UserRound } from "lucide-react";

import { QuickCartDrawer } from "@/components/commerce/quick-cart-drawer";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";

type HeaderProps = {
  brand?: string;
  dark?: boolean;
};

export function AdaptiveHeader({ brand = "M.Novaes", dark = false }: HeaderProps) {
  const { items } = useCart();
  const { count } = useWishlist();
  const { isAuthenticated } = useAuth();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-sm",
        dark ? "border-white/10 bg-black/40 text-white" : "border-latelier-charcoal/10 bg-white/90 text-latelier-charcoal"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1560px] items-center justify-between px-4 md:px-8">
        <button
          aria-label="Abrir menu"
          className="rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="font-serif text-3xl leading-none md:text-[3.2rem]">
          {brand}
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/account"
            aria-label={isAuthenticated ? "Minha conta" : "Login e cadastro"}
            className="rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
          >
            <UserRound className="h-5 w-5" />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Favoritos"
            className="relative rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
          >
            <Heart className={cn("h-5 w-5", count > 0 ? "fill-current" : "")} />
            {count > 0 ? (
              <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-latelier-charcoal px-1 text-[9px] text-white">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            aria-label="Buscar"
            className="rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <QuickCartDrawer count={itemCount} />
        </div>
      </div>
    </header>
  );
}
