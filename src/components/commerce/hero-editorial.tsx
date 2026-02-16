"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { formatBRL, getProductById } from "@/lib/data";

const daytimeProduct = getProductById("designer-coat");
const nightProduct = getProductById("colar-solitario-luz");

function HeroPanel({
  dark,
  image,
  title,
  subtitle,
  price,
  ctaHref
}: {
  dark?: boolean;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  ctaHref: string;
}) {
  return (
    <article
      className={`overflow-hidden rounded-sm border ${dark ? "border-white/15 bg-black text-white" : "border-latelier-charcoal/15 bg-white text-latelier-charcoal"}`}
    >
      <header
        className={`flex h-11 items-center justify-between px-4 ${dark ? "border-white/15" : "border-latelier-charcoal/10"} border-b`}
      >
        <span className="font-serif text-2xl">M.Novaes</span>
        <div className="flex items-center gap-3">
          <Search className="h-4 w-4" />
          <ShoppingBag className="h-4 w-4" />
          <Menu className="h-4 w-4" />
        </div>
      </header>

      <div className="relative h-[62vh] min-h-[480px]">
        <Image src={image} alt={title} fill className="object-cover" priority />

        <div className={`absolute inset-x-0 bottom-0 p-6 ${dark ? "bg-gradient-to-t from-black/90 via-black/45 to-transparent" : "bg-gradient-to-t from-white/90 via-white/40 to-transparent"}`}>
          <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
          <p className={`mt-1 text-sm uppercase tracking-editorial ${dark ? "text-white/75" : "text-latelier-charcoal/70"}`}>
            {subtitle}
          </p>
          <p className="mt-2 text-lg">{formatBRL(price)}</p>
          <Link
            href={ctaHref}
            className={`mt-4 inline-flex h-10 items-center rounded-full border px-5 text-sm uppercase tracking-editorial transition-colors ${
              dark ? "border-ethere-gold text-ethere-gold hover:bg-ethere-gold hover:text-black" : "border-latelier-charcoal hover:bg-latelier-charcoal hover:text-white"
            }`}
          >
            Adicionar a sacola
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();

  if (!daytimeProduct || !nightProduct) return null;

  return (
    <section className="bg-[#f4f4f1] px-3 py-4 md:px-8 md:py-8">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2"
      >
        <HeroPanel
          image={daytimeProduct.images.primary}
          title="M.Novaes"
          subtitle="Editorial Fit"
          price={daytimeProduct.price}
          ctaHref={`/product/${daytimeProduct.id}`}
        />
        <HeroPanel
          dark
          image={nightProduct.images.primary}
          title="Colar Solitário Luz"
          subtitle="Coleção Noturna"
          price={nightProduct.price}
          ctaHref={`/product/${nightProduct.id}`}
        />
      </motion.div>
    </section>
  );
}
