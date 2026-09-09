import { formatCurrency } from "../../lib/utils";

interface CartSummaryProps {
  subtotal: number;
  savings: number;
  total: number;
  minimumOrderAmount: number;
}

export function CartSummary({ subtotal, savings, total, minimumOrderAmount }: CartSummaryProps) {
  const belowMinimum = minimumOrderAmount > 0 && total < minimumOrderAmount;

  return (
    <div className="rounded-card-lg border border-black/[0.06] bg-white p-6 shadow-soft">
      <h3 className="mb-5 text-lg font-extrabold text-text-dark">Order Summary</h3>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-text-muted">
          <span>Subtotal</span>
          <span className="font-semibold text-text-dark">{formatCurrency(subtotal)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Savings</span>
            <span className="font-semibold">- {formatCurrency(savings)}</span>
          </div>
        )}
        <div className="my-1 border-t border-black/10" />
        <div className="flex items-baseline justify-between">
          <span className="text-base font-bold text-text-dark">Total</span>
          <span className="text-2xl font-extrabold text-red">{formatCurrency(total)}</span>
        </div>
      </div>

      {minimumOrderAmount > 0 && (
        <p className={`mt-4 rounded-[10px] p-3 text-xs font-semibold ${belowMinimum ? "bg-red/10 text-red" : "bg-green-50 text-green-700"}`}>
          {belowMinimum
            ? `Minimum order amount is ${formatCurrency(minimumOrderAmount)}. Add ${formatCurrency(minimumOrderAmount - total)} more to proceed.`
            : `Minimum order amount of ${formatCurrency(minimumOrderAmount)} met.`}
        </p>
      )}
    </div>
  );
}
