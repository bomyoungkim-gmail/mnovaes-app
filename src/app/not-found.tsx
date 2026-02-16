import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-serif text-7xl">Produto não encontrado</h1>
        <p className="mt-2 text-latelier-charcoal/80">O item solicitado não está disponível nesta coleção.</p>
        <Button asChild className="mt-6">
          <Link href="/plp">Voltar para a galeria</Link>
        </Button>
      </div>
    </main>
  );
}