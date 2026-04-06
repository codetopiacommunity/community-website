"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import type { ImpactStory } from "@/types";

const defaultForm = {
  title: "",
  impact: "",
  date: "",
  location: "",
  link: "",
  galleryLink: "",
};

export function ImpactFormModal({
  isOpen,
  onClose,
  editingStory,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  editingStory: ImpactStory | null;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState(defaultForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingStory) {
        setForm({
          title: editingStory.title,
          impact: editingStory.impact,
          date: editingStory.date,
          location: editingStory.location,
          link: editingStory.link || "",
          galleryLink: editingStory.galleryLink || "",
        });
        setImagePreview(editingStory.imageUrl);
        setLogoPreview(editingStory.logoUrl);
      } else {
        setForm(defaultForm);
        setImagePreview(null);
        setLogoPreview(null);
      }
    }
  }, [isOpen, editingStory]);

  const set =
    (key: keyof typeof defaultForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imagePreview) {
      toast.error("Please upload an image");
      return;
    }
    if (!logoPreview) {
      toast.error("Please upload a logo");
      return;
    }
    setIsSubmitting(true);
    try {
      const url = editingStory
        ? `/api/admin/impact/${editingStory.id}`
        : "/api/admin/impact";
      const method = editingStory ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl: imagePreview,
          logoUrl: logoPreview,
        }),
      });
      if (res.ok) {
        toast.success(
          editingStory ? "Impact story updated" : "Impact story added",
        );
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        toast.error(err.error || "Operation failed");
      }
    } catch {
      toast.error("An error occurred");
    }
    setIsSubmitting(false);
  };

  const inputCls =
    "rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono";
  const labelCls =
    "text-[10px] uppercase text-grey-500 font-bold tracking-widest";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <DialogHeader className="px-8 py-8 border-b border-grey-50 bg-white">
          <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans">
            {editingStory ? "Edit Story" : "New Impact Story"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] font-mono">
            {editingStory
              ? "Update the impact story details"
              : "Add a new community impact story"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-5 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className={labelCls}>
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.title}
                onChange={set("title")}
                required
                className={inputCls}
                placeholder="e.g. Django Girls Koforidua"
              />
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>
                Impact Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={form.impact}
                onChange={set("impact")}
                required
                className="rounded-xl min-h-[100px] border border-grey-100 bg-grey-50/50 p-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
                placeholder="Describe the community impact..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className={labelCls}>
                  Date <span className="text-red-500">*</span>
                </Label>
                <input
                  type="date"
                  value={form.date}
                  onChange={set("date")}
                  required
                  className={`${inputCls} w-full cursor-pointer`}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelCls}>
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={form.location}
                  onChange={set("location")}
                  required
                  className={inputCls}
                  placeholder="e.g. Koforidua Library"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>
                Event Image <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="h-14 w-20 rounded-xl overflow-hidden border border-grey-100 flex-shrink-0 relative bg-grey-50">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setImagePreview)}
                  className="flex-1 rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 py-2.5 text-xs font-medium text-black focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono file:bg-transparent file:border-0 file:text-xs file:font-medium file:text-grey-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>
                Organisation Logo <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-4">
                {logoPreview && (
                  <div className="h-11 w-11 rounded-xl overflow-hidden border border-grey-100 flex-shrink-0 relative bg-grey-50">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setLogoPreview)}
                  className="flex-1 rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 py-2.5 text-xs font-medium text-black focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono file:bg-transparent file:border-0 file:text-xs file:font-medium file:text-grey-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>Video Link (optional)</Label>
              <Input
                value={form.link}
                onChange={set("link")}
                className={inputCls}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>Gallery Link (optional)</Label>
              <Input
                value={form.galleryLink}
                onChange={set("galleryLink")}
                className={inputCls}
                placeholder="https://photos.google.com/..."
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-grey-50/30 border-t-2 border-grey-100 flex items-center justify-end gap-4 font-mono">
            <Button
              variant="ghost"
              onClick={onClose}
              type="button"
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  PROCESSING
                </>
              ) : editingStory ? (
                "SAVE CHANGES"
              ) : (
                "ADD STORY"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
