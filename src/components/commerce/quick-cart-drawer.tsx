"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatBRL } from "@/lib/data";

type QuickCartDrawerProps = {
  count?: number;
};

export function QuickCartDrawer({ count = 0 }: QuickCartDrawerProps) {
  const { lineItems, subtotal, removeItem } = useCart();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          aria-label="Abrir sacola"
          className="relative rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-latelier-charcoal px-1 text-[10px] text-white">
              {count}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35 data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-[92vw] max-w-md bg-white p-6 shadow-luxe outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
          <div className="flex items-center justify-between border-b border-latelier-charcoal/10 pb-3">
            <Dialog.Title className="text-xl font-medium uppercase tracking-editorial">Shopping cart</Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Fechar"
                className="rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-5 space-y-4">
            {lineItems.length === 0 ? <p className="text-sm text-latelier-charcoal/70">Sua sacola está vazia.</p> : null}
            {lineItems.map((item) => (
              <div key={item.productId} className="border-b border-latelier-charcoal/10 pb-4">
                <p className="font-medium uppercase">{item.product.name}</p>
                <p className="text-sm text-latelier-charcoal/70">Qtd: {item.quantity}</p>
                <p>{formatBRL(item.product.price)}</p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="mt-1 text-sm underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between text-lg font-medium">
            <span>Subtotal</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          <Button asChild className="mt-4 w-full uppercase tracking-wide">
            <Link href="/cart">Finalizar compra</Link>
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}