"use client";

import {
  CheckCircle2,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  albumId: number;
  createdAt: string;
}

type UploadStatus = "pending" | "uploading" | "done" | "error";

interface QueueItem {
  id: string;
  file: File;
  base64: string;
  alt: string;
  status: UploadStatus;
  errorMsg?: string;
}

interface GalleryPhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: { id: number; title: string } | null;
  onPhotosChanged?: () => void;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function GalleryPhotosModal({
  isOpen,
  onClose,
  album,
  onPhotosChanged,
}: GalleryPhotosModalProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing photos when modal opens
  useEffect(() => {
    if (!isOpen || !album) return;
    setQueue([]);
    setLoadingPhotos(true);
    fetch(`/api/admin/gallery/albums/${album.id}/photos`)
      .then((r) => r.json())
      .then((data) => setPhotos(Array.isArray(data) ? data : []))
      .catch(() => setPhotos([]))
      .finally(() => setLoadingPhotos(false));
  }, [isOpen, album]);

  const addFilesToQueue = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const items: QueueItem[] = await Promise.all(
      arr.map(async (file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        base64: await fileToBase64(file),
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        status: "pending" as UploadStatus,
      })),
    );
    setQueue((prev) => [...prev, ...items]);
  }, []);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) addFilesToQueue(e.target.files);
    e.target.value = "";
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files?.length) addFilesToQueue(e.dataTransfer.files);
    },
    [addFilesToQueue],
  );

  function removeFromQueue(id: string) {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  }

  function updateAlt(id: string, alt: string) {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, alt } : item)),
    );
  }

  async function uploadAll() {
    if (!album) return;
    const pending = queue.filter((i) => i.status === "pending");
    if (pending.length === 0) return;
    setIsUploading(true);

    for (const item of pending) {
      setQueue((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "uploading" } : i)),
      );
      try {
        const res = await fetch(
          `/api/admin/gallery/albums/${album.id}/photos`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              src: item.base64,
              alt: item.alt.trim() || item.file.name,
            }),
          },
        );
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Upload failed");
        }
        const newPhoto: GalleryPhoto = await res.json();
        setPhotos((prev) => [...prev, newPhoto]);
        setQueue((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "done" } : i)),
        );
      } catch (err) {
        setQueue((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: "error",
                  errorMsg:
                    err instanceof Error ? err.message : "Upload failed",
                }
              : i,
          ),
        );
      }
    }

    setIsUploading(false);
    onPhotosChanged?.();
    // Clear done items after a short delay
    setTimeout(() => {
      setQueue((prev) => prev.filter((i) => i.status !== "done"));
    }, 1500);
  }

  async function handleDelete(photoId: number) {
    setDeletingId(photoId);
    try {
      const res = await fetch(`/api/admin/gallery/photos/${photoId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        onPhotosChanged?.();
      }
    } finally {
      setDeletingId(null);
    }
  }

  const pendingCount = queue.filter((i) => i.status === "pending").length;
  const hasQueue = queue.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <DialogHeader className="px-8 py-7 border-b border-grey-100 bg-white shrink-0">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans leading-none">
              {album?.title ?? "Photos"}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] flex items-center gap-3 font-mono">
              <span className="px-2 py-1 bg-black rounded-lg text-white font-mono leading-none tracking-normal">
                PHOTOS
              </span>
              {photos.length} UPLOADED · {pendingCount} QUEUED
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          <div className="p-8 space-y-8 font-mono">
            {/* Drop zone */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: drag-and-drop zone with click fallback */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: drag-and-drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 select-none ${
                dragOver
                  ? "border-black bg-grey-50 scale-[1.01]"
                  : "border-grey-200 hover:border-black hover:bg-grey-50/50"
              }`}
            >
              <div
                className={`p-4 rounded-2xl transition-colors ${dragOver ? "bg-black" : "bg-grey-100"}`}
              >
                <Upload
                  className={`h-6 w-6 transition-colors ${dragOver ? "text-white" : "text-grey-400"}`}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-widest text-black">
                  {dragOver ? "Drop to add" : "Click or drag photos here"}
                </p>
                <p className="text-[10px] text-grey-400 font-medium mt-1 uppercase tracking-wider">
                  JPG, PNG, WEBP · Multiple files supported
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileInput}
              />
            </div>

            {/* Upload queue */}
            {hasQueue && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black">
                    Upload Queue
                    <span className="ml-2 text-grey-400 font-bold">
                      ({queue.length})
                    </span>
                  </p>
                  {pendingCount > 0 && (
                    <Button
                      type="button"
                      onClick={uploadAll}
                      disabled={isUploading}
                      className="bg-black text-white text-[10px] uppercase px-6 h-9 rounded-xl font-black tracking-widest shadow-none hover:bg-grey-900 flex items-center gap-2 transition-all active:scale-[0.98]"
                    >
                      {isUploading && (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      )}
                      Upload {pendingCount} Photo{pendingCount !== 1 ? "s" : ""}
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                        item.status === "done"
                          ? "border-green-200 bg-green-50"
                          : item.status === "error"
                            ? "border-red-200 bg-red-50"
                            : item.status === "uploading"
                              ? "border-black bg-grey-50"
                              : "border-grey-100 bg-white"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-grey-100 shrink-0 bg-grey-50">
                        <Image
                          src={item.base64}
                          alt="preview"
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Alt input */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-grey-400 font-bold truncate mb-1 uppercase tracking-wider">
                          {item.file.name}
                        </p>
                        <Input
                          type="text"
                          value={item.alt}
                          onChange={(e) => updateAlt(item.id, e.target.value)}
                          placeholder="Alt text..."
                          disabled={item.status !== "pending"}
                          className="h-8 text-xs border border-grey-200 rounded-lg focus:border-black font-mono bg-white disabled:opacity-60"
                        />
                        {item.status === "error" && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">
                            {item.errorMsg}
                          </p>
                        )}
                      </div>

                      {/* Status icon */}
                      <div className="shrink-0">
                        {item.status === "uploading" && (
                          <Loader2 className="h-4 w-4 animate-spin text-black" />
                        )}
                        {item.status === "done" && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                        {item.status === "error" && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        {item.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => removeFromQueue(item.id)}
                            className="h-7 w-7 rounded-lg flex items-center justify-center text-grey-400 hover:text-black hover:bg-grey-100 transition-all"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing photos */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-black">
                Album Photos
                <span className="ml-2 text-grey-400 font-bold">
                  ({photos.length})
                </span>
              </p>

              {loadingPhotos ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-black" />
                </div>
              ) : photos.length === 0 ? (
                <div className="border border-dashed border-grey-200 rounded-2xl py-14 flex flex-col items-center justify-center gap-3 text-grey-300">
                  <ImageIcon className="h-10 w-10" />
                  <p className="text-[10px] font-black uppercase tracking-widest font-mono">
                    No photos yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group aspect-square"
                    >
                      <div className="relative h-full w-full rounded-xl overflow-hidden border border-grey-100 bg-grey-50">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-xl" />
                      </div>
                      {/* Alt text tooltip */}
                      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="text-[9px] text-white font-bold uppercase tracking-wider truncate leading-tight drop-shadow-lg">
                          {photo.alt}
                        </p>
                      </div>
                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(photo.id)}
                        disabled={deletingId === photo.id}
                        className="absolute top-2 right-2 h-7 w-7 rounded-lg bg-white border border-grey-200 flex items-center justify-center text-grey-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                        aria-label={`Delete ${photo.alt}`}
                      >
                        {deletingId === photo.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-grey-50/30 border-t border-grey-100 flex items-center justify-between shrink-0 font-mono">
          <p className="text-[10px] text-grey-400 font-bold uppercase tracking-widest">
            {photos.length} photo{photos.length !== 1 ? "s" : ""} in album
          </p>
          <Button
            type="button"
            onClick={onClose}
            className="bg-black text-white text-[10px] uppercase px-8 h-10 rounded-xl font-black tracking-widest shadow-none hover:bg-grey-900 transition-all active:scale-[0.98]"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
