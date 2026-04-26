"use client";

import { ImageIcon, Loader2, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  albumId: number;
  createdAt: string;
}

interface PendingUpload {
  file: File;
  base64: string;
  alt: string;
}

interface GalleryPhotoManagerProps {
  albumId: number;
  initialPhotos: GalleryPhoto[];
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function GalleryPhotoManager({
  albumId,
  initialPhotos,
}: GalleryPhotoManagerProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [pending, setPending] = useState<PendingUpload | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      const base64 = await fileToBase64(file);
      setPending({ file, base64, alt: "" });
    } catch {
      setError("Failed to read the selected file.");
    }
    // Reset input so the same file can be re-selected if needed
    e.target.value = "";
  }

  function cancelPending() {
    setPending(null);
    setError(null);
  }

  async function handleUpload() {
    if (!pending) return;
    if (!pending.alt.trim()) {
      setError("Alt text is required before uploading.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/albums/${albumId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: pending.base64, alt: pending.alt.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Upload failed");
      }
      const newPhoto: GalleryPhoto = await res.json();
      setPhotos((prev) => [...prev, newPhoto]);
      setPending(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(photoId: number) {
    setDeletingId(photoId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/photos/${photoId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Delete failed");
      }
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-black font-mono">
          Photos
          <span className="ml-2 text-grey-400 font-bold">
            ({photos.length})
          </span>
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={!!pending || uploading}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-grey-200 rounded-none h-9 px-4 hover:border-black transition-all"
        >
          <Upload className="h-3.5 w-3.5" />
          Add Photo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Pending upload — alt text prompt */}
      {pending && (
        <div className="border border-black rounded-none p-4 bg-grey-50 space-y-3">
          <div className="flex items-start gap-3">
            <div className="relative h-16 w-20 rounded-none overflow-hidden border border-grey-200 flex-shrink-0 bg-white">
              <Image
                src={pending.base64}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-grey-500 font-mono">
                {pending.file.name}
              </p>
              <Input
                type="text"
                placeholder="Enter alt text for this photo..."
                value={pending.alt}
                onChange={(e) =>
                  setPending((prev) =>
                    prev ? { ...prev, alt: e.target.value } : prev,
                  )
                }
                className="text-xs h-9 border border-grey-200 rounded-none focus:border-black font-mono"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={cancelPending}
              className="text-grey-400 hover:text-black transition-colors mt-0.5"
              aria-label="Cancel upload"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={cancelPending}
              disabled={uploading}
              className="text-xs font-bold uppercase tracking-widest h-9 px-4 rounded-none border border-grey-200 hover:border-black transition-all"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleUpload}
              disabled={uploading || !pending.alt.trim()}
              className="text-xs font-black uppercase tracking-widest h-9 px-4 rounded-none bg-black text-white hover:bg-grey-800 transition-all flex items-center gap-2"
            >
              {uploading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Upload
            </Button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs font-bold text-red-500 font-mono bg-red-50 border border-red-200 rounded-none px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Thumbnail grid */}
      {photos.length === 0 && !pending ? (
        <div className="border border-dashed border-grey-200 rounded-none py-10 flex flex-col items-center justify-center gap-2 text-grey-400">
          <ImageIcon className="h-8 w-8" />
          <p className="text-xs font-bold uppercase tracking-widest font-mono">
            No photos yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square">
              <div className="relative h-full w-full rounded-none overflow-hidden border border-grey-100 bg-grey-50">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleDelete(photo.id)}
                disabled={deletingId === photo.id}
                className="absolute top-1.5 right-1.5 h-7 w-7 rounded-none bg-white border border-grey-200 flex items-center justify-center text-grey-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                aria-label={`Delete photo: ${photo.alt}`}
              >
                {deletingId === photo.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
              <p className="sr-only">{photo.alt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
