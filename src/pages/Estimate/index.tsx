import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useCartStore, cartTotals } from "../../context/CartStore";
import { CategoryFilter } from "../../components/products/CategoryFilter";
import { EstimateTable } from "../../components/products/EstimateTable";
import { MobileEstimateList } from "../../components/products/MobileEstimateList";
import { MobileOrderBar } from "../../components/products/MobileOrderBar";
import { Skeleton } from "../../components/ui/Skeleton";
import { formatCurrency } from "../../lib/utils";

export default function Estimate() {
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { settings } = useSiteSettings();

  const items = useCartStore((s) => s.items);
  const getQuantity = useCartStore((s) => s.getQuantity);
  const setQuantity = useCartStore((s) => s.setQuantity);

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { total, savings, itemCount } = cartTotals(items);

  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();

    const visibleCategories = activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

    return visibleCategories
      .map((category) => {
        const categoryProducts = products.filter((p) => {
          if (p.category_id !== category.id) return false;
          if (query && !p.name.toLowerCase().includes(query)) return false;
          return true;
        });
        return { category, products: categoryProducts };
      })
      .filter((group) => group.products.length > 0);
  }, [categories, products, activeCategory, search]);

  const loading = productsLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-[#f3f3f3] pb-24 sm:pb-0">
      {/* Minimum order banner */}
      <div className="border-b border-black/5 bg-[#f0efec] py-4 text-center sm:py-5">
        <p className="text-xl font-extrabold text-red sm:text-[32px]">
          Minimum Order Amount {formatCurrency(settings.minimum_order_amount)}
        </p>
      </div>

      {/* Category filter */}
      {!categoriesLoading && <CategoryFilter categories={categories} activeId={activeCategory} onChange={setActiveCategory} />}

      {/* Search / summary bar */}
      <div className="bg-red">
        <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
          <div className="relative w-full sm:w-[300px]">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here ..."
              className="h-[48px] w-full rounded-[10px] border border-black/20 bg-white pl-10 pr-4 text-[15px] text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end sm:gap-5">
            <span className="rounded-pill bg-white px-3.5 py-1.5 text-sm font-bold text-green-700 sm:text-[15px]">
              You Saved {formatCurrency(savings)}
            </span>
            <span className="text-lg font-extrabold text-white sm:text-xl">
              Total: {formatCurrency(total)}
            </span>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="inline-flex h-[42px] items-center gap-2 rounded-[9px] border-2 border-white bg-transparent px-5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-red"
            >
              Submit <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container-page py-6 sm:py-8">
        {productsError && <p className="mb-4 text-center text-text-muted">{productsError}</p>}
        {loading ? (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-14 w-full" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : isDesktop ? (
          <EstimateTable
            groups={groups}
            getQuantity={getQuantity}
            onQuantityChange={(product, categoryName, qty) => setQuantity(product, categoryName, qty)}
          />
        ) : (
          <MobileEstimateList
            groups={groups}
            getQuantity={getQuantity}
            onQuantityChange={(product, categoryName, qty) => setQuantity(product, categoryName, qty)}
          />
        )}
      </div>

      <MobileOrderBar itemCount={itemCount} total={total} minimumOrderAmount={settings.minimum_order_amount} />
    </div>
  );
}
