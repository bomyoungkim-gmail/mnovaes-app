import { Skeleton } from "@/components/ui/skeleton";
import { BaseLayout } from "@/components/layout/base-layout";

export default function CartLoading() {
  return (
    <BaseLayout>
      <Skeleton className="h-12 w-64" />
      <div className="mt-6 grid gap-8 xl:grid-cols-[1fr_460px]">
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="grid gap-4 border-b border-latelier-charcoal/10 pb-4 md:grid-cols-[120px_1fr_120px_120px]">
              <Skeleton className="h-40 w-28" />
              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-7 w-24" />
            </div>
          ))}
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    </BaseLayout>
  );
}