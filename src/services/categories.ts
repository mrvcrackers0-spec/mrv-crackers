import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { mockCategories } from "../lib/mockData";
import type { Category } from "../types/database";

export async function fetchActiveCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return mockCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.warn("[MRV Crackers] Failed to load categories from Supabase, using mock data.", error.message);
    return mockCategories;
  }

  return data ?? [];
}

export async function fetchAllCategoriesAdmin(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createCategory(payload: Omit<Category, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("categories").insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function updateCategory(id: string, payload: Partial<Omit<Category, "id" | "created_at" | "updated_at">>) {
  const { data, error } = await supabase.from("categories").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function setCategoryActive(id: string, is_active: boolean) {
  return updateCategory(id, { is_active });
}

export async function uploadCategoryImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `category-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return data.publicUrl;
}
