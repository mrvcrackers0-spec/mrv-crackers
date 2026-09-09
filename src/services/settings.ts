import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { mockSiteSettings } from "../lib/mockData";
import type { SiteSettings, SiteSettingsUpdate } from "../types/database";

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return mockSiteSettings;

  const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();

  if (error || !data) {
    if (error) console.warn("[MRV Crackers] Failed to load site settings from Supabase, using mock data.", error.message);
    return mockSiteSettings;
  }

  return data;
}

export async function updateSiteSettings(id: string, payload: SiteSettingsUpdate) {
  const { data, error } = await supabase.from("site_settings").update(payload).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function uploadLogo(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `logo-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("site-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return data.publicUrl;
}
