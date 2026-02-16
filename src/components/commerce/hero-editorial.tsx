"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { allProducts, formatBRL, getProductById } from "@/lib/data";

const editorialProduct = getProductById("designer-coat");
const jewelryProduct = getProductById("colar-solitario-luz");
const spotlight = allProducts.slice(0, 3);

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();
  const hasProducts = Boolean(editorialProduct && jewelryProduct);
  if (!hasProducts) return null;
  const primary = editorialProduct!;
  const accent = jewelryProduct!;

  return (
    <section className="bg-[linear-gradient(170deg,#eceae4_0%,#f4f3ef_42%,#e7e3dd_100%)] px-3 py-4 md:px-8 md:py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
      >
        <article className="relative overflow-hidden border border-black/10 bg-[#d9d5ce] shadow-luxe">
          <div className="relative aspect-[4/5] min-h-[560px] w-full md:aspect-[16/10] md:min-h-[640px]">
            <Image src={primary.images.gallery[1] ?? primary.images.primary} alt={primary.name} fill priority className="object-cover" />
            <div className="absolute right-4 top-4 border border-black/15 bg-white/80 px-3 py-1 text-right backdrop-blur-sm md:right-6 md:top-6 md:px-4 md:py-2">
              <p className="font-serif text-xl leading-none md:text-2xl">L&apos;ATELIER</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-editorial text-black/65 md:text-xs">Couture line</p>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 bg-white/95 p-5 text-latelier-charcoal md:p-8"
            style={{ clipPath: "polygon(0 23%, 100% 0, 100% 100%, 0 100%)" }}
          >
            <h2 className="font-serif text-[2.2rem] leading-none md:text-[3.2rem]">L&apos;ATELIER</h2>
            <p className="mt-1 text-sm text-latelier-charcoal/70 md:text-base">Editorial fit</p>
            <p className="mt-1.5 text-xl md:text-2xl">{formatBRL(primary.price)}</p>
            <Link
              href={`/product/${primary.id}`}
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-latelier-charcoal px-4 text-xs uppercase tracking-editorial text-latelier-charcoal transition-colors duration-200 hover:bg-latelier-charcoal hover:text-white"
            >
              Ver produto <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          <article className="border border-black/10 bg-white/85 p-4 backdrop-blur-sm md:p-5">
            <p className="text-[10px] uppercase tracking-editorial text-latelier-charcoal/65 md:text-xs">Selecao da Maison</p>
            <h3 className="mt-2 font-serif text-3xl leading-none md:text-4xl">Essenciais em Movimento</h3>
            <p className="mt-3 max-w-sm text-sm text-latelier-charcoal/75">
              Silhuetas fluidas, joias de contraste e acabamentos de atelier para um visual mais elegante e menos rigido.
            </p>
            <Link
              href={`/product/${accent.id}`}
              className="mt-4 inline-flex h-9 items-center rounded-full border border-latelier-charcoal/30 px-4 text-xs uppercase tracking-editorial text-latelier-charcoal transition-colors duration-200 hover:border-latelier-charcoal"
            >
              Explorar curadoria
            </Link>
          </article>

          <div className="grid grid-cols-3 gap-3">
            {spotlight.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group block overflow-hidden border border-black/10 bg-white">
                <div className="relative aspect-[3/4]">
                  <Image src={item.images.primary} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
