"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { QuantityStepper } from "@/components/commerce/quantity-stepper";
import { formatBRL, type Product } from "@/lib/data";

type CartRowProps = {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartRow({ product, quantity, onIncrease, onDecrease, onRemove }: CartRowProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="grid gap-4 border-b border-latelier-charcoal/15 py-6 md:grid-cols-[140px_1fr_auto_auto] md:items-center md:gap-8"
    >
      <Image
        src={product.images.primary}
        alt={product.name}
        width={180}
        height={220}
        className="h-[160px] w-[120px] rounded-md object-cover md:h-[200px] md:w-[140px]"
      />
      <div>
        <h3 className="font-serif text-3xl leading-tight md:text-4xl">{product.name}</h3>
        <p className="mt-1 text-base text-latelier-charcoal/80 md:text-lg">{product.category === "joias" ? "Joias" : "Vestuário"}</p>
        <button
          onClick={onRemove}
          className="mt-3 text-base underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/30"
        >
          Remover
        </button>
      </div>
      <QuantityStepper value={quantity} onIncrease={onIncrease} onDecrease={onDecrease} />
      <p className="text-2xl md:text-3xl">{formatBRL(product.price)}</p>
    </motion.article>
  );
}