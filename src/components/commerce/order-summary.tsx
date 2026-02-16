"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/data";
import { cn } from "@/lib/utils";

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  ctaLabel: string;
  href: string;
  sticky?: boolean;
};

export function OrderSummary({ subtotal, shipping, ctaLabel, href, sticky = false }: OrderSummaryProps) {
  const reduceMotion = useReducedMotion();
  const total = subtotal + shipping;

  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "rounded-lg border border-latelier-charcoal/15 bg-white p-6 shadow-sm md:p-8",
        sticky ? "xl:sticky xl:top-24 xl:self-start" : ""
      )}
    >
      <h2 className="font-sans text-3xl font-medium uppercase tracking-tight md:text-[2rem]">Resumo do pedido</h2>
      <dl className="mt-5 space-y-2 text-lg md:text-xl">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>{formatBRL(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Custo de envio</dt>
          <dd>{shipping < 0 ? `- ${formatBRL(Math.abs(shipping))}` : formatBRL(shipping)}</dd>
        </div>
      </dl>
      <div className="my-5 border-t border-latelier-charcoal/10" />
      <div className="flex items-center justify-between text-3xl md:text-4xl">
        <p>Total</p>
        <p>{formatBRL(total)}</p>
      </div>
      <Button asChild className="mt-7 h-12 w-full text-base uppercase tracking-wide">
        <Link href={href}>{ctaLabel}</Link>
      </Button>
    </motion.aside>
  );
}