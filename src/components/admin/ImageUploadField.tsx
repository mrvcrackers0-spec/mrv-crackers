import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string | null;
  onUpload: (file: File) => Promise<string>;
  onChange: (url: string | null) => void;
}

export function ImageUploadField({ label, value, onUpload, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await onUpload(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-text-dark">{label}</span>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-black/10 bg-cream">
          {value ? (
            <img src={value} alt="Preview" className="h-full w-full object-contain" />
          ) : (
            <ImagePlus className="h-6 w-6 text-black/20" aria-hidden />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex h-10 items-center gap-2 rounded-btn border border-black/15 bg-white px-4 text-sm font-semibold text-text-dark hover:bg-black/[0.03] disabled:opacity-50"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-red"
            >
              <X size={14} /> Remove
            </button>
          )}
          {error && <span className="text-xs font-semibold text-red">{error}</span>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
