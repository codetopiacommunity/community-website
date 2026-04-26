"use client";

import {
  ArrowLeft,
  CheckCircle2,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AlbumPhotosPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const albumId = Number(id);

  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch album info for the title
    fetch(`/api/admin/gallery/albums/${albumId}`)
      .then((r) => r.json())
      .then((data) => setAlbumTitle(data?.title ?? "Album"))
      .catch(() => {});

    // Fetch photos
    setLoadingPhotos(true);
    fetch(`/api/admin/gallery/albums/${albumId}/photos`)
      .then((r) => r.json())
      .then((data) => setPhotos(Array.isArray(data) ? data : []))
      .catch(() => setPhotos([]))
      .finally(() => setLoadingPhotos(false));
  }, [albumId]);

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

  function removeFromQueue(itemId: string) {
    setQueue((prev) => prev.filter((item) => item.id !== itemId));
  }

  function updateAlt(itemId: string, alt: string) {
    setQueue((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, alt } : item)),
    );
  }

  async function uploadAll() {
    const pending = queue.filter((i) => i.status === "pending");
    if (pending.length === 0) return;
    setIsUploading(true);

    for (const item of pending) {
      setQueue((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "uploading" } : i)),
      );
      try {
        const res = await fetch(`/api/admin/gallery/albums/${albumId}/photos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            src: item.base64,
            alt: item.alt.trim() || item.file.name,
          }),
        });
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
    toast.success("Photos uploaded");
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
        toast.success("Photo deleted");
      }
    } finally {
      setDeletingId(null);
    }
  }

  const pendingCount = queue.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/gallery")}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-grey-400 hover:text-black transition-colors font-mono mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Gallery
          </button>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            {albumTitle || "Album"}{" "}
            <span className="text-grey-400">Photos</span>
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
            {photos.length} photo{photos.length !== 1 ? "s" : ""} ·{" "}
            {pendingCount} queued
          </p>
        </div>
      </div>

      {/* Drop zone */}
      <div className="border border-grey-100 rounded-none p-6 bg-white space-y-6">
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
          className={`relative border-2 border-dashed rounded-none p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 select-none ${
            dragOver
              ? "border-black bg-grey-50 scale-[1.01]"
              : "border-grey-200 hover:border-black hover:bg-grey-50/50"
          }`}
        >
          <div
            className={`p-4 rounded-none transition-colors ${dragOver ? "bg-black" : "bg-grey-100"}`}
          >
            <Upload
              className={`h-6 w-6 transition-colors ${dragOver ? "text-white" : "text-grey-400"}`}
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-black">
              {dragOver ? "Drop to add" : "Click or drag photos here"}
            </p>
            <p className="text-[10px] text-grey-400 font-medium mt-1 uppercase tracking-wider font-mono">
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
        {queue.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-black font-mono">
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
                  className="bg-black text-white text-[10px] uppercase px-6 h-9 rounded-none font-black tracking-widest shadow-none hover:bg-grey-900 flex items-center gap-2 transition-all active:scale-[0.98]"
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
                  className={`flex items-center gap-3 p-3 rounded-none border transition-colors ${
                    item.status === "done"
                      ? "border-green-200 bg-green-50"
                      : item.status === "error"
                        ? "border-red-200 bg-red-50"
                        : item.status === "uploading"
                          ? "border-black bg-grey-50"
                          : "border-grey-100 bg-white"
                  }`}
                >
                  <div className="relative h-12 w-16 rounded-none overflow-hidden border border-grey-100 shrink-0 bg-grey-50">
                    <Image
                      src={item.base64}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-grey-400 font-bold truncate mb-1 uppercase tracking-wider font-mono">
                      {item.file.name}
                    </p>
                    <Input
                      type="text"
                      value={item.alt}
                      onChange={(e) => updateAlt(item.id, e.target.value)}
                      placeholder="Alt text..."
                      disabled={item.status !== "pending"}
                      className="h-8 text-xs border border-grey-200 rounded-none focus:border-black font-mono bg-white disabled:opacity-60"
                    />
                    {item.status === "error" && (
                      <p className="text-[10px] text-red-500 font-bold mt-1 font-mono">
                        {item.errorMsg}
                      </p>
                    )}
                  </div>
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
                        className="h-7 w-7 rounded-none flex items-center justify-center text-grey-400 hover:text-black hover:bg-grey-100 transition-all"
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
      </div>

      {/* Existing photos */}
      <div className="border border-grey-100 rounded-none p-6 bg-white space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-black font-mono">
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
          <div className="border border-dashed border-grey-200 rounded-none py-14 flex flex-col items-center justify-center gap-3 text-grey-300">
            <ImageIcon className="h-10 w-10" />
            <p className="text-[10px] font-black uppercase tracking-widest font-mono">
              No photos yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group aspect-square">
                <div className="relative h-full w-full rounded-none overflow-hidden border border-grey-100 bg-grey-50">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-none" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-[9px] text-white font-bold uppercase tracking-wider truncate leading-tight drop-shadow-lg">
                    {photo.alt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(photo.id)}
                  disabled={deletingId === photo.id}
                  className="absolute top-2 right-2 h-7 w-7 rounded-none bg-white border border-grey-200 flex items-center justify-center text-grey-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
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
  );
}
