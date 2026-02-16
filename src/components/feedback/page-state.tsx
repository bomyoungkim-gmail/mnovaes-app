import Link from "next/link";

import { Button } from "@/components/ui/button";

type PageStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onRetry?: () => void;
};

export function PageState({ title, description, actionLabel, actionHref, onRetry }: PageStateProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-lg border border-latelier-charcoal/10 bg-white px-6 py-10 text-center">
      <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
      <p className="mt-2 max-w-lg text-sm text-latelier-charcoal/70 md:text-base">{description}</p>
      {actionLabel && actionHref ? (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
      {actionLabel && onRetry ? (
        <Button className="mt-6" onClick={onRetry}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}