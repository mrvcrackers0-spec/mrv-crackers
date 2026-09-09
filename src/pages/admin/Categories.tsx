import { useEffect, useState } from "react";
import { Plus, Pencil, PackageSearch } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { CategoryForm, type CategoryFormValues } from "../../components/admin/CategoryForm";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { fetchAllCategoriesAdmin, createCategory, updateCategory, setCategoryActive } from "../../services/categories";
import { isSupabaseConfigured } from "../../lib/supabase";
import type { Category } from "../../types/database";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [pendingToggle, setPendingToggle] = useState<Category | null>(null);

  async function load() {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await fetchAllCategoriesAdmin();
    setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(values: CategoryFormValues) {
    if (editing) {
      await updateCategory(editing.id, values);
    } else {
      await createCategory(values);
    }
    await load();
  }

  async function handleToggleActive() {
    if (!pendingToggle) return;
    await setCategoryActive(pendingToggle.id, !pendingToggle.is_active);
    setPendingToggle(null);
    await load();
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-text-dark">Categories</h1>
        <Button
          size="sm"
          icon={<Plus size={16} />}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-[12px] border border-gold/30 bg-gold/10 p-4 text-sm font-semibold text-gold-dark">
          Supabase is not connected yet. Category management requires a live project.
        </div>
      )}

      <div className="overflow-x-auto rounded-card border border-black/[0.06] bg-white shadow-soft">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-black/[0.03] text-xs font-bold uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Display Order</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.06]">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">Loading...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">No categories yet.</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-cream">
                      {cat.image_url ? (
                        <img src={cat.image_url} alt={cat.name} className="h-full w-full rounded-[8px] object-cover" />
                      ) : (
                        <PackageSearch size={16} className="text-black/20" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-text-dark">{cat.name}</td>
                  <td className="px-4 py-3 text-text-muted">{cat.display_order}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setPendingToggle(cat)}
                      className={`rounded-pill px-3 py-1 text-xs font-bold ${cat.is_active ? "bg-green-100 text-green-700" : "bg-black/5 text-text-muted"}`}
                    >
                      {cat.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(cat);
                        setFormOpen(true);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-red/10 hover:text-red"
                      aria-label={`Edit ${cat.name}`}
                    >
                      <Pencil size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CategoryForm
        open={formOpen}
        initial={editing}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(pendingToggle)}
        title={pendingToggle?.is_active ? "Deactivate category?" : "Activate category?"}
        description={
          pendingToggle?.is_active
            ? "This category and its products will be hidden from the public site."
            : "This category will become visible on the public site again."
        }
        confirmLabel={pendingToggle?.is_active ? "Deactivate" : "Activate"}
        onConfirm={handleToggleActive}
        onCancel={() => setPendingToggle(null)}
      />
    </AdminLayout>
  );
}
