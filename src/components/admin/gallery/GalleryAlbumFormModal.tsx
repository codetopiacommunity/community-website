"use client";

import { ImageIcon, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GalleryAlbum } from "@/types";

const GALLERY_CATEGORIES = [
  "Events",
  "Workshops",
  "Meetups",
  "Hackathons",
  "Community",
  "Other",
];

interface GalleryAlbumFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAlbum: GalleryAlbum | null;
  onSuccess: () => void;
}

interface FormErrors {
  title?: string;
  date?: string;
  category?: string;
  coverImage?: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function GalleryAlbumFormModal({
  isOpen,
  onClose,
  editingAlbum,
  onSuccess,
}: GalleryAlbumFormModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // stored as YYYY-MM-DD for the date picker
  const [category, setCategory] = useState("");
  const [coverImageBase64, setCoverImageBase64] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (editingAlbum) {
        setTitle(editingAlbum.title);
        // Convert "Month YYYY" to YYYY-MM-DD for the date picker, fallback as-is
        const parsed = new Date(editingAlbum.date);
        if (!Number.isNaN(parsed.getTime())) {
          const y = parsed.getFullYear();
          const m = String(parsed.getMonth() + 1).padStart(2, "0");
          setDate(`${y}-${m}-01`);
        } else {
          setDate(editingAlbum.date);
        }
        setCategory(editingAlbum.category);
        setCoverImageBase64(null);
        setCoverImagePreview(editingAlbum.coverImage || null);
      } else {
        setTitle("");
        setDate("");
        setCategory("");
        setCoverImageBase64(null);
        setCoverImagePreview(null);
      }
      setErrors({});
      setSubmitError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, editingAlbum]);

  async function handleCoverImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setCoverImageBase64(base64);
      setCoverImagePreview(base64);
      setErrors((prev) => ({ ...prev, coverImage: undefined }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        coverImage: "Failed to read image file.",
      }));
    }
    e.target.value = "";
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!date.trim()) errs.date = "Date is required.";
    if (!category) errs.category = "Category is required.";
    if (!editingAlbum && !coverImageBase64)
      errs.coverImage = "Cover image is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    // Format YYYY-MM-DD from the date picker to "Month YYYY" for display
    let formattedDate = date.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    const body: Record<string, string | null> = {
      title: title.trim(),
      date: formattedDate,
      category,
    };

    if (coverImageBase64) {
      body.coverImage = coverImageBase64;
    } else if (!editingAlbum) {
      body.coverImage = null;
    }

    try {
      const url = editingAlbum
        ? `/api/admin/gallery/albums/${editingAlbum.id}`
        : "/api/admin/gallery/albums";
      const method = editingAlbum ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-8 py-8 border-b border-grey-50 bg-white sticky top-0 z-10">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans">
              {editingAlbum ? "Edit Album" : "New Album"}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] flex items-center justify-center sm:justify-start gap-3 font-mono">
              <span className="px-2 py-1 bg-black rounded-lg text-white font-mono leading-none tracking-normal">
                {editingAlbum ? "EDIT MODE" : "CREATE MODE"}
              </span>
              {editingAlbum ? "UPDATE ALBUM DETAILS" : "ALBUM METADATA"}
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-6 font-mono">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder="e.g. Hackathon 2024"
                className={`rounded-xl border bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:bg-white transition-all outline-none ring-0 font-mono ${errors.title ? "border-red-400 focus:border-red-500" : "border-grey-100 focus:border-black"}`}
              />
              {errors.title && (
                <p className="text-[10px] font-bold text-red-500 font-mono">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date)
                    setErrors((prev) => ({ ...prev, date: undefined }));
                }}
                className={`rounded-xl border bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:bg-white transition-all outline-none ring-0 font-mono [color-scheme:light] ${errors.date ? "border-red-400 focus:border-red-500" : "border-grey-100 focus:border-black"}`}
              />
              {errors.date && (
                <p className="text-[10px] font-bold text-red-500 font-mono">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={category}
                onValueChange={(val) => {
                  setCategory(val);
                  if (errors.category)
                    setErrors((prev) => ({ ...prev, category: undefined }));
                }}
              >
                <SelectTrigger
                  className={`rounded-xl border bg-grey-50/50 h-11 px-4 text-xs font-medium text-black focus:bg-white transition-all font-mono ${errors.category ? "border-red-400 focus:border-red-500" : "border-grey-100 focus:border-black"}`}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-black rounded-xl p-1 font-mono">
                  {GALLERY_CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-xs text-black focus:bg-black focus:text-white rounded-md"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-[10px] font-bold text-red-500 font-mono">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
                Cover Image{" "}
                {!editingAlbum && <span className="text-red-500">*</span>}
                {editingAlbum && (
                  <span className="ml-2 text-grey-400 normal-case tracking-normal font-medium">
                    (leave empty to keep current)
                  </span>
                )}
              </Label>
              <div className="flex items-center gap-4">
                {coverImagePreview && (
                  <div className="relative h-16 w-20 rounded-xl overflow-hidden border border-grey-100 flex-shrink-0 bg-grey-50">
                    <Image
                      src={coverImagePreview}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {!coverImagePreview && (
                  <div className="h-16 w-20 rounded-xl border border-dashed border-grey-200 flex items-center justify-center text-grey-300 flex-shrink-0 bg-grey-50">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest border rounded-xl h-11 px-4 hover:border-black transition-all ${errors.coverImage ? "border-red-400 text-red-500 hover:border-red-500" : "border-grey-200"}`}
                >
                  <Upload className="h-3.5 w-3.5" />
                  {coverImagePreview ? "Change Image" : "Upload Image"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
              </div>
              {errors.coverImage && (
                <p className="text-[10px] font-bold text-red-500 font-mono">
                  {errors.coverImage}
                </p>
              )}
            </div>

            {/* Submit error */}
            {submitError && (
              <p className="text-xs font-bold text-red-500 font-mono bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {submitError}
              </p>
            )}
          </div>

          {/* Footer actions */}
          <div className="px-8 py-6 bg-grey-50/30 border-t-2 border-grey-100 flex items-center justify-end gap-4 font-mono">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {editingAlbum ? "Save Changes" : "Create Album"}
            </Button>
          </div>
        </form>

        {/* Photo Manager removed — use the dedicated Photos modal per album */}
      </DialogContent>
    </Dialog>
  );
}
