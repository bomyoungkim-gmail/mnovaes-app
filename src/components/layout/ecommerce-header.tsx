import { AdaptiveHeader } from "@/components/layout/adaptive-header";

export function EcommerceHeader({ brand = "L'Atelier" }: { brand?: string }) {
  return <AdaptiveHeader brand={brand} />;
}