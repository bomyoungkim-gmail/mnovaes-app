import { BaseLayout } from "@/components/layout/base-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <BaseLayout fluid>
      <section className="grid md:min-h-[70vh] md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 p-4 md:grid-cols-[1fr_120px] md:p-8">
          <Skeleton className="h-[58vh] w-full md:h-full" />
          <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:grid-rows-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-24 w-full md:h-full" />
            ))}
          </div>
        </div>
        <div className="px-4 py-8 md:px-12">
          <Skeleton className="h-12 w-72" />
          <Skeleton className="mt-4 h-10 w-40" />
          <Skeleton className="mt-4 h-24 w-full" />
          <Skeleton className="mt-6 h-11 w-full" />
          <Skeleton className="mt-4 h-12 w-full" />
        </div>
      </section>
    </BaseLayout>
  );
}