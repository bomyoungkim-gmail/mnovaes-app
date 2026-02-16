"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { formatBRL, getProductById, products } from "@/lib/data";

const daytimeProduct = getProductById("designer-coat");
const nightProduct = getProductById("colar-solitario-luz");
const gridItems = products.slice(0, 6);

function TopBar({ brand, dark = false }: { brand: string; dark?: boolean }) {
  return (
    <div className={`flex h-10 items-center justify-between px-3 ${dark ? "text-white" : "text-latelier-charcoal"}`}>
      <span className="font-serif text-2xl leading-none">{brand}</span>
      <div className="flex items-center gap-2.5">
        <Search className="h-4 w-4" />
        <ShoppingBag className="h-4 w-4" />
        <Menu className="h-4 w-4" />
      </div>
    </div>
  );
}

function HeroCard({
  brand,
  dark = false,
  image,
  title,
  subtitle,
  price,
  ctaHref
}: {
  brand: string;
  dark?: boolean;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  ctaHref: string;
}) {
  return (
    <article
      className={`mx-auto w-full max-w-[430px] overflow-hidden border shadow-luxe ${
        dark ? "border-white/10 bg-[#050505] text-white" : "border-latelier-charcoal/10 bg-white text-latelier-charcoal"
      }`}
    >
      <TopBar brand={brand} dark={dark} />
      <div className="relative">
        <div className="relative h-[56vh] min-h-[460px]">
          <Image src={image} alt={title} fill className="object-cover" priority />
          <div
            className={`absolute inset-x-0 bottom-0 p-5 ${
              dark ? "bg-gradient-to-t from-black via-black/70 to-transparent" : "bg-gradient-to-t from-white via-white/70 to-transparent"
            }`}
          >
            <h2 className={`font-serif text-5xl leading-none ${dark ? "text-white" : "text-latelier-charcoal"}`}>{title}</h2>
            <p className={`mt-1 text-sm ${dark ? "text-white/80" : "text-latelier-charcoal/80"}`}>{subtitle}</p>
            <p className={`mt-1.5 text-2xl ${dark ? "text-white" : "text-latelier-charcoal"}`}>{formatBRL(price)}</p>
            <Link
              href={ctaHref}
              className={`mt-4 inline-flex h-9 items-center rounded-full border px-4 text-xs uppercase tracking-editorial transition-colors ${
                dark
                  ? "border-ethere-gold text-ethere-gold hover:bg-ethere-gold hover:text-black"
                  : "border-latelier-charcoal text-latelier-charcoal hover:bg-latelier-charcoal hover:text-white"
              }`}
            >
              Adicionar à sacola
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 h-16 w-full -skew-y-6 bg-white/95" />
        </div>
      </div>

      <div className={`p-4 ${dark ? "bg-white text-latelier-charcoal" : "bg-white"}`}>
        <div className="mb-3 flex items-end justify-between">
          <h3 className="font-serif text-3xl leading-none">Essenciais</h3>
          <span className="text-[10px] uppercase tracking-editorial text-latelier-charcoal/60">S26</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {gridItems.slice(0, 3).map((item) => (
            <Link key={`${brand}-${item.id}`} href={`/product/${item.id}`} className="group overflow-hidden rounded-sm border border-latelier-charcoal/10">
              <div className="relative aspect-[4/5]">
                <Image src={item.images.primary} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();

  if (!daytimeProduct || !nightProduct) return null;

  return (
    <section className="bg-[#efefec] px-3 py-4 md:px-8 md:py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-[1280px]"
      >
        <div className="hidden items-start justify-center gap-10 md:flex">
          <HeroCard
            brand="ÉTHÉRÉ"
            image={daytimeProduct.images.primary}
            title="M.Novaes"
            subtitle="Editorial Fit"
            price={daytimeProduct.price}
            ctaHref={`/product/${daytimeProduct.id}`}
          />
          <HeroCard
            brand="M.NOVAES"
            dark
            image={nightProduct.images.primary}
            title="Colar Solitário Luz"
            subtitle="Coleção Noturna"
            price={nightProduct.price}
            ctaHref={`/product/${nightProduct.id}`}
          />
        </div>

        <div className="md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            <div className="w-[88vw] shrink-0 snap-center">
              <HeroCard
                brand="ÉTHÉRÉ"
                image={daytimeProduct.images.primary}
                title="M.Novaes"
                subtitle="Editorial Fit"
                price={daytimeProduct.price}
                ctaHref={`/product/${daytimeProduct.id}`}
              />
            </div>
            <div className="w-[88vw] shrink-0 snap-center">
              <HeroCard
                brand="M.NOVAES"
                dark
                image={nightProduct.images.primary}
                title="Colar Solitário Luz"
                subtitle="Coleção Noturna"
                price={nightProduct.price}
                ctaHref={`/product/${nightProduct.id}`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
