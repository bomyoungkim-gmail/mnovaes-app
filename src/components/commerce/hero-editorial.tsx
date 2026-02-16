"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { formatBRL, getProductById } from "@/lib/data";

const editorialProduct = getProductById("designer-coat");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const heroImage = `${basePath}/images/realistic/landing-hero.jpg`;
const heroVideo = `${basePath}/videos/hero-editorial-16x10-zoom.mp4`;
const heroVideo4k = `${basePath}/videos/hero-editorial-4k.mp4`;

export function HeroEditorial() {
  const reduceMotion = useReducedMotion();
  const [videoErrored, setVideoErrored] = useState(false);
  const hasProducts = Boolean(editorialProduct);
  if (!hasProducts) return null;
  const primary = editorialProduct!;
  const showVideo = !reduceMotion && !videoErrored;

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden bg-[#e8e6e1] md:h-[130vh]">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
            onError={() => setVideoErrored(true)}
            className="h-full w-full object-cover"
          >
            <source src={heroVideo4k} type="video/mp4" media="(min-width: 1440px)" />
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <motion.div
            className="relative h-full w-full"
            initial={reduceMotion ? { scale: 1 } : { scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={
              reduceMotion
                ? {}
                : {
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
            }
          >
            <Image
              src={heroImage}
              alt="Modelo vestindo a coleção M.Novaes"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        )}
        
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/5" />
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
