import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { ProductCard } from "../products/ProductCard";
import { Skeleton } from "../ui/Skeleton";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";

const CARD_SCROLL_DISTANCE = 288;

export function FeaturedProducts() {
  const { products, loading, error } = useProducts();
  const { categories } = useCategories();
  const featured = products.filter((p) => p.is_featured).slice(0, 8);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const categoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? "Crackers";

  function scrollByCards(direction: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: direction * CARD_SCROLL_DISTANCE, behavior: "smooth" });
  }

  return (
    <section className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            kicker="Top Picks"
            title={<>Featured <span className="text-red">Crackers</span></>}
            subtitle="Handpicked favorites from our collection."
          />
          <div className="flex items-center gap-2">
            {featured.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollByCards(-1)}
                  aria-label="Scroll to previous products"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-text-dark shadow-soft transition hover:bg-red hover:text-white"
                >
                  <ChevronLeft size={18} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCards(1)}
                  aria-label="Scroll to next products"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-text-dark shadow-soft transition hover:bg-red hover:text-white"
                >
                  <ChevronRight size={18} aria-hidden />
                </button>
              </>
            )}
            <Link to="/estimate">
              <Button variant="secondary" size="sm" icon={<ArrowRight size={16} />}>
                View All
              </Button>
            </Link>
          </div>
        </div>

        {error && <p className="text-center text-text-muted">{error}</p>}

        {!loading && featured.length === 0 && !error && (
          <p className="text-center text-text-muted">No featured products yet. Check back soon.</p>
        )}

        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-64 flex-none rounded-card-lg sm:w-72" />
              ))
            : featured.map((product) => (
                <div key={product.id} className="w-64 flex-none snap-start sm:w-72">
                  <ProductCard product={product} categoryName={categoryName(product.category_id)} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
