import { BaseLayout } from "@/components/layout/base-layout";
import { BreadcrumbMinimal } from "@/components/layout/breadcrumb-minimal";
import { AIVisualSearch } from "@/components/commerce/ai-visual-search";
import { PlpCatalog } from "@/components/commerce/plp-catalog";

export default function PlpPage() {
  return (
    <BaseLayout>
      <BreadcrumbMinimal className="mb-4" items={[{ label: "Início", href: "/" }, { label: "Coleção" }]} />
      <AIVisualSearch />
      <PlpCatalog />
    </BaseLayout>
  );
}
