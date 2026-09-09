import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "../../lib/utils";

interface MobileOrderBarProps {
  itemCount: number;
  total: number;
  minimumOrderAmount: number;
}

export function MobileOrderBar({ itemCount, total, minimumOrderAmount }: MobileOrderBarProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white px-4 py-3 shadow-float sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-text-dark">
            {itemCount} {itemCount === 1 ? "item" : "items"} • {formatCurrency(total)}
          </p>
          {minimumOrderAmount > 0 && (
            <p className="text-[11px] font-medium text-text-muted">Min Order: {formatCurrency(minimumOrderAmount)}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="inline-flex h-11 flex-none items-center gap-1.5 rounded-btn bg-red px-5 text-sm font-bold text-white shadow-glow-red active:scale-95"
        >
          Order Now <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
