import { PackageSearch } from "lucide-react";
import type { Category, Product } from "../../types/database";
import { formatCurrency } from "../../lib/utils";
import { QuantityControl } from "./QuantityControl";

interface MobileEstimateListProps {
  groups: { category: Category; products: Product[] }[];
  getQuantity: (productId: string) => number;
  onQuantityChange: (product: Product, categoryName: string, quantity: number) => void;
}

export function MobileEstimateList({ groups, getQuantity, onQuantityChange }: MobileEstimateListProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-card border border-black/10 bg-white p-8 text-center text-text-muted shadow-soft">
        No products match your search.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[4px] border border-black/10 shadow-card">
      {groups.map(({ category, products }) => (
        <div key={category.id}>
          <div className="flex h-11 items-center justify-between bg-stripes-red px-4">
            <span className="text-sm font-extrabold uppercase tracking-wide text-white">{category.name}</span>
            <span className="rounded-pill bg-black/30 px-2.5 py-0.5 text-[11px] font-bold text-white">
              {products.length} {products.length === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>

          {products.map((product) => {
            const quantity = getQuantity(product.id);
            const hasDiscount = Boolean(product.original_price && product.original_price > product.selling_price);

            return (
              <div key={product.id} className="flex items-center gap-3 border-t border-black/10 bg-white p-3">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-[8px] bg-cream">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <PackageSearch className="h-5 w-5 text-black/20" aria-hidden />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[13px] font-bold leading-snug text-text-dark">{product.name}</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    {hasDiscount && (
                      <span className="text-xs text-text-muted line-through">
                        {formatCurrency(product.original_price as number)}
                      </span>
                    )}
                    <span className="text-sm font-extrabold text-red">{formatCurrency(product.selling_price)}</span>
                  </div>
                </div>

                <div className="flex-none">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => onQuantityChange(product, category.name, 1)}
                      className="rounded-pill bg-red px-4 py-2 text-xs font-bold text-white shadow-soft transition-transform active:scale-95"
                    >
                      + Add
                    </button>
                  ) : (
                    <QuantityControl
                      quantity={quantity}
                      onChange={(q) => onQuantityChange(product, category.name, q)}
                      size="sm"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
