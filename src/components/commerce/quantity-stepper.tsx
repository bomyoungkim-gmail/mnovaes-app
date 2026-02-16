"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  className?: string;
};

export function QuantityStepper({ value, onDecrease, onIncrease, className }: QuantityStepperProps) {
  return (
    <div className={cn("inline-flex items-center rounded-md border border-latelier-charcoal/20 bg-white", className)}>
      <Button
        type="button"
        aria-label="Diminuir quantidade"
        variant="outline"
        size="sm"
        className="h-11 border-0 px-3"
        onClick={onDecrease}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center text-base" aria-live="polite">
        {value}
      </span>
      <Button
        type="button"
        aria-label="Aumentar quantidade"
        variant="outline"
        size="sm"
        className="h-11 border-0 px-3"
        onClick={onIncrease}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}