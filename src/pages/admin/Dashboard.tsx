import { useEffect, useState } from "react";
import { Package, PackageCheck, Tags, Star } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { fetchAllProductsAdmin } from "../../services/products";
import { fetchAllCategoriesAdmin } from "../../services/categories";
import { isSupabaseConfigured } from "../../lib/supabase";
import { Skeleton } from "../../components/ui/Skeleton";

export default function AdminDashboard() {
  const [counts, setCounts] = useState<{ total: number; active: number; categories: number; featured: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    Promise.all([fetchAllProductsAdmin(), fetchAllCategoriesAdmin()])
      .then(([products, categories]) => {
        setCounts({
          total: products.length,
          active: products.filter((p) => p.is_active).length,
          categories: categories.length,
          featured: products.filter((p) => p.is_featured).length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Products", value: counts?.total, icon: Package },
    { label: "Active Products", value: counts?.active, icon: PackageCheck },
    { label: "Categories", value: counts?.categories, icon: Tags },
    { label: "Featured Products", value: counts?.featured, icon: Star },
  ];

  return (
    <AdminLayout>
      <h1 className="mb-6 text-2xl font-extrabold text-text-dark">Dashboard</h1>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-[12px] border border-gold/30 bg-gold/10 p-4 text-sm font-semibold text-gold-dark">
          Supabase is not connected yet. Connect it to see live product and category counts.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-card border border-black/[0.06] bg-white p-6 shadow-soft">
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-red/10 text-red">
              <Icon size={20} aria-hidden />
            </span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="block text-3xl font-extrabold text-text-dark">{value ?? "—"}</span>
            )}
            <span className="mt-1 block text-sm font-medium text-text-muted">{label}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
