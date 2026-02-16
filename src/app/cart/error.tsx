"use client";

import { PageState } from "@/components/feedback/page-state";

export default function CartError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-[1560px] px-4 py-10 md:px-8">
      <PageState
        title="Erro na sacola"
        description="Houve um problema ao carregar os itens da sua sacola."
        actionLabel="Tentar novamente"
        onRetry={reset}
      />
    </div>
  );
}