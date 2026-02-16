"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

import { useWishlist } from "@/context/wishlist-context";
import { formatBRL, type Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
};

export function LuxuryProductCard({ product }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const { isFavorite, toggleFavorite } = useWishlist();
  const favorite = isFavorite(product.id);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-sm">
        <Link
          href={`/product/${product.id}`}
          className="block overflow-hidden bg-latelier-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
        >
          <Image
            src={product.images.primary}
            alt={product.name}
            width={540}
            height={680}
            className="h-[220px] w-full object-cover transition-opacity duration-300 ease-out group-hover:opacity-0 md:h-[340px]"
          />
          <Image
            src={product.images.hover}
            alt=""
            aria-hidden="true"
            width={540}
            height={680}
            className="absolute inset-0 h-[220px] w-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:h-[340px]"
          />
          <span className="sr-only">Ver {product.name}</span>
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-white md:p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-[1.35rem] leading-tight md:text-[1.65rem]">{product.name}</h3>
              <p className="text-xs uppercase tracking-editorial text-white/80">
                {product.category === "joias" ? "Joalheria" : "Vestuário"}
              </p>
            </div>
            <p className="text-base whitespace-nowrap md:text-lg">{formatBRL(product.price)}</p>
          </div>
        </div>

        <button
          aria-label={`${favorite ? "Remover" : "Adicionar"} ${product.name} ${favorite ? "dos" : "aos"} favoritos`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute right-3 top-3 rounded-full border border-latelier-charcoal/15 bg-white/85 p-2 text-latelier-charcoal transition-colors duration-200 hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </motion.article>
  );
}
