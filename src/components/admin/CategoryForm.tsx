import { useEffect, useState } from "react";
import type { Category } from "../../types/database";
import { Modal } from "../ui/Modal";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { ImageUploadField } from "./ImageUploadField";
import { uploadCategoryImage } from "../../services/categories";

export interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

interface CategoryFormProps {
  open: boolean;
  initial: Category | null;
  onClose: () => void;
  onSave: (values: CategoryFormValues) => Promise<void>;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function valuesFrom(initial: Category | null): CategoryFormValues {
  return {
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    image_url: initial?.image_url ?? null,
    display_order: initial?.display_order ?? 0,
    is_active: initial?.is_active ?? true,
  };
}

export function CategoryForm({ open, initial, onClose, onSave }: CategoryFormProps) {
  const [values, setValues] = useState<CategoryFormValues>(() => valuesFrom(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValues(valuesFrom(initial));
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  if (!open) return null;

  async function handleSubmit() {
    if (!values.name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave({ ...values, slug: values.slug || slugify(values.name) });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} title={initial ? "Edit Category" : "Add Category"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Category Name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        <Textarea
          label="Description"
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
        />
        <ImageUploadField
          label="Category Image"
          value={values.image_url}
          onUpload={uploadCategoryImage}
          onChange={(url) => setValues((v) => ({ ...v, image_url: url }))}
        />
        <Input
          label="Display Order"
          type="number"
          value={values.display_order}
          onChange={(e) => setValues((v) => ({ ...v, display_order: Number(e.target.value) || 0 }))}
        />
        <label className="flex items-center gap-2.5 text-sm font-semibold text-text-dark">
          <input
            type="checkbox"
            checked={values.is_active}
            onChange={(e) => setValues((v) => ({ ...v, is_active: e.target.checked }))}
            className="h-4 w-4 accent-red"
          />
          Active
        </label>

        {error && <p className="text-sm font-semibold text-red">{error}</p>}

        <div className="mt-2 flex justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button size="sm" onClick={handleSubmit} disabled={saving} type="button">
            {saving ? "Saving..." : "Save Category"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
