import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[MRV Crackers] Supabase env vars are not set. Falling back to mock data. " +
      "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file to connect a real project."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient<Database, "public">(supabaseUrl as string, supabaseAnonKey as string)
  : (null as unknown as ReturnType<typeof createClient<Database, "public">>);
