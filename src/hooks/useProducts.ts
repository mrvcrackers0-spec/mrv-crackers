import { useEffect, useState } from "react";
import { fetchActiveProducts } from "../services/products";
import type { Product } from "../types/database";

let cache: Product[] | null = null;
let inFlight: Promise<Product[]> | null = null;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;

    if (!inFlight) {
      inFlight = fetchActiveProducts().then((data) => {
        cache = data;
        return data;
      });
    }

    let cancelled = false;
    inFlight
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load products right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
