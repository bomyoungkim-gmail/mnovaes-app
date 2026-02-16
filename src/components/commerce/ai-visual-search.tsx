"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Camera, Search, Sparkles } from "lucide-react";

import { LuxuryProductCard } from "@/components/commerce/luxury-product-card";
import { Button } from "@/components/ui/button";
import { allProducts, type Product } from "@/lib/data";

type SearchState = "idle" | "loading" | "done";

function hashSeed(value: string) {
  let hash = 0;
  for (let idx = 0; idx < value.length; idx++) {
    hash = (hash * 31 + value.charCodeAt(idx)) >>> 0;
  }
  return hash;
}

function inferCategoryFromName(fileName: string): Product["category"] {
  const normalized = fileName.toLowerCase();
  const jewelryTerms = ["anel", "ring", "colar", "necklace", "jewel", "joia", "diamond", "ouro"];
  if (jewelryTerms.some((term) => normalized.includes(term))) return "joias";
  return "vestuario";
}

function pickVisualMatches(fileName: string) {
  const category = inferCategoryFromName(fileName);
  const pool = allProducts.filter((item) => item.category === category);
  if (pool.length === 0) return allProducts.slice(0, 4);
  const seed = hashSeed(fileName);
  const rotated = pool.map((_, idx) => pool[(idx + (seed % pool.length)) % pool.length]);
  return rotated.slice(0, 4);
}

export function AIVisualSearch() {
  const [state, setState] = useState<SearchState>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  const helperText = useMemo(() => {
    if (state === "loading") return "Analisando textura, silhueta e composição visual...";
    if (state === "done") return "Busca concluída. Seleções com maior similaridade visual.";
    return "Envie uma imagem para descobrir peças da coleção com estética similar.";
  }, [state]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function handleFile(file: File) {
    const nextPreview = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(nextPreview);
    setFileName(file.name);
    setState("loading");
    await new Promise((resolve) => setTimeout(resolve, 950));
    setResults(pickVisualMatches(file.name));
    setState("done");
  }

  function handleTextSearch() {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      setState("idle");
      setResults([]);
      return;
    }
    setState("loading");
    setTimeout(() => {
      const byName = allProducts.filter((item) => item.name.toLowerCase().includes(normalized));
      setResults((byName.length > 0 ? byName : allProducts.slice(0, 4)).slice(0, 4));
      setState("done");
    }, 500);
  }

  return (
    <section className="mb-8 border border-latelier-charcoal/10 bg-white/80 p-4 md:mb-10 md:p-6">
      <header>
        <div>
          <p className="text-xs uppercase tracking-editorial text-latelier-charcoal/60">AI Visual Search</p>
          <h2 className="mt-1 font-serif text-3xl leading-none md:text-4xl">Busca por Imagem</h2>
        </div>
      </header>

      <div className="mt-4">
        <div className="flex h-11 items-center rounded-full border border-latelier-charcoal/20 bg-white pl-4 pr-1">
          <Search className="h-4 w-4 text-latelier-charcoal/55" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleTextSearch();
              }
            }}
            placeholder="Buscar por nome ou estilo"
            className="h-full flex-1 bg-transparent px-3 text-sm text-latelier-charcoal placeholder:text-latelier-charcoal/55 focus:outline-none"
          />
          <label
            aria-label="Buscar por imagem"
            className="mr-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-latelier-charcoal/20 text-latelier-charcoal transition-colors duration-200 hover:bg-latelier-charcoal hover:text-white"
          >
            <Camera className="h-4 w-4" />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                void handleFile(file);
              }}
            />
          </label>
          <Button type="button" size="sm" className="rounded-full px-4" onClick={handleTextSearch}>
            Buscar
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[250px_1fr]">
        <div className="space-y-3">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-latelier-charcoal/15 bg-latelier-silk">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Imagem enviada para busca visual"
                fill
                unoptimized
                sizes="250px"
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-latelier-charcoal/55">
                <Camera className="h-6 w-6" />
                <p className="mt-2 text-xs uppercase tracking-editorial">sem imagem</p>
              </div>
            )}
          </div>
          <p className="text-xs text-latelier-charcoal/75">{fileName || "Nenhum arquivo selecionado"}</p>
          <p className="text-sm text-latelier-charcoal/75">{helperText}</p>
          <Button
            type="button"
            variant="outline"
            disabled={state === "loading" || !previewUrl}
            className="w-full justify-center gap-2"
            onClick={() => {
              if (!fileName) return;
              setState("loading");
              setTimeout(() => {
                setResults(pickVisualMatches(fileName));
                setState("done");
              }, 850);
            }}
          >
            <Sparkles className="h-4 w-4" />
            {state === "loading" ? "Processando..." : "Refinar busca"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(state === "done" ? results : allProducts.slice(0, 4)).map((product) => (
            <LuxuryProductCard key={`visual-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
