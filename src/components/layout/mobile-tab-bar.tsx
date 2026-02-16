"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Home, Search, ShoppingBag, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export function MobileTabBar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { href: "/", label: "Início", icon: Home },
    { href: "/plp", label: "Buscar", icon: Search },
    { href: "/cart", label: "Sacola", icon: ShoppingBag },
    { href: "/checkout", label: "Conta", icon: UserRound }
  ];

  return (
    <nav aria-label="Navegação rápida" className="fixed bottom-2 left-1/2 z-30 w-[calc(100%-1rem)] -translate-x-1/2 rounded-2xl border border-latelier-charcoal/15 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-luxe backdrop-blur-md md:hidden">
      <ul className="grid grid-cols-4">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "relative flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40",
                  active ? "text-latelier-charcoal" : "text-latelier-charcoal/60"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="tab-active"
                    className="absolute inset-x-2 inset-y-1 rounded-lg bg-latelier-charcoal/8"
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
                  />
                ) : null}
                <span className="relative inline-flex">
                  <Icon className="h-4 w-4" />
                  {item.href === "/cart" && itemCount > 0 ? (
                    <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-latelier-charcoal px-1 text-[9px] text-white">
                      {itemCount}
                    </span>
                  ) : null}
                </span>
                <span className="relative">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}