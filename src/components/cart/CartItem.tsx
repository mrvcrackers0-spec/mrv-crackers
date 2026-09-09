import { PackageSearch, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../context/CartStore";
import { formatCurrency } from "../../lib/utils";
import { QuantityControl } from "../products/QuantityControl";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const total = item.sellingPrice * item.quantity;

  return (
    <div className="flex flex-col gap-4 rounded-card border border-red/10 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      <div className="flex items-center gap-4 sm:flex-1">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[12px] bg-cream sm:h-20 sm:w-20">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain p-2" />
          ) : (
            <PackageSearch className="h-7 w-7 text-gold/50" aria-hidden />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-text-dark sm:text-base">{item.name}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">{item.category}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-red">{formatCurrency(item.sellingPrice)}</span>
            {item.originalPrice && item.originalPrice > item.sellingPrice && (
              <span className="text-xs text-text-muted line-through">{formatCurrency(item.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <QuantityControl quantity={item.quantity} onChange={onQuantityChange} />
        <span className="w-20 text-right text-base font-extrabold text-text-dark sm:w-24">
          {formatCurrency(total)}
        </span>
        <button
          type="button"
          aria-label={`Remove ${item.name}`}
          onClick={onRemove}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-red/10 hover:text-red"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
