"use client";

import Link from "next/link";

import { BaseLayout } from "@/components/layout/base-layout";
import { BreadcrumbMinimal } from "@/components/layout/breadcrumb-minimal";
import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";

export default function WishlistPage() {
  const { products, count, clearWishlist } = useWishlist();

  return (
    <BaseLayout>
      <BreadcrumbMinimal className="mb-4" items={[{ label: "Início", href: "/" }, { label: "Favoritos" }]} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl">Favoritos</h1>
          <p className="mt-2 text-sm uppercase tracking-editorial text-latelier-charcoal/65">
            {count} {count === 1 ? "item salvo" : "itens salvos"}
          </p>
        </div>
        {count > 0 ? (
          <Button variant="outline" onClick={clearWishlist}>
            Limpar lista
          </Button>
        ) : null}
      </div>

      {count === 0 ? (
        <div className="mt-8 rounded-md border border-latelier-charcoal/15 bg-white/70 p-6">
          <p className="text-latelier-charcoal/80">Sua wishlist está vazia.</p>
          <Button asChild className="mt-4">
            <Link href="/plp">Explorar produtos</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-5">
          {products.map((product) => (
            <LuxuryProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </BaseLayout>
  );
}
