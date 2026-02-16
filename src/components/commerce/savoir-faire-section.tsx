"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const assets = [
  `${basePath}/images/realistic/designer-coat-gallery1.jpg`,
  `${basePath}/images/realistic/silk-blouse-gallery2.jpg`,
  `${basePath}/images/realistic/jaqueta-urban-gallery1.jpg`
];

export function SavoirFaireSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yTop = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 24]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -24]);
  const yBottom = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-12, 20]);

  return (
    <section ref={ref} className="grid gap-6 border-y border-latelier-charcoal/10 py-10 md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:py-14">
      <div>
        <p className="text-xs uppercase tracking-editorial text-latelier-charcoal/60">Savoir-Faire</p>
        <h2 className="mt-2 font-serif text-4xl leading-none md:text-6xl">Atelier em Movimento</h2>
        <p className="mt-4 max-w-md text-latelier-charcoal/75">
          Da escolha de tecidos ao acabamento final, cada peça recebe construção manual e controle de caimento para preservar estrutura, toque e durabilidade.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <motion.div style={{ y: yTop }} className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image src={assets[0]} alt="Detalhe de acabamento em casaco" fill className="object-cover" />
        </motion.div>
        <motion.div style={{ y: yMiddle }} className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image src={assets[1]} alt="Textura de seda em detalhe macro" fill className="object-cover" />
        </motion.div>
        <motion.div style={{ y: yBottom }} className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image src={assets[2]} alt="Costura e acabamento da coleção" fill className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

