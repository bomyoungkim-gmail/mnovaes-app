import { BaseLayout } from "@/components/layout/base-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <BaseLayout>
      <Skeleton className="h-12 w-64" />
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_460px]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <Skeleton className="h-9 w-52" />
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-11 w-full" />
            ))}
          </div>
          <div className="space-y-3 rounded-lg border border-latelier-charcoal/10 p-4">
            <Skeleton className="h-9 w-60" />
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-11 w-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    </BaseLayout>
  );
}