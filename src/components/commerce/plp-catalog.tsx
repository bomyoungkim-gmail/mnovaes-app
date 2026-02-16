"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { PageState } from "@/components/feedback/page-state";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/data";

type FetchState = "idle" | "loading" | "success" | "error";

const filters = {
  Tipo: ["Todos", "vestuario", "joias", "bolsas"],
  Cor: ["Greige", "Preto", "Champagne", "Nude"],
  Tamanho: ["P", "M", "G", "GG"],
  Categorias: ["Anel", "Colar", "Casaco", "Blusa"]
} as const;

export function PlpCatalog() {
  const reduceMotion = useReducedMotion();
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [items, setItems] = useState<Product[]>([]);
  const [category, setCategory] = useState<(typeof filters.Tipo)[number]>("Todos");

  const load = useCallback(async () => {
    setFetchState("loading");
    try {
      const response = await fetch("/api/products", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Falha ao buscar catálogo");
      }
      const data = (await response.json()) as Product[];
      setItems(data.concat(data));
      setFetchState("success");
    } catch {
      setFetchState("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredItems = useMemo(() => {
    if (category === "Todos") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:hidden">
        <h1 className="font-serif text-4xl">L&apos;Atelier</h1>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-latelier-charcoal/20 px-3 text-xs uppercase tracking-editorial">
          <SlidersHorizontal className="h-4 w-4" /> Filtrar
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr] xl:gap-10">
        <aside className="hidden border-r border-latelier-charcoal/15 pr-5 lg:block">
          <h1 className="font-serif text-[6.2rem] leading-none">L&apos;Atelier</h1>
          <div className="mt-8 space-y-4">
            {Object.entries(filters).map(([title, values]) => (
              <section key={title} className="border-b border-latelier-charcoal/15 pb-4">
                <h2 className="text-3xl">{title}</h2>
                <ul className="mt-2 space-y-2 text-lg text-latelier-charcoal/75">
                  {values.map((value) => (
                    <li key={value}>
                      <button
                        onClick={() => {
                          if (title === "Tipo") {
                            setCategory(value as (typeof filters.Tipo)[number]);
                          }
                        }}
                        className="text-left capitalize underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/40"
                      >
                        {value}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </aside>

        <section>
          <div className="mb-4 hidden justify-end text-sm uppercase tracking-editorial text-latelier-charcoal/65 md:flex">
            Mostrar {filteredItems.length} resultados
          </div>

          {fetchState === "loading" ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-[220px] w-full md:h-[340px]" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : null}

          {fetchState === "error" ? (
            <PageState
              title="Falha ao carregar produtos"
              description="Não foi possível carregar a galeria no momento."
              actionLabel="Tentar novamente"
              onRetry={() => {
                void load();
              }}
            />
          ) : null}

          {fetchState === "success" && filteredItems.length === 0 ? (
            <PageState
              title="Nenhum produto encontrado"
              description="A combinação de filtros não retornou resultados."
              actionLabel="Limpar filtros"
              onRetry={() => setCategory("Todos")}
            />
          ) : null}

          {fetchState === "success" && filteredItems.length > 0 ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10"
            >
              {filteredItems.map((product, idx) => (
                <motion.div
                  key={`${product.id}-${idx}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : Math.min(idx * 0.03, 0.2), ease: "easeOut" }}
                >
                  <LuxuryProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </section>
      </div>
    </>
  );
}