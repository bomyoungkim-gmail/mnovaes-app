import { AdaptiveHeader } from "@/components/layout/adaptive-header";
import { Container } from "@/components/layout/container";

type BaseLayoutProps = {
  children: React.ReactNode;
  brand?: string;
  dark?: boolean;
  fluid?: boolean;
};

export function BaseLayout({ children, brand, dark, fluid = false }: BaseLayoutProps) {
  return (
    <>
      <AdaptiveHeader brand={brand} dark={dark} />
      <main>
        {fluid ? children : <Container className="py-6 md:py-10">{children}</Container>}
      </main>
    </>
  );
}