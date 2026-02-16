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
    <section className="bg-[linear-gradient(170deg,#eceae4_0%,#f4f3ef_42%,#e7e3dd_100%)] px-0 py-2 md:px-5 md:py-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-[1540px]"
      >
        <article className="relative isolate overflow-hidden border-y border-black/10 bg-[#d9d5ce] shadow-luxe md:rounded-sm md:border">
          <div className="relative aspect-[4/5] min-h-[560px] w-full md:aspect-[16/9] md:min-h-[620px] xl:aspect-[21/9] xl:min-h-[680px]">
            {showVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroImage}
                onError={() => setVideoErrored(true)}
                className="z-0 h-full w-full object-cover"
              >
                <source src={heroVideo4k} type="video/mp4" media="(min-width: 1440px)" />
                <source src={heroVideo} type="video/mp4" />
              </video>
            ) : (
              <div className="relative z-0 h-full w-full">
                <Image
                  src={heroImage}
                  alt="Modelo vestindo a coleção M.Novaes"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(255,252,242,0.42),rgba(0,0,0,0)_46%),linear-gradient(to_top,rgba(0,0,0,0.34),rgba(0,0,0,0.04)_34%,rgba(0,0,0,0)_62%)]" />
            {!reduceMotion ? (
              <>
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 top-16 z-10 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_72%)] mix-blend-screen"
                  animate={{ x: [0, 20, -8, 0], y: [0, -10, 12, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-20 top-28 z-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.25)_0%,rgba(212,175,55,0)_70%)] mix-blend-screen"
                  animate={{ x: [0, -16, 12, 0], y: [0, 8, -10, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            ) : null}
            <div className="absolute right-4 top-4 z-20 border border-black/15 bg-white/80 px-3 py-1 text-right backdrop-blur-sm md:right-6 md:top-6 md:px-4 md:py-2">
              <p className="font-serif text-xl leading-none md:text-2xl">L&apos;ATELIER</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-editorial text-black/65 md:text-xs">Couture line</p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-30 md:bottom-8 md:left-8 md:right-auto md:w-[440px]">
              <div
                className="relative overflow-visible border border-white/50 bg-[linear-gradient(130deg,rgba(255,255,255,0.75),rgba(255,255,255,0.88)_38%,rgba(255,255,255,0.72))] p-5 pt-7 text-latelier-charcoal shadow-[0_20px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl md:p-7 md:pt-10"
                style={{ clipPath: "none" }}
              >
                <p className="text-[10px] uppercase tracking-editorial text-latelier-charcoal/60">Coleção 2026</p>
                <h2 className="mt-2 pb-1 font-serif text-[2.4rem] leading-[1.1] md:text-[3.3rem]">L&apos;ATELIER</h2>
                <p className="mt-1 text-sm text-latelier-charcoal/75 md:text-base">Editorial fit</p>
                <p className="mt-2 text-2xl md:text-3xl">{formatBRL(primary.price)}</p>
                <Link
                  href={`/product/${primary.id}`}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-latelier-charcoal px-5 text-xs uppercase tracking-editorial text-latelier-charcoal transition-colors duration-200 hover:bg-latelier-charcoal hover:text-white"
                >
                  Ver produto <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
