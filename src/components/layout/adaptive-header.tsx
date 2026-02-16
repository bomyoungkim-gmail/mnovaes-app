"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, UserRound, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const { count } = useWishlist();
  const { isAuthenticated } = useAuth();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const menuLinks = [
    { href: "/", label: "Início" },
    { href: "/plp", label: "Coleção" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Sacola" },
    { href: "/account", label: "Conta" }
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 14);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          dark
            ? scrolled
              ? "border-white/20 bg-black/35 text-white backdrop-blur-xl supports-[backdrop-filter]:bg-black/30 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              : "border-transparent bg-black/10 text-white"
            : scrolled
              ? "border-white/45 bg-white/55 text-latelier-charcoal backdrop-blur-xl supports-[backdrop-filter]:bg-white/45 shadow-[0_8px_30px_rgba(17,24,39,0.12)]"
              : "border-transparent bg-white/20 text-latelier-charcoal"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1560px] items-center justify-between px-4 md:px-8">
          <button
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
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
      {menuOpen ? (
        <div className="fixed inset-0 z-[90] bg-black/55" onClick={() => setMenuOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full w-[88%] max-w-sm border-r border-latelier-charcoal/20 bg-[#f4f2ee] p-5 text-latelier-charcoal shadow-luxe"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="font-serif text-4xl">M.Novaes</p>
              <button
                aria-label="Fechar menu"
                className="rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Menu principal">
              <ul className="space-y-4">
                {menuLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-lg uppercase tracking-editorial text-latelier-charcoal/90 hover:text-latelier-charcoal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
