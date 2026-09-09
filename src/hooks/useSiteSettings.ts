import { useEffect, useState } from "react";
import { fetchSiteSettings } from "../services/settings";
import { mockSiteSettings } from "../lib/mockData";
import type { SiteSettings } from "../types/database";

let cache: SiteSettings | null = null;
let inFlight: Promise<SiteSettings> | null = null;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cache ?? mockSiteSettings);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;

    if (!inFlight) {
      inFlight = fetchSiteSettings().then((data) => {
        cache = data;
        return data;
      });
    }

    let cancelled = false;
    inFlight.then((data) => {
      if (!cancelled) {
        setSettings(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading };
}
