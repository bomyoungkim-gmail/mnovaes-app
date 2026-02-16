"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { formatBRL, getProductById, asset } from "@/lib/data";

const editorialProduct = getProductById("designer-coat");
const heroSlides = [
  asset("/images/realistic/hero-slide-1.jpg"),
  asset("/images/realistic/hero-slide-2.jpg"),
  asset("/images/realistic/hero-slide-3.jpg"),
];

function SlideshowImages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={index}
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Image
          src={heroSlides[index]}
          alt={`Modelo M.Novaes - Slide ${index + 1}`}
          fill
          priority
          className="object-cover object-[center_20%]"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();
  const hasProducts = Boolean(editorialProduct);
  if (!hasProducts) return null;
  const primary = editorialProduct!;

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden bg-[#e8e6e1] md:h-[130vh]">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <SlideshowImages />
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Asymmetrical White Overlay */}
      <div className="absolute bottom-0 left-0 z-10 w-[95%] bg-white pb-8 pr-8 pt-6 md:w-[45%] md:min-w-[500px] md:pb-16 md:pl-16 md:pr-16 md:pt-12">
        {/* Angular decorative cut at the top right of the white block */}
        <div 
          className="absolute -top-[80px] left-0 h-[80px] w-full bg-white md:-right-[80px] md:top-0 md:h-full md:w-[80px]"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }} 
        />
        
        {/* Mobile top-right cut */}
        <div 
           className="absolute -top-[50px] left-0 h-[50px] w-full bg-white md:hidden"
           style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
        />

        <div className="relative z-20 pl-6 md:pl-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-latelier-charcoal/60">
              Coleção 2026
            </p>
            <h2 className="font-serif text-[3.5rem] leading-[0.9] text-latelier-charcoal md:text-[5rem]">
              L&apos;ATELIER
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-latelier-charcoal/80 md:text-base">
              Uma celebração da alta costura moderna. Silhuetas fluidas, tecidos nobres e o minimalismo essencial da M.Novaes.
            </p>
            
            <div className="mt-8 flex items-center gap-6">
               <div>
                  <p className="text-[10px] uppercase tracking-wider text-latelier-charcoal/50">Valor</p>
                  <p className="font-serif text-2xl text-latelier-charcoal">{formatBRL(primary.price)}</p>
               </div>
               <div className="h-px flex-1 bg-latelier-charcoal/10"></div>
            </div>

            <Link
              href={`/product/${primary.id}`}
              className="group mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-latelier-charcoal transition-colors hover:text-black"
            >
              <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100">
                Ver Detalhes
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
