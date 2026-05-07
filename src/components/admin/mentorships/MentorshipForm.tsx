"use client";

import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useFetchData } from "@/hooks/useFetchData";
import type { TeamMember } from "@/types";

const defaultForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  isOnline: true,
  location: "",
  capacity: "",
  applicationLink: "",
  imageUrl: "",
  coverImage: "",
  flyerImage: "",
  tags: [] as string[],
  status: "open",
  mentorIds: [] as number[],
};

export function MentorshipForm({
  editingMentorship,
}: {
  editingMentorship?: Record<string, unknown>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [previewImages, setPreviewImages] = useState<{
    coverImage?: string;
    flyerImage?: string;
  }>({});
  const [mentorSearch, setMentorSearch] = useState("");
  const [showMentorDropdown, setShowMentorDropdown] = useState(false);

  const { data: teamData } = useFetchData<TeamMember[]>("/api/admin/team", {
    errorMessage: "Failed to load team members",
  });

  useEffect(() => {
    if (editingMentorship) {
      setFormData({
        title: editingMentorship.title,
        description: editingMentorship.description,
        startDate: editingMentorship.startDate
          ? new Date(editingMentorship.startDate).toISOString().split("T")[0]
          : "",
        endDate: editingMentorship.endDate
          ? new Date(editingMentorship.endDate).toISOString().split("T")[0]
          : "",
        isOnline: editingMentorship.isOnline,
        location: editingMentorship.location || "",
        capacity: editingMentorship.capacity
          ? String(editingMentorship.capacity)
          : "",
        applicationLink: editingMentorship.applicationLink || "",
        imageUrl: editingMentorship.imageUrl || "",
        coverImage: editingMentorship.coverImage || "",
        flyerImage: editingMentorship.flyerImage || "",
        tags: editingMentorship.tags || [],
        status: editingMentorship.status || "open",
        mentorIds: (editingMentorship.mentors || []).map(
          (m: TeamMember) => m.id,
        ),
      });
      setPreviewImages({
        coverImage: editingMentorship.coverImage,
        flyerImage: editingMentorship.flyerImage,
      });
    }
  }, [editingMentorship]);

  const toggleMentor = (id: number) => {
    setFormData((prev) => {
      const has = prev.mentorIds.includes(id);
      return {
        ...prev,
        mentorIds: has
          ? prev.mentorIds.filter((m) => m !== id)
          : [...prev.mentorIds, id],
      };
    });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "flyerImage",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, [field]: base64 }));
        setPreviewImages((prev) => ({ ...prev, [field]: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: "coverImage" | "flyerImage") => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    setPreviewImages((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);
    try {
      const url = editingMentorship
        ? `/api/admin/mentorships/${editingMentorship.id}`
        : "/api/admin/mentorships";
      const method = editingMentorship ? "PUT" : "POST";

      const payload = {
        ...formData,
        capacity: formData.capacity ? Number(formData.capacity) : null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Failed to save mentorship");
        return;
      }

      toast.success(
        editingMentorship ? "Mentorship updated" : "Mentorship created",
      );
      router.push("/admin/mentorships");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save mentorship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/mentorships"
          className="text-xs text-grey-500 hover:text-grey-700 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Mentorships
        </Link>
        <h1 className="text-3xl font-bold text-black">
          {editingMentorship ? "Edit Mentorship" : "Create New Mentorship"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white border border-grey-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-black uppercase tracking-tight">
            Basic Information
          </h2>

          <div>
            <Label className="text-sm font-semibold text-black mb-2 block">
              Title *
            </Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Advanced React Patterns"
              className="border-grey-200 focus:border-black"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-black mb-2 block">
              Description *
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the mentorship program..."
              className="border-grey-200 focus:border-black min-h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-black mb-2 block">
                Status
              </Label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-grey-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="full">Full</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-black mb-2 block">
                Capacity
              </Label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g., 20"
                className="border-grey-200 focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Dates & Location */}
        <div className="bg-white border border-grey-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-black uppercase tracking-tight">
            Schedule & Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-black mb-2 block">
                Start Date
              </Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border-grey-200 focus:border-black"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-black mb-2 block">
                End Date
              </Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="border-grey-200 focus:border-black"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-grey-50 rounded-lg border border-grey-100">
            <div>
              <Label className="text-sm font-semibold text-black">
                Online Event
              </Label>
              <p className="text-xs text-grey-500 mt-1">
                Toggle if this is an online mentorship
              </p>
            </div>
            <Switch
              checked={formData.isOnline}
              onCheckedChange={(val) =>
                setFormData({ ...formData, isOnline: val })
              }
            />
          </div>

          {!formData.isOnline && (
            <div>
              <Label className="text-sm font-semibold text-black mb-2 block">
                Location
              </Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., San Francisco, CA"
                className="border-grey-200 focus:border-black"
              />
            </div>
          )}
        </div>

        {/* Images */}
        <div className="bg-white border border-grey-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-black uppercase tracking-tight">
            Images
          </h2>

          {/* Cover Image */}
          <div>
            <Label className="text-sm font-semibold text-black mb-3 block">
              Cover Image
            </Label>
            <div className="space-y-3">
              {previewImages.coverImage ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-grey-200">
                  <Image
                    src={previewImages.coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("coverImage")}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-grey-300 rounded-lg cursor-pointer hover:border-grey-400 transition-colors bg-grey-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-grey-400 mb-2" />
                    <p className="text-sm text-grey-600">
                      Click to upload cover image
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "coverImage")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Flyer Image */}
          <div>
            <Label className="text-sm font-semibold text-black mb-3 block">
              Flyer Image
            </Label>
            <div className="space-y-3">
              {previewImages.flyerImage ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-grey-200">
                  <Image
                    src={previewImages.flyerImage}
                    alt="Flyer preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("flyerImage")}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-grey-300 rounded-lg cursor-pointer hover:border-grey-400 transition-colors bg-grey-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-grey-400 mb-2" />
                    <p className="text-sm text-grey-600">
                      Click to upload flyer image
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "flyerImage")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Links & Tags */}
        <div className="bg-white border border-grey-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-black uppercase tracking-tight">
            Links & Tags
          </h2>

          <div>
            <Label className="text-sm font-semibold text-black mb-2 block">
              Application Link
            </Label>
            <Input
              type="url"
              value={formData.applicationLink}
              onChange={(e) =>
                setFormData({ ...formData, applicationLink: e.target.value })
              }
              placeholder="https://example.com/apply"
              className="border-grey-200 focus:border-black"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-black mb-2 block">
              Tags
            </Label>
            <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-grey-200 bg-grey-50 focus-within:border-black focus-within:bg-white transition-all min-h-[44px]">
              {formData.tags.map((tag) => (
                <span
                  key={`tag-${tag}`}
                  className="inline-flex items-center gap-1.5 bg-black text-white text-xs px-2.5 py-1 rounded-md font-medium animate-in zoom-in duration-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        tags: formData.tags.filter((t) => t !== tag),
                      })
                    }
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const newTag = (e.target as HTMLInputElement).value.trim();
                    if (newTag && !formData.tags.includes(newTag)) {
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, newTag],
                      });
                      (e.target as HTMLInputElement).value = "";
                    }
                  } else if (
                    e.key === "Backspace" &&
                    !(e.target as HTMLInputElement).value &&
                    formData.tags.length > 0
                  ) {
                    e.preventDefault();
                    setFormData({
                      ...formData,
                      tags: formData.tags.slice(0, -1),
                    });
                  }
                }}
                onChange={(e) => {
                  if (e.target.value.includes(",")) {
                    const newTags = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    const newUnique = newTags.filter(
                      (t) => !formData.tags.includes(t),
                    );
                    if (newUnique.length > 0) {
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, ...newUnique],
                      });
                    }
                    e.target.value = "";
                  }
                }}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-black placeholder:text-grey-400 py-1 px-2"
                placeholder={
                  formData.tags.length === 0
                    ? "Type a tag & press Enter or Comma"
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Mentors */}
        <div className="bg-white border border-grey-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-black uppercase tracking-tight">
            Mentors
          </h2>

          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Input
                type="text"
                value={mentorSearch}
                onChange={(e) => {
                  setMentorSearch(e.target.value);
                  setShowMentorDropdown(true);
                }}
                onFocus={() => setShowMentorDropdown(true)}
                placeholder="Search and add mentors..."
                className="border-grey-200 focus:border-black"
              />

              {/* Autocomplete Dropdown */}
              {showMentorDropdown && mentorSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-grey-200 z-10 max-h-64 overflow-y-auto">
                  {teamData
                    ?.filter(
                      (m) =>
                        !formData.mentorIds.includes(m.id) &&
                        (m.name
                          .toLowerCase()
                          .includes(mentorSearch.toLowerCase()) ||
                          m.role
                            .toLowerCase()
                            .includes(mentorSearch.toLowerCase())),
                    )
                    .map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            mentorIds: [...prev.mentorIds, m.id],
                          }));
                          setMentorSearch("");
                          setShowMentorDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-grey-50 transition-colors border-b border-grey-100 last:border-b-0 flex items-center gap-3"
                      >
                        {m.imageUrl && (
                          <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={m.imageUrl}
                              alt={m.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-black truncate">
                            {m.name}
                          </p>
                          <p className="text-xs text-grey-500 truncate">
                            {m.role}
                          </p>
                        </div>
                      </button>
                    ))}
                  {teamData?.filter(
                    (m) =>
                      !formData.mentorIds.includes(m.id) &&
                      (m.name
                        .toLowerCase()
                        .includes(mentorSearch.toLowerCase()) ||
                        m.role
                          .toLowerCase()
                          .includes(mentorSearch.toLowerCase())),
                  ).length === 0 && (
                    <div className="px-4 py-3 text-sm text-grey-500">
                      No mentors found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Mentors as Pills */}
            {formData.mentorIds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.mentorIds.map((mentorId) => {
                  const mentor = teamData?.find((m) => m.id === mentorId);
                  return mentor ? (
                    <div
                      key={mentor.id}
                      className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full text-sm font-medium animate-in zoom-in duration-200"
                    >
                      {mentor.imageUrl && (
                        <div className="relative h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={mentor.imageUrl}
                            alt={mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span>{mentor.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleMentor(mentor.id)}
                        className="hover:text-red-400 transition-colors ml-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 sticky bottom-0 bg-white p-4 border border-grey-200">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white hover:bg-grey-900 flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : editingMentorship ? (
              "Save Changes"
            ) : (
              "Create Mentorship"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/mentorships")}
            className="border-grey-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
