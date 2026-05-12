"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Career } from "@/lib/careers";
import { BulletListEditor } from "./BulletListEditor";
import { EmploymentTypeCombobox } from "./EmploymentTypeCombobox";

interface CareersFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCareer: Career | null;
  onSuccess: () => void;
}

const defaultForm = {
  title: "",
  company: "Codetopia",
  type: "",
  location: "",
  aboutRole: "",
  responsibilities: [] as string[],
  niceToHave: [] as string[],
  whatWeOffer: [] as string[],
  howToApply: "",
  duration: "",
  requirements: [] as string[],
  link: "",
  expiryDate: "",
  isFeatured: false,
  status: "open",
};

const inputCls =
  "rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono";
const labelCls =
  "text-[10px] uppercase text-grey-500 font-bold tracking-widest";
const sectionLabelCls =
  "text-[10px] font-mono uppercase tracking-widest text-grey-500 font-bold pb-1";

export function CareersFormModal({
  isOpen,
  onClose,
  editingCareer,
  onSuccess,
}: CareersFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingCareer) {
        setFormData({
          title: editingCareer.title,
          company: editingCareer.company,
          type: editingCareer.type,
          location: editingCareer.location,
          aboutRole: editingCareer.aboutRole,
          responsibilities: editingCareer.responsibilities,
          niceToHave: editingCareer.niceToHave,
          whatWeOffer: editingCareer.whatWeOffer,
          howToApply: editingCareer.howToApply,
          duration: editingCareer.duration ?? "",
          requirements: editingCareer.requirements,
          link: editingCareer.link || "",
          expiryDate: new Date(editingCareer.expiryDate)
            .toISOString()
            .split("T")[0],
          isFeatured: editingCareer.isFeatured,
          status: editingCareer.status,
        });
      } else {
        setFormData(defaultForm);
      }
      setNewRequirement("");
    }
  }, [editingCareer, isOpen]);

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingCareer
        ? `/api/admin/careers/${editingCareer.id}`
        : "/api/admin/careers";
      const method = editingCareer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          duration: formData.duration.trim() || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Failed to save opportunity");
        return;
      }

      toast.success(
        editingCareer
          ? "Opportunity updated successfully"
          : "New opportunity posted successfully",
      );
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to save career opportunity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <DialogHeader className="px-8 py-8 border-b border-grey-50 bg-white">
          <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans">
            {editingCareer ? "Edit Opportunity" : "Post Opportunity"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] font-mono">
            {editingCareer
              ? "Update the details for this role"
              : "Fill in the details for the internship or job offer"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Title + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={labelCls}>
                  Position Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  placeholder="e.g. Frontend Intern"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelCls}>
                  Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  placeholder="e.g. Codetopia"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
            </div>

            {/* Type + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={labelCls}>
                  Employment Type <span className="text-red-500">*</span>
                </Label>
                <EmploymentTypeCombobox
                  required
                  value={formData.type}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelCls}>
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  placeholder="e.g. Remote, Accra, Ghana"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
            </div>

            {/* About the Role */}
            <div className="space-y-2">
              <Label className={labelCls}>
                About the Role <span className="text-red-500">*</span>
              </Label>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest">
                Short summary — what is this role and its purpose?
              </p>
              <Textarea
                required
                placeholder="e.g. We're looking for a passionate frontend developer..."
                value={formData.aboutRole}
                onChange={(e) =>
                  setFormData({ ...formData, aboutRole: e.target.value })
                }
                className="rounded-xl border border-grey-100 bg-grey-50/50 min-h-[80px] px-4 py-3 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono w-full"
              />
            </div>

            {/* Responsibilities */}
            <div className="space-y-3">
              <Label className={sectionLabelCls}>Responsibilities</Label>
              <BulletListEditor
                items={formData.responsibilities}
                onChange={(items) =>
                  setFormData({ ...formData, responsibilities: items })
                }
                placeholder="e.g. Build and maintain React components..."
              />
            </div>

            {/* Requirements / Skills */}
            <div className="space-y-3">
              <Label className={labelCls}>Requirements / Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill tag and press Enter..."
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRequirement();
                    }
                  }}
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="text-[10px] font-mono uppercase tracking-widest text-black flex items-center gap-1 hover:opacity-70 transition-opacity px-3"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
              {formData.requirements.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-grey-50/30 rounded-2xl border border-dashed border-grey-200">
                  {formData.requirements.map((req, idx) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: requirements are ordered by position
                      key={idx}
                      className="flex items-center gap-2 bg-white border border-grey-100 px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      <span className="text-xs font-medium text-grey-700 font-mono">
                        {req}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(idx)}
                        className="text-grey-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Nice to Have */}
            <div className="space-y-3">
              <Label className={sectionLabelCls}>
                Nice to Have{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </Label>
              <BulletListEditor
                items={formData.niceToHave}
                onChange={(items) =>
                  setFormData({ ...formData, niceToHave: items })
                }
                placeholder="e.g. Experience with GraphQL..."
              />
            </div>

            {/* What We Offer */}
            <div className="space-y-3">
              <Label className={sectionLabelCls}>
                What We Offer{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </Label>
              <BulletListEditor
                items={formData.whatWeOffer}
                onChange={(items) =>
                  setFormData({ ...formData, whatWeOffer: items })
                }
                placeholder="e.g. Flexible remote work, mentorship..."
              />
            </div>

            {/* Link + Expiry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={labelCls}>Application Link (Optional)</Label>
                <Input
                  placeholder="https://..."
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
              <div className="space-y-2">
                <Label className={labelCls}>
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label className={sectionLabelCls}>
                Duration{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                placeholder="e.g. 4 months, 6 months, Ongoing..."
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className={inputCls}
              />
            </div>

            {/* How to Apply */}
            <div className="space-y-2">
              <Label className={sectionLabelCls}>
                How to Apply{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                placeholder="e.g. Send your CV and a short cover note to careers@codetopia.dev..."
                value={formData.howToApply}
                onChange={(e) =>
                  setFormData({ ...formData, howToApply: e.target.value })
                }
                className="rounded-xl border border-grey-100 bg-grey-50/50 min-h-[70px] px-4 py-3 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono w-full"
              />
            </div>

            {/* Featured toggle */}
            <div className="flex items-center justify-between p-4 bg-grey-50/50 rounded-2xl border border-grey-100">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold text-black uppercase tracking-tight font-sans">
                  Featured Opportunity
                </Label>
                <p className="text-[10px] text-grey-500 font-mono uppercase tracking-widest">
                  Highlight this role at the top of the listings
                </p>
              </div>
              <Switch
                checked={formData.isFeatured}
                onCheckedChange={(val) =>
                  setFormData({ ...formData, isFeatured: val })
                }
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-grey-50/30 border-t-2 border-grey-100 flex items-center justify-end gap-4 font-mono">
            <Button
              variant="ghost"
              onClick={onClose}
              type="button"
              disabled={loading}
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-xl active:scale-[0.98] transition-all border border-black hover:bg-grey-900 font-bold tracking-widest shadow-none flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> PROCESSING
                </>
              ) : editingCareer ? (
                "SAVE CHANGES"
              ) : (
                "POST OPPORTUNITY"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
