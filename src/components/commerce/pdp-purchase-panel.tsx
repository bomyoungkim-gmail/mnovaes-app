"use client";

import { Headset } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/cart-context";
import { formatBRL, type Product } from "@/lib/data";

type PdpPurchasePanelProps = {
  product: Product;
};

export function PdpPurchasePanel({ product }: PdpPurchasePanelProps) {
  const { addItem } = useCart();

  return (
    <div className="w-full max-w-xl space-y-5 md:space-y-6">
      <h1 className="font-serif text-5xl leading-[0.95] md:text-7xl">{product.name}</h1>
      <p className="text-4xl md:text-5xl">{formatBRL(product.price)}</p>
      <p className="max-w-xl text-lg text-latelier-charcoal/85 md:text-[1.75rem] md:leading-tight">{product.description}</p>

      <div>
        <label htmlFor="size" className="sr-only">
          Tamanho
        </label>
        <Select defaultValue={product.sizes[0]}>
          <SelectTrigger id="size" aria-label="Selecionar tamanho">
            <SelectValue placeholder="Tamanho" />
          </SelectTrigger>
          <SelectContent>
            {product.sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant={product.theme === "ethere" ? "gold" : "primary"}
        className="w-full text-lg uppercase tracking-wide"
        onClick={() => addItem(product.id)}
      >
        Adicionar a sacola
      </Button>

      <button className="inline-flex items-center gap-2 text-lg underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40 md:text-3xl">
        <Headset className="h-5 w-5" /> Concierge
      </button>
    </div>
  );
}