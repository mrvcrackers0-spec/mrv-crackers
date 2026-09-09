import { useEffect, useState } from "react";
import type { Category, Product } from "../../types/database";
import { Modal } from "../ui/Modal";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { ImageUploadField } from "./ImageUploadField";
import { uploadProductImage } from "../../services/products";

export interface ProductFormValues {
  name: string;
  slug: string;
  category_id: string;
  description: string;
  image_url: string | null;
  original_price: number | null;
  selling_price: number;
  discount_percentage: number | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
}

interface ProductFormProps {
  open: boolean;
  initial: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (values: ProductFormValues) => Promise<void>;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function valuesFrom(initial: Product | null, categories: Category[]): ProductFormValues {
  return {
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    category_id: initial?.category_id ?? categories[0]?.id ?? "",
    description: initial?.description ?? "",
    image_url: initial?.image_url ?? null,
    original_price: initial?.original_price ?? null,
    selling_price: initial?.selling_price ?? 0,
    discount_percentage: initial?.discount_percentage ?? null,
    is_featured: initial?.is_featured ?? false,
    display_order: initial?.display_order ?? 0,
    is_active: initial?.is_active ?? true,
  };
}

export function ProductForm({ open, initial, categories, onClose, onSave }: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(() => valuesFrom(initial, categories));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValues(valuesFrom(initial, categories));
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  if (!open) return null;

  function updatePrices(original: number | null, selling: number) {
    const discount = original && original > selling ? Math.round(((original - selling) / original) * 100) : null;
    setValues((v) => ({ ...v, original_price: original, selling_price: selling, discount_percentage: discount }));
  }

  async function handleSubmit() {
    if (!values.name.trim()) return setError("Product name is required.");
    if (!values.category_id) return setError("Please select a category.");
    if (!values.selling_price || values.selling_price <= 0) return setError("Selling price must be greater than 0.");

    setSaving(true);
    setError(null);
    try {
      await onSave({ ...values, slug: values.slug || slugify(values.name) });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} title={initial ? "Edit Product" : "Add Product"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input label="Product Name" value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-text-dark" htmlFor="category">Category</label>
          <select
            id="category"
            value={values.category_id}
            onChange={(e) => setValues((v) => ({ ...v, category_id: e.target.value }))}
            className="h-13 rounded-[12px] border border-black/10 bg-white px-4 text-[15px] text-text-dark focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
            style={{ height: "52px" }}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <Textarea label="Description" value={values.description} onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))} />

        <ImageUploadField
          label="Product Image"
          value={values.image_url}
          onUpload={uploadProductImage}
          onChange={(url) => setValues((v) => ({ ...v, image_url: url }))}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Original Price (₹)"
            type="number"
            value={values.original_price ?? ""}
            onChange={(e) => updatePrices(e.target.value ? Number(e.target.value) : null, values.selling_price)}
          />
          <Input
            label="Selling Price (₹)"
            type="number"
            value={values.selling_price}
            onChange={(e) => updatePrices(values.original_price, Number(e.target.value) || 0)}
          />
        </div>
        {values.discount_percentage ? (
          <p className="-mt-2 text-xs font-semibold text-red">Discount: {values.discount_percentage}% off</p>
        ) : null}

        <Input
          label="Display Order"
          type="number"
          value={values.display_order}
          onChange={(e) => setValues((v) => ({ ...v, display_order: Number(e.target.value) || 0 }))}
        />

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-text-dark">
            <input
              type="checkbox"
              checked={values.is_featured}
              onChange={(e) => setValues((v) => ({ ...v, is_featured: e.target.checked }))}
              className="h-4 w-4 accent-red"
            />
            Featured
          </label>
          <label className="flex items-center gap-2.5 text-sm font-semibold text-text-dark">
            <input
              type="checkbox"
              checked={values.is_active}
              onChange={(e) => setValues((v) => ({ ...v, is_active: e.target.checked }))}
              className="h-4 w-4 accent-red"
            />
            Active
          </label>
        </div>

        {error && <p className="text-sm font-semibold text-red">{error}</p>}

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button size="sm" onClick={handleSubmit} disabled={saving} type="button">
            {saving ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
