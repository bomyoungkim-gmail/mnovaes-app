"use client";

import { PageState } from "@/components/feedback/page-state";

export default function PlpError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-[1560px] px-4 py-10 md:px-8">
      <PageState
        title="Erro na galeria"
        description="Ocorreu um problema ao renderizar a página de produtos."
        actionLabel="Tentar novamente"
        onRetry={reset}
      />
    </div>
  );
}