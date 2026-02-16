"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { type Product } from "@/lib/data";

type CuratedRecommendationsProps = {
  items: Product[];
  title?: string;
};

export function CuratedRecommendations({ items, title = "Completar o Look" }: CuratedRecommendationsProps) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);

  function scrollByAmount(direction: "prev" | "next") {
    const rail = railRef.current;
    if (!rail) return;
    const amount = Math.max(rail.clientWidth * 0.82, 280);
    rail.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <section>
      <header className="mb-4 flex items-end justify-between">
        <h2 className="font-serif text-4xl md:text-6xl">{title}</h2>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="Ver recomendações anteriores"
            onClick={() => scrollByAmount("prev")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-latelier-charcoal/25 text-latelier-charcoal transition-colors duration-200 hover:bg-latelier-charcoal hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Ver próximas recomendações"
            onClick={() => scrollByAmount("next")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-latelier-charcoal/25 text-latelier-charcoal transition-colors duration-200 hover:bg-latelier-charcoal hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((product, idx) => (
          <motion.div
            key={`${product.id}-${idx}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, delay: reduceMotion ? 0 : Math.min(idx * 0.04, 0.24), ease: "easeOut" }}
            className="w-[75vw] min-w-[260px] snap-start sm:w-[48vw] lg:w-[29vw] xl:w-[24vw]"
          >
            <LuxuryProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

