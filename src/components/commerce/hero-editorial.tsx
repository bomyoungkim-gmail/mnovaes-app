"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { formatBRL, getProductById, products } from "@/lib/data";

const editorialProduct = getProductById("designer-coat");
const jewelryProduct = getProductById("colar-solitario-luz");
const secondaryGrid = products.slice(0, 6);

type ScreenMode = "editorial" | "jewelry";

function PreviewHeader() {
  return (
    <div className="flex h-10 items-center justify-between border-b border-current/10 px-4">
      <span className="font-serif text-[1.75rem] leading-none">M.Novaes</span>
      <div className="flex items-center gap-2.5">
        <Search className="h-4 w-4" />
        <ShoppingBag className="h-4 w-4" />
        <Menu className="h-4 w-4" />
      </div>
    </div>
  );
}

function ProductMiniGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {secondaryGrid.slice(0, 6).map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="group overflow-hidden rounded-sm border border-latelier-charcoal/10 bg-white"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={item.images.primary}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

function LandingScreen({ mode }: { mode: ScreenMode }) {
  const dark = mode === "jewelry";
  const product = dark ? jewelryProduct : editorialProduct;
  if (!product) return null;

  return (
    <article
      className={`w-full max-w-[430px] overflow-hidden border shadow-luxe ${
        dark ? "border-white/15 bg-[#0a0a0a] text-white" : "border-latelier-charcoal/15 bg-white text-latelier-charcoal"
      }`}
    >
      <PreviewHeader />

      <div className="relative">
        <div className="relative h-[55vh] min-h-[460px]">
          <Image src={product.images.primary} alt={product.name} fill priority className="object-cover" />

          <div
            className={`absolute inset-x-0 bottom-0 p-6 ${
              dark ? "bg-gradient-to-t from-black via-black/75 to-transparent" : "bg-gradient-to-t from-white via-white/65 to-transparent"
            }`}
          >
            <h2 className={`font-serif text-[2.6rem] leading-none ${dark ? "text-white" : "text-latelier-charcoal"}`}>
              {dark ? "Colar Solitário Luz" : "M.Novaes"}
            </h2>
            <p className={`mt-1 text-sm ${dark ? "text-white/80" : "text-latelier-charcoal/75"}`}>
              {dark ? "Edição Noturna" : "Editorial Fit"}
            </p>
            <p className={`mt-1.5 text-2xl ${dark ? "text-white" : "text-latelier-charcoal"}`}>{formatBRL(product.price)}</p>
            <Link
              href={`/product/${product.id}`}
              className={`mt-4 inline-flex h-9 items-center rounded-full border px-4 text-xs uppercase tracking-editorial ${
                dark
                  ? "border-ethere-gold text-ethere-gold hover:bg-ethere-gold hover:text-black"
                  : "border-latelier-charcoal text-latelier-charcoal hover:bg-latelier-charcoal hover:text-white"
              } transition-colors`}
            >
              Adicionar à sacola
            </Link>
          </div>

          <div className="absolute bottom-0 right-0 h-14 w-full -skew-y-6 bg-white/95" />
        </div>
      </div>

      <div className={`space-y-4 p-4 ${dark ? "bg-white text-latelier-charcoal" : "bg-white"}`}>
        <div className="flex items-end justify-between">
          <h3 className="font-serif text-[2rem] leading-none">Essenciais da Estação</h3>
          <span className="text-[10px] uppercase tracking-editorial text-latelier-charcoal/60">S26</span>
        </div>

        <ProductMiniGrid />

        <div className="pt-1">
          <h4 className="font-serif text-2xl">Matéria Prima</h4>
          <p className="mt-1 text-xs text-latelier-charcoal/70">
            Curadoria de texturas e acabamentos para peças de longa duração.
          </p>
        </div>
      </div>
    </article>
  );
}

function MobileSwitcher() {
  const [activeMode, setActiveMode] = useState<ScreenMode>("editorial");

  return (
    <div className="md:hidden">
      <div className="mx-auto mb-3 flex max-w-[430px] rounded-full border border-latelier-charcoal/20 bg-white p-1">
        <button
          type="button"
          onClick={() => setActiveMode("editorial")}
          className={`h-9 flex-1 rounded-full text-xs uppercase tracking-editorial transition-colors ${
            activeMode === "editorial" ? "bg-latelier-charcoal text-white" : "text-latelier-charcoal"
          }`}
        >
          Editorial
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("jewelry")}
          className={`h-9 flex-1 rounded-full text-xs uppercase tracking-editorial transition-colors ${
            activeMode === "jewelry" ? "bg-latelier-charcoal text-white" : "text-latelier-charcoal"
          }`}
        >
          Joias
        </button>
      </div>

      <div className="flex justify-center">
        <LandingScreen mode={activeMode} />
      </div>
    </div>
  );
}

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();
  const hasProducts = useMemo(() => Boolean(editorialProduct && jewelryProduct), []);
  if (!hasProducts) return null;

  return (
    <section className="bg-[#efefec] px-3 py-4 md:px-8 md:py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-[1280px]"
      >
        <div className="hidden items-start justify-center gap-8 md:flex lg:gap-12">
          <LandingScreen mode="editorial" />
          <LandingScreen mode="jewelry" />
        </div>

        <MobileSwitcher />
      </motion.div>
    </section>
  );
}
