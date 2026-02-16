"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="grid min-h-[70vh] md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <Image src="/images/realistic/landing-hero.jpg" alt="Editorial de moda L'Atelier" width={1200} height={1400} className="h-full w-full object-cover" priority />
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="order-1 flex flex-col justify-center bg-latelier-silk px-6 py-12 md:order-2 md:px-16"
        >
          <p className="text-xs uppercase tracking-luxury text-latelier-charcoal/65">Colecao 2026</p>
          <h1 className="mt-4 font-serif text-6xl leading-[0.95] md:text-8xl">L&apos;Atelier</h1>
          <p className="mt-4 max-w-md text-xl text-latelier-charcoal/80">A moda e joalheria de luxo em dois universos: editorial diurno e brilho noturno.</p>
          <div className="mt-8 flex gap-3">
            <Button asChild size="lg">
              <Link href="/plp">Explorar colecao</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/product/anel-solitario-luna">Ver destaque</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}