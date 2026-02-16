"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CartRow } from "@/components/commerce/cart-row";
import { OrderSummary } from "@/components/commerce/order-summary";
import { PageState } from "@/components/feedback/page-state";
import { BaseLayout } from "@/components/layout/base-layout";
import { BreadcrumbMinimal } from "@/components/layout/breadcrumb-minimal";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const reduceMotion = useReducedMotion();
  const { lineItems, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <BaseLayout>
      <BreadcrumbMinimal className="mb-4" items={[{ label: "Início", href: "/" }, { label: "Sacola" }]} />
      <h1 className="font-serif text-5xl md:text-7xl">Sacola de compras</h1>

      {lineItems.length === 0 ? (
        <div className="mt-8">
          <PageState
            title="Sua sacola está vazia"
            description="Adicione peças da coleção para continuar o checkout."
            actionLabel="Explorar catálogo"
            actionHref="/plp"
          />
        </div>
      ) : (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-6 grid gap-8 xl:grid-cols-[1fr_460px]"
        >
          <div>
            <div className="hidden grid-cols-[1fr_170px_150px] border-b border-latelier-charcoal/15 pb-2 text-base uppercase tracking-editorial text-latelier-charcoal/75 md:grid">
              <span>Item</span>
              <span className="text-center">Quantidade</span>
              <span className="text-right">Preço</span>
            </div>

            <div>
              {lineItems.map((item) => (
                <CartRow
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                  onRemove={() => removeItem(item.product.id)}
                />
              ))}
            </div>
          </div>

          <OrderSummary subtotal={subtotal} shipping={-2000} ctaLabel="Finalizar compra" href="/checkout" sticky />
        </motion.div>
      )}
    </BaseLayout>
  );
}
