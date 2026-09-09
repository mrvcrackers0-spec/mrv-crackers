import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, PackageSearch, Star } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ProductForm, type ProductFormValues } from "../../components/admin/ProductForm";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  fetchAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/products";
import { fetchAllCategoriesAdmin } from "../../services/categories";
import { isSupabaseConfigured } from "../../lib/supabase";
import { formatCurrency } from "../../lib/utils";
import type { Category, Product } from "../../types/database";

type StatusFilter = "all" | "active" | "inactive";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);

  async function load() {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [productData, categoryData] = await Promise.all([fetchAllProductsAdmin(), fetchAllCategoriesAdmin()]);
    setProducts(productData);
    setCategories(categoryData);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query)) return false;
      if (categoryFilter !== "all" && p.category_id !== categoryFilter) return false;
      if (statusFilter === "active" && !p.is_active) return false;
      if (statusFilter === "inactive" && p.is_active) return false;
      if (featuredOnly && !p.is_featured) return false;
      return true;
    });
  }, [products, search, categoryFilter, statusFilter, featuredOnly]);

  function categoryName(id: string) {
    return categories.find((c) => c.id === id)?.name ?? "—";
  }

  async function handleSave(values: ProductFormValues) {
    if (editing) {
      await updateProduct(editing.id, values);
    } else {
      await createProduct(values);
    }
    await load();
  }

  async function handleToggleActive(product: Product) {
    await updateProduct(product.id, { is_active: !product.is_active });
    await load();
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    await deleteProduct(pendingDelete.id);
    setPendingDelete(null);
    await load();
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-text-dark">Products</h1>
        <Button
          size="sm"
          icon={<Plus size={16} />}
          disabled={!isSupabaseConfigured || categories.length === 0}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-[12px] border border-gold/30 bg-gold/10 p-4 text-sm font-semibold text-gold-dark">
          Supabase is not connected yet. Product management requires a live project.
        </div>
      )}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="sm:w-64">
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-11 rounded-btn border border-black/10 bg-white px-3 text-sm font-medium text-text-dark"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="h-11 rounded-btn border border-black/10 bg-white px-3 text-sm font-medium text-text-dark"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <label className="flex items-center gap-2 text-sm font-semibold text-text-dark">
          <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="h-4 w-4 accent-red" />
          Featured only
        </label>
      </div>

      <div className="overflow-x-auto rounded-card border border-black/[0.06] bg-white shadow-soft">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-black/[0.03] text-xs font-bold uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Selling Price</th>
              <th className="px-4 py-3">Original Price</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.06]">
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-text-muted">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-text-muted">No products found.</td></tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-cream">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-full w-full rounded-[8px] object-contain" />
                      ) : (
                        <PackageSearch size={16} className="text-black/20" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-text-dark">{product.name}</td>
                  <td className="px-4 py-3 text-text-muted">{categoryName(product.category_id)}</td>
                  <td className="px-4 py-3 font-semibold text-red">{formatCurrency(product.selling_price)}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {product.original_price ? formatCurrency(product.original_price) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {product.is_featured && <Star size={16} className="fill-gold text-gold" />}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(product)}
                      className={`rounded-pill px-3 py-1 text-xs font-bold ${product.is_active ? "bg-green-100 text-green-700" : "bg-black/5 text-text-muted"}`}
                    >
                      {product.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(product);
                          setFormOpen(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-red/10 hover:text-red"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-red/10 hover:text-red"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductForm
        open={formOpen}
        initial={editing}
        categories={categories}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this product?"
        description={`"${pendingDelete?.name}" will be permanently removed. Consider deactivating instead if you might need it later.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
