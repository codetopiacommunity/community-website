"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Career } from "@/lib/careers";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Internship", "Volunteer"];

const defaultForm = {
  title: "",
  company: "Codetopia",
  type: "",
  location: "",
  description: "",
  requirements: [] as string[],
  link: "",
  expiryDate: "",
  isFeatured: false,
  status: "open",
};

const inputCls =
  "rounded-none border border-zinc-200 bg-white h-11 px-4 text-xs font-medium text-zinc-900 placeholder:text-zinc-300 focus:border-zinc-900 transition-all outline-none ring-0 font-mono";
const labelCls =
  "text-[10px] uppercase text-zinc-500 font-bold tracking-widest";

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
        description: editingCareer.description,
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
    if (!formData.description.trim()) {
      toast.error("Description is required");
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
        body: JSON.stringify(formData),
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
    <div className="max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100 mb-10">
        <div>
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-mono text-[10px] uppercase tracking-widest transition-colors group mb-4"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            {editingCareer ? "Edit Opportunity" : "Post Opportunity"}
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            {editingCareer
              ? "Update the details for this role"
              : "Fill in the details for the internship or job offer"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Left column — main fields */}
          <div className="space-y-6">
            {/* Title + Company */}
            <div className="bg-white border border-zinc-200 rounded-none p-6 space-y-5">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border-b border-zinc-100 pb-3">
                Basic Info
              </h2>
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
                  <Select
                    required
                    value={formData.type}
                    onValueChange={(val) =>
                      setFormData({ ...formData, type: val })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-none border border-zinc-200 bg-zinc-50/50 text-xs font-mono text-black focus:border-black focus:bg-white transition-all">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-zinc-200 rounded-none shadow-xl">
                      {EMPLOYMENT_TYPES.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-xs font-mono text-black hover:bg-zinc-50 focus:bg-zinc-50 cursor-pointer"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

            {/* Description — MD editor */}
            <div className="bg-white border border-zinc-200 rounded-none p-6 space-y-4">
              <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Job Description
                </h2>
                <span className="text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
                  Markdown supported
                </span>
              </div>
              <div data-color-mode="light">
                <MDEditor
                  value={formData.description}
                  onChange={(v) =>
                    setFormData({ ...formData, description: v ?? "" })
                  }
                  height={420}
                  visibleDragbar={false}
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid #f3f4f6",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-zinc-200 rounded-none p-6 space-y-4">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border-b border-zinc-100 pb-3">
                Requirements / Skills Tags
              </h2>
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
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
                  className="h-11 w-11 bg-black text-white rounded-none flex items-center justify-center hover:bg-zinc-800 shadow-none shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.requirements.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-zinc-50/30 rounded-none border border-dashed border-zinc-200 min-h-[48px]">
                  {formData.requirements.map((req, idx) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: ordered by position
                      key={idx}
                      className="flex items-center gap-2 bg-white border border-zinc-200 px-3 py-1.5 rounded-none shadow-sm"
                    >
                      <span className="text-xs font-medium text-zinc-700 font-mono">
                        {req}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(idx)}
                        className="text-zinc-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column — sidebar settings */}
          <div className="space-y-6">
            {/* Publish / Settings */}
            <div className="bg-white border border-zinc-200 rounded-none p-6 space-y-5 sticky top-24">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border-b border-zinc-100 pb-3">
                Settings
              </h2>

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

              <div className="flex items-center justify-between p-4 bg-zinc-50/50 rounded-none border border-zinc-200">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold text-black uppercase tracking-tight font-sans">
                    Featured
                  </Label>
                  <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest">
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

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black text-white text-[10px] uppercase h-12 rounded-none hover:bg-zinc-900 font-bold tracking-widest shadow-none flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
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
                  className="w-full h-11 rounded-none text-[10px] uppercase font-mono tracking-widest hover:bg-zinc-50 text-zinc-500"
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
