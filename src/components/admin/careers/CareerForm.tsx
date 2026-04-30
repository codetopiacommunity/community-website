"use client";

import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Career } from "@/lib/careers";
import { BulletListEditor } from "./BulletListEditor";
import { EmploymentTypeCombobox } from "./EmploymentTypeCombobox";

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
const sectionCls = "bg-white border border-grey-100 rounded-2xl p-6 space-y-5";
const sectionHeadingCls =
  "text-[10px] font-mono uppercase tracking-widest text-grey-500 border-b border-grey-50 pb-3";

interface CareerFormProps {
  editingCareer?: Career | null;
}

export function CareerForm({ editingCareer }: CareerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
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
    }
  }, [editingCareer]);

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
    if (!formData.aboutRole.trim()) {
      toast.error("About the Role is required");
      return;
    }
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
      router.push("/admin/careers");
    } catch {
      toast.error("Failed to save career opportunity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-2 text-grey-400 hover:text-black font-mono text-[10px] uppercase tracking-widest transition-colors group mb-4"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            {editingCareer ? (
              <>
                Edit <span className="text-grey-400">Opportunity</span>
              </>
            ) : (
              <>
                Post <span className="text-grey-400">Opportunity</span>
              </>
            )}
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
            {editingCareer
              ? "Update the details for this role"
              : "Fill in the details for the internship or job offer"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>Basic Info</h2>
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
            </div>

            {/* About the Role */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>About the Role</h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                A short summary of what this role is and its purpose (2–4
                sentences)
              </p>
              <Textarea
                required
                placeholder="e.g. We're looking for a passionate frontend developer to help build and maintain our community platform..."
                value={formData.aboutRole}
                onChange={(e) =>
                  setFormData({ ...formData, aboutRole: e.target.value })
                }
                className="rounded-xl border border-grey-100 bg-grey-50/50 min-h-[100px] px-4 py-3 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
              />
            </div>

            {/* Responsibilities */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>Responsibilities</h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                What will they actually do day-to-day?
              </p>
              <BulletListEditor
                items={formData.responsibilities}
                onChange={(items) =>
                  setFormData({ ...formData, responsibilities: items })
                }
                placeholder="e.g. Build and maintain React components..."
              />
            </div>

            {/* Requirements / Skills */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>Requirements / Skills</h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                Short skill tags shown on the listing page (e.g. React, Python)
              </p>
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
                <Button
                  type="button"
                  onClick={addRequirement}
                  className="h-11 w-11 bg-black text-white rounded-xl flex items-center justify-center hover:bg-grey-800 shadow-none shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.requirements.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-grey-50/30 rounded-xl border border-dashed border-grey-200 min-h-[48px]">
                  {formData.requirements.map((req, idx) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: ordered by position
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
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>
                Nice to Have{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                Bonus skills or experience that would be a plus
              </p>
              <BulletListEditor
                items={formData.niceToHave}
                onChange={(items) =>
                  setFormData({ ...formData, niceToHave: items })
                }
                placeholder="e.g. Experience with GraphQL..."
              />
            </div>

            {/* What We Offer */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>
                What We Offer{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                Perks, benefits, learning opportunities
              </p>
              <BulletListEditor
                items={formData.whatWeOffer}
                onChange={(items) =>
                  setFormData({ ...formData, whatWeOffer: items })
                }
                placeholder="e.g. Flexible remote work, mentorship..."
              />
            </div>

            {/* Duration */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>
                Duration{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                How long is this role? e.g. 3 months, 6 months, Ongoing
              </p>
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
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>
                How to Apply{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                Any extra instructions beyond the application link
              </p>
              <Textarea
                placeholder="e.g. Send your CV and a short cover note to careers@codetopia.dev..."
                value={formData.howToApply}
                onChange={(e) =>
                  setFormData({ ...formData, howToApply: e.target.value })
                }
                className="rounded-xl border border-grey-100 bg-grey-50/50 min-h-[80px] px-4 py-3 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
              />
            </div>
          </div>

          {/* Right column — sidebar settings */}
          <div className="space-y-6">
            <div className="bg-white border border-grey-100 rounded-2xl p-6 space-y-5 sticky top-24">
              <h2 className={sectionHeadingCls}>Settings</h2>

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

              <div className="flex items-center justify-between p-4 bg-grey-50/50 rounded-xl border border-grey-100">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold text-black uppercase tracking-tight font-sans">
                    Featured
                  </Label>
                  <p className="text-[9px] text-grey-400 font-mono uppercase tracking-widest">
                    Pin to top of listings
                  </p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(val) =>
                    setFormData({ ...formData, isFeatured: val })
                  }
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black text-white text-[10px] uppercase h-12 rounded-xl hover:bg-grey-900 font-bold tracking-widest shadow-none flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      SAVING...
                    </>
                  ) : editingCareer ? (
                    "SAVE CHANGES"
                  ) : (
                    "POST OPPORTUNITY"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/admin/careers")}
                  disabled={loading}
                  className="w-full h-11 rounded-xl text-[10px] uppercase font-mono tracking-widest hover:bg-grey-50 text-grey-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
