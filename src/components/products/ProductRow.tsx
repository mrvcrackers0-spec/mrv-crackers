import { useState } from "react";
import { PackageSearch } from "lucide-react";
import type { Product } from "../../types/database";
import { formatCurrency } from "../../lib/utils";
import { QuantityControl } from "./QuantityControl";

interface ProductRowProps {
  product: Product;
  serialNo: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ProductRow({ product, serialNo, quantity, onQuantityChange }: ProductRowProps) {
  const [showDetails, setShowDetails] = useState(false);
  const total = product.selling_price * quantity;
  const hasDiscount = Boolean(product.original_price && product.original_price > product.selling_price);

  return (
    <tr className="bg-[#ececec]">
      <td className="border border-black p-2 text-center align-middle text-sm font-bold text-text-dark sm:text-base">
        {serialNo}
      </td>
      <td className="border border-black p-2 align-middle">
        <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center bg-white sm:h-[72px] sm:w-[72px]">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} loading="lazy" className="h-full w-full object-contain p-1" />
          ) : (
            <PackageSearch className="h-6 w-6 text-black/20" aria-hidden />
          )}
        </div>
      </td>
      <td className="border border-black p-3 align-middle">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-sm font-bold text-text-dark sm:text-[15px]">{product.name}</span>
          {product.description && (
            <>
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="rounded-pill bg-red px-3 py-1 text-xs font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                {showDetails ? "Hide Details" : "View Details"}
              </button>
              {showDetails && (
                <p className="max-w-[280px] text-xs leading-relaxed text-text-muted">{product.description}</p>
              )}
            </>
          )}
        </div>
      </td>
      <td className="border border-black p-2 text-center align-middle">
        <div className="flex flex-col items-center gap-0.5">
          {hasDiscount && (
            <span className="text-xs text-text-muted line-through sm:text-sm">
              {formatCurrency(product.original_price as number)}
            </span>
          )}
          <span className="text-sm font-bold text-text-dark sm:text-base">{formatCurrency(product.selling_price)}</span>
        </div>
      </td>
      <td className="border border-black p-2 text-center align-middle">
        <QuantityControl quantity={quantity} onChange={onQuantityChange} size="sm" />
      </td>
      <td className="border border-black p-2 text-center align-middle text-sm font-extrabold text-red sm:text-base">
        {formatCurrency(total)}
      </td>
    </tr>
  );
}
