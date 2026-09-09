import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface QuantityControlProps {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
}

export function QuantityControl({ quantity, onChange, size = "md" }: QuantityControlProps) {
  const isSmall = size === "sm";

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(0, quantity - 1))}
        className={cn(
          "flex items-center justify-center rounded-[8px] border border-black/15 bg-white font-bold text-text-dark",
          "transition-colors hover:bg-red hover:text-white hover:border-red active:scale-95",
          isSmall ? "h-8 w-8" : "h-10 w-10"
        )}
      >
        <Minus size={isSmall ? 14 : 16} />
      </button>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={quantity}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value.replace(/\D/g, "")) || 0))}
        className={cn(
          "rounded-[8px] border border-black/20 bg-white text-center font-bold text-text-dark",
          "focus:outline-none focus:ring-2 focus:ring-gold/50",
          isSmall ? "h-8 w-12 text-sm" : "h-11 w-16 text-base"
        )}
        aria-label="Quantity"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className={cn(
          "flex items-center justify-center rounded-[8px] border border-black/15 bg-white font-bold text-text-dark",
          "transition-colors hover:bg-red hover:text-white hover:border-red active:scale-95",
          isSmall ? "h-8 w-8" : "h-10 w-10"
        )}
      >
        <Plus size={isSmall ? 14 : 16} />
      </button>
    </div>
  );
}
