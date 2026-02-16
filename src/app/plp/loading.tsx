import { Skeleton } from "@/components/ui/skeleton";
import { BaseLayout } from "@/components/layout/base-layout";

export default function PlpLoading() {
  return (
    <BaseLayout>
      <div className="mb-6 grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <Skeleton className="h-16 w-40" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-5 w-28" />
            ))}
          </div>
        </aside>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <Skeleton className="h-[220px] w-full md:h-[340px]" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}