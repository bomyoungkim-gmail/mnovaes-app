import Image from "next/image";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { CuratedRecommendations } from "@/components/commerce/curated-recommendations";
import { PdpPurchasePanel } from "@/components/commerce/pdp-purchase-panel";
import { BaseLayout } from "@/components/layout/base-layout";
import { BreadcrumbMinimal } from "@/components/layout/breadcrumb-minimal";
import { Container } from "@/components/layout/container";
import { allProducts } from "@/lib/data";

const Jewelry3DStage = dynamic(
  () => import("@/components/commerce/jewelry-3d-stage").then((mod) => mod.Jewelry3DStage),
  { ssr: false }
);

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.id,
  }));
}


type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = allProducts.find((item) => item.id === slug);

  if (!product) {
    notFound();
  }

  const recommended = allProducts.filter((item) => item.id !== product.id).slice(0, 4);
  const completeTheLook = allProducts.filter((item) => item.id !== product.id).slice(0, 8);

  return (
    <BaseLayout brand="M.Novaes" fluid>
      <Container className="pt-4">
        <BreadcrumbMinimal
          items={[
            { label: "Início", href: "/" },
            { label: "Coleção", href: "/plp" },
            { label: product.name }
          ]}
        />
      </Container>

      <section className="grid md:min-h-[70vh] md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 bg-latelier-silk p-4 md:grid-cols-[1fr_120px] md:p-8">
          <Image
            src={product.images.gallery[0]}
            alt={product.name}
            width={1200}
            height={1400}
            priority
            className="h-[58vh] w-full rounded-sm object-cover md:h-full"
          />
          <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:grid-rows-3">
            {product.images.gallery.slice(0, 3).map((img, idx) => (
              <Image key={img + idx} src={img} alt="" aria-hidden="true" width={260} height={320} className="h-24 w-full rounded-sm object-cover md:h-full" />
            ))}
          </div>
        </div>

        <div className="flex items-center px-4 py-8 md:px-12">
          <PdpPurchasePanel product={product} />
        </div>
      </section>

      <Container className="py-10 md:py-16">
        {product.category === "joias" ? (
          <div className="mb-12 md:mb-16">
            <Jewelry3DStage />
          </div>
        ) : null}

        <h2 className="font-serif text-4xl md:text-6xl">Recomendados</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5">
          {recommended.map((item) => (
            <LuxuryProductCard key={item.id} product={item} />
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <CuratedRecommendations items={completeTheLook} />
        </div>
      </Container>
    </BaseLayout>
  );
}
