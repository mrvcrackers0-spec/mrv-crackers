import { cn } from "../../lib/utils";
import type { Category } from "../../types/database";

interface CategoryFilterProps {
  categories: Category[];
  activeId: string | "all";
  onChange: (id: string | "all") => void;
}

export function CategoryFilter({ categories, activeId, onChange }: CategoryFilterProps) {
  return (
    <div className="border-b border-black/5 bg-white">
      <div className="container-page">
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto py-4">
          <button
            type="button"
            onClick={() => onChange("all")}
            className={cn(
              "shrink-0 rounded-pill px-5 py-2.5 text-sm font-bold transition-all",
              activeId === "all"
                ? "bg-red text-white shadow-glow-red"
                : "border border-black/10 bg-white text-text-dark shadow-soft hover:border-red/40"
            )}
          >
            All Collections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                "shrink-0 rounded-pill px-5 py-2.5 text-sm font-bold transition-all",
                activeId === cat.id
                  ? "bg-red text-white shadow-glow-red"
                  : "border border-black/10 bg-white text-text-dark shadow-soft hover:border-red/40"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
