import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-latelier-charcoal/20 bg-latelier-silk px-4 py-2 text-sm text-latelier-charcoal placeholder:text-latelier-charcoal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latelier-charcoal/30",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };