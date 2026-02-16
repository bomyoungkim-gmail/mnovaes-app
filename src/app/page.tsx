import Link from "next/link";

import { BaseLayout } from "@/components/layout/base-layout";
import { Container } from "@/components/layout/container";
import { HeroEditorial } from "@/components/commerce/hero-editorial";
import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <BaseLayout fluid>
      <HeroEditorial />

      <Container className="py-12 md:py-16">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-5xl md:text-6xl">Recomendados</h2>
          <Link
            href="/plp"
            className="text-sm uppercase tracking-editorial underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
          >
            Ver todos
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5">
          {products.map((product) => (
            <LuxuryProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </BaseLayout>
  );
}