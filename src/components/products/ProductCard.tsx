import { PackageSearch } from "lucide-react";
import type { Product } from "../../types/database";
import { formatCurrency } from "../../lib/utils";
import { Button } from "../ui/Button";
import { useCartStore } from "../../context/CartStore";

interface ProductCardProps {
  product: Product;
  categoryName: string;
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const increment = useCartStore((s) => s.increment);

  return (
    <div className="group flex flex-col overflow-hidden rounded-card-lg border border-black/[0.06] bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-card">
      <div className="h-1.5 w-full bg-gradient-to-r from-red to-gold" aria-hidden />
      <div className="relative flex h-44 items-center justify-center bg-cream sm:h-48">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <PackageSearch className="h-12 w-12 text-gold/50" aria-hidden />
        )}
        {product.discount_percentage ? (
          <span className="absolute right-3 top-3 rounded-pill bg-red px-2.5 py-1 text-xs font-bold text-white shadow-soft">
            {product.discount_percentage}% OFF
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] font-bold text-text-dark">
          {product.name}
        </h3>
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {categoryName}
        </span>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-red">
            {formatCurrency(product.selling_price)}
          </span>
          {product.original_price && product.original_price > product.selling_price && (
            <span className="text-sm text-text-muted line-through">
              {formatCurrency(product.original_price)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          fullWidth
          onClick={() => increment(product, categoryName)}
        >
          Add to Estimate
        </Button>
      </div>
    </div>
  );
}
