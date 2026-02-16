import Link from "next/link";
import Image from "next/image";

import { BaseLayout } from "@/components/layout/base-layout";
import { Container } from "@/components/layout/container";
import { HeroEditorial } from "@/components/commerce/hero-editorial";
import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { products } from "@/lib/data";

const essentials = products.slice(0, 3);
const materials = [
  "/images/realistic/silk-blouse-gallery2.jpg",
  "/images/realistic/designer-coat-gallery1.jpg",
  "/images/realistic/jaqueta-urban-gallery2.jpg"
];

export default function Home() {
  return (
    <BaseLayout fluid>
      <HeroEditorial />

      <Container className="space-y-10 py-10 md:space-y-14 md:py-14">
        <section>
          <header className="mb-4 flex items-end justify-between">
            <h2 className="font-serif text-4xl md:text-5xl">Essenciais da Estação</h2>
            <Link href="/plp" className="text-xs uppercase tracking-editorial text-latelier-charcoal/65 hover:underline">
              Ver todos
            </Link>
          </header>
          <p className="mb-5 max-w-xl text-latelier-charcoal/75">
            Curadoria com foco em alfaiataria, texturas naturais e joias de contraste para uso diário.
          </p>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-5">
            {essentials.map((product) => (
              <LuxuryProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <header className="mb-4 flex items-end justify-between">
            <h2 className="font-serif text-4xl md:text-5xl">Matéria Prima</h2>
            <span className="text-xs uppercase tracking-editorial text-latelier-charcoal/65">Processo</span>
          </header>
          <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-latelier-charcoal/75">
              Tecidos de origem controlada e acabamentos de atelier. O foco é preservar caimento, toque e duração das peças.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {materials.map((img) => (
                <div key={img} className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image src={img} alt="Detalhe de matéria prima" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <header className="mb-4 flex items-end justify-between">
            <h2 className="font-serif text-4xl md:text-5xl">Recomendados</h2>
            <Link href="/plp" className="text-xs uppercase tracking-editorial text-latelier-charcoal/65 hover:underline">
              Catálogo completo
            </Link>
          </header>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5">
            {products.map((product) => (
              <LuxuryProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>
    </BaseLayout>
  );
}
