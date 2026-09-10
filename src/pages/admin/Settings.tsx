import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ImageUploadField } from "../../components/admin/ImageUploadField";
import { Input, Textarea } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { fetchSiteSettings, updateSiteSettings, uploadLogo } from "../../services/settings";
import { isSupabaseConfigured } from "../../lib/supabase";
import type { SiteSettings } from "../../types/database";

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSiteSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => (s ? { ...s, [key]: value } : s));
    setSaved(false);
  }

  async function handleSave() {
    if (!settings || !isSupabaseConfigured) return;
    setSaving(true);
    try {
      await updateSiteSettings(settings.id, {
        business_name: settings.business_name,
        logo_url: settings.logo_url,
        phone: settings.phone,
        whatsapp_number: settings.whatsapp_number,
        email: settings.email,
        address: settings.address,
        city: settings.city,
        minimum_order_amount: settings.minimum_order_amount,
        hero_discount_percent: settings.hero_discount_percent,
        ticker_text: settings.ticker_text,
        footer_text: settings.footer_text,
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <AdminLayout>
        <p className="text-text-muted">Loading settings...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-extrabold text-text-dark">Settings</h1>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-[12px] border border-gold/30 bg-gold/10 p-4 text-sm font-semibold text-gold-dark">
          Supabase is not connected yet. Changes here won't persist until a real project is wired up.
        </div>
      )}

      <div className="max-w-2xl rounded-card border border-black/[0.06] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-5">
          <Input label="Business Name" value={settings.business_name} onChange={(e) => update("business_name", e.target.value)} />
          <ImageUploadField
            label="Logo"
            value={settings.logo_url}
            onUpload={uploadLogo}
            onChange={(url) => update("logo_url", url)}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Phone" value={settings.phone} onChange={(e) => update("phone", e.target.value)} />
            <Input label="WhatsApp Number" value={settings.whatsapp_number} onChange={(e) => update("whatsapp_number", e.target.value)} />
          </div>
          <Input label="Email" type="email" value={settings.email ?? ""} onChange={(e) => update("email", e.target.value)} />
          <Textarea label="Address" value={settings.address} onChange={(e) => update("address", e.target.value)} />
          <Input label="City" value={settings.city} onChange={(e) => update("city", e.target.value)} />
          <Input
            label="Minimum Order Amount (₹)"
            type="number"
            value={settings.minimum_order_amount}
            onChange={(e) => update("minimum_order_amount", Number(e.target.value) || 0)}
          />
          <div>
            <Input
              label="Homepage Discount Badge (%)"
              type="number"
              value={settings.hero_discount_percent}
              onChange={(e) => update("hero_discount_percent", Number(e.target.value) || 0)}
            />
            <p className="mt-1.5 text-xs text-text-muted">
              Shown on the homepage hero ("Up to X% Off"). Keep this at or below your actual
              maximum discount across active products.
            </p>
          </div>
          <Textarea label="Ticker Text" value={settings.ticker_text} onChange={(e) => update("ticker_text", e.target.value)} />
          <Textarea label="Footer Text" value={settings.footer_text} onChange={(e) => update("footer_text", e.target.value)} />

          <div className="flex items-center gap-4">
            <Button icon={<Save size={16} />} onClick={handleSave} disabled={saving || !isSupabaseConfigured}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
            {saved && <span className="text-sm font-semibold text-green-700">Saved successfully.</span>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
