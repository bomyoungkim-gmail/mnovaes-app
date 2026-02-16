import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-latelier-charcoal/10", className)} />;
}