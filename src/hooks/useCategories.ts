import { useEffect, useState } from "react";
import { fetchActiveCategories } from "../services/categories";
import type { Category } from "../types/database";

let cache: Category[] | null = null;
let inFlight: Promise<Category[]> | null = null;

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;

    if (!inFlight) {
      inFlight = fetchActiveCategories().then((data) => {
        cache = data;
        return data;
      });
    }

    let cancelled = false;
    inFlight
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load categories right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading, error };
}
