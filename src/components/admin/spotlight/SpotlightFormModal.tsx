"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
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
import type { Spotlight, SpotlightLink } from "@/types";

const defaultForm = { name: "", role: "", contribution: "" };

export function SpotlightFormModal({
  isOpen,
  onClose,
  editing,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  editing: Spotlight | null;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState(defaultForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [links, setLinks] = useState<SpotlightLink[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editing) {
        setForm({ name: editing.name, role: editing.role, contribution: editing.contribution });
        setImagePreview(editing.imageUrl);
        setLinks(editing.links ?? []);
      } else {
        setForm(defaultForm);
        setImagePreview(null);
        setLinks([]);
      }
    }
  }, [isOpen, editing]);

  const set =
    (key: keyof typeof defaultForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addLink = () => setLinks((prev) => [...prev, { label: "", url: "" }]);
  const removeLink = (i: number) => setLinks((prev) => prev.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: keyof SpotlightLink, value: string) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imagePreview) { toast.error("Please upload an image"); return; }
    setIsSubmitting(true);
    try {
      const url = editing ? `/api/admin/spotlight/${editing.id}` : "/api/admin/spotlight";
      const method = editing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl: imagePreview, links }),
      });
      if (res.ok) {
        toast.success(editing ? "Spotlight updated" : "Spotlight added");
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

  const inputCls = "rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono";
  const labelCls = "text-[10px] uppercase text-grey-500 font-bold tracking-widest";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <DialogHeader className="px-8 py-8 border-b border-grey-50 bg-white">
          <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans">
            {editing ? "Edit Spotlight" : "New Spotlight"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] font-mono">
            {editing ? "Update spotlight details" : "Add a new person to spotlight"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-5 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className={labelCls}>Name <span className="text-red-500">*</span></Label>
              <Input value={form.name} onChange={set("name")} required className={inputCls} placeholder="e.g. Linus Torvalds" />
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>Role <span className="text-red-500">*</span></Label>
              <Input value={form.role} onChange={set("role")} required className={inputCls} placeholder="e.g. Open Source Architect" />
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>Contribution <span className="text-red-500">*</span></Label>
              <Textarea
                value={form.contribution}
                onChange={set("contribution")}
                required
                className="rounded-xl min-h-[90px] border border-grey-100 bg-grey-50/50 p-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
                placeholder="Describe their technical contribution..."
              />
            </div>

            <div className="space-y-2">
              <Label className={labelCls}>Photo <span className="text-red-500">*</span></Label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="h-14 w-14 rounded-xl overflow-hidden border border-grey-100 flex-shrink-0 relative bg-grey-50">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="flex-1 rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 py-2.5 text-xs font-medium text-black focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono file:bg-transparent file:border-0 file:text-xs file:font-medium file:text-grey-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className={labelCls}>Links (optional)</Label>
                <button type="button" onClick={addLink} className="text-[10px] font-mono uppercase tracking-widest text-black flex items-center gap-1 hover:opacity-70 transition-opacity">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
              {links.map((link, i) => (
                <div key={`link-${i}`} className="flex gap-2 items-center">
                  <Input
                    value={link.label}
                    onChange={(e) => updateLink(i, "label", e.target.value)}
                    placeholder="Label (e.g. GITHUB)"
                    className={`${inputCls} flex-1`}
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                    placeholder="https://..."
                    className={`${inputCls} flex-[2]`}
                  />
                  <button type="button" onClick={() => removeLink(i)} className="text-grey-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 py-6 bg-grey-50/30 border-t-2 border-grey-100 flex items-center justify-end gap-4 font-mono">
            <Button variant="ghost" onClick={onClose} type="button" className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest">
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit" className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none flex items-center gap-2">
              {isSubmitting ? <><Loader2 className="h-3 w-3 animate-spin" /> PROCESSING</> : editing ? "SAVE CHANGES" : "ADD SPOTLIGHT"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
