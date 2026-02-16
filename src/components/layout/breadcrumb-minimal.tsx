import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbMinimalProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function BreadcrumbMinimal({ items, className }: BreadcrumbMinimalProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-[10px] uppercase tracking-editorial text-latelier-charcoal/60 md:text-xs">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-latelier-charcoal hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-latelier-charcoal/85" : ""}>{item.label}</span>
              )}
              {!last ? <span aria-hidden="true" className="text-latelier-charcoal/40">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

