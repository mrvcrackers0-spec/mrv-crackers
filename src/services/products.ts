import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { mockProducts } from "../lib/mockData";
import type { Product } from "../types/database";

export async function fetchActiveProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return mockProducts;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.warn("[MRV Crackers] Failed to load products from Supabase, using mock data.", error.message);
    return mockProducts;
  }

  return data ?? [];
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const products = await fetchActiveProducts();
  return products.filter((p) => p.is_featured);
}

export async function fetchAllProductsAdmin(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createProduct(payload: Omit<Product, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("products").insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, payload: Partial<Omit<Product, "id" | "created_at" | "updated_at">>) {
  const { data, error } = await supabase.from("products").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
