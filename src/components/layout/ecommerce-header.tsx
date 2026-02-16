import { AdaptiveHeader } from "@/components/layout/adaptive-header";

export function EcommerceHeader({ brand = "M.Novaes" }: { brand?: string }) {
  return <AdaptiveHeader brand={brand} />;
}
