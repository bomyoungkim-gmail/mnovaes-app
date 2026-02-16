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
    <section className="bg-[linear-gradient(170deg,#eceae4_0%,#f4f3ef_42%,#e7e3dd_100%)] px-3 py-4 md:px-8 md:py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-[980px]"
      >
        <article className="relative overflow-hidden border border-black/10 bg-[#d9d5ce] shadow-luxe">
          <div className="relative aspect-[4/5] min-h-[560px] w-full md:aspect-[16/10] md:min-h-[640px]">
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
                initial={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 8,
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
      </motion.div>
    </section>
  );
}
