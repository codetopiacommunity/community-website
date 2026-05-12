"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/hooks/useFetchData";
import type { TeamMember } from "@/types";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { ImagesSection } from "./sections/ImagesSection";
import { LinksTagsSection } from "./sections/LinksTagsSection";
import { MentorsSection } from "./sections/MentorsSection";
import { ScheduleSection } from "./sections/ScheduleSection";

const defaultForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  isOnline: true,
  location: "",
  capacity: "",
  applicationLink: "",
  registrationLink: "",
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

  const { data: teamData } = useFetchData<TeamMember[]>("/api/admin/team", {
    errorMessage: "Failed to load team members",
  });

  useEffect(() => {
    if (editingMentorship) {
      setFormData({
        title: (editingMentorship.title as string) || "",
        description: (editingMentorship.description as string) || "",
        startDate: editingMentorship.startDate
          ? new Date(editingMentorship.startDate as string)
              .toISOString()
              .split("T")[0]
          : "",
        endDate: editingMentorship.endDate
          ? new Date(editingMentorship.endDate as string)
              .toISOString()
              .split("T")[0]
          : "",
        isOnline: editingMentorship.isOnline as boolean,
        location: (editingMentorship.location as string) || "",
        capacity: editingMentorship.capacity
          ? String(editingMentorship.capacity)
          : "",
        applicationLink: (editingMentorship.applicationLink as string) || "",
        registrationLink: (editingMentorship.registrationLink as string) || "",
        imageUrl: (editingMentorship.imageUrl as string) || "",
        coverImage: (editingMentorship.coverImage as string) || "",
        flyerImage: (editingMentorship.flyerImage as string) || "",
        tags: (editingMentorship.tags as string[]) || [],
        status: (editingMentorship.status as string) || "open",
        mentorIds: ((editingMentorship.mentors as TeamMember[]) || []).map(
          (m) => m.id,
        ),
      });
      setPreviewImages({
        coverImage: editingMentorship.coverImage as string,
        flyerImage: editingMentorship.flyerImage as string,
      });
    }
  }, [editingMentorship]);

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleImageRemove = (field: "coverImage" | "flyerImage") => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    setPreviewImages((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleMentor = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      mentorIds: prev.mentorIds.includes(id)
        ? prev.mentorIds.filter((m) => m !== id)
        : [...prev.mentorIds, id],
    }));
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

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          capacity: formData.capacity ? Number(formData.capacity) : null,
        }),
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
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200">
        <Link
          href="/admin/mentorships"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
        <div className="text-right">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-0.5">
            {editingMentorship ? "Editing" : "Creating"}
          </p>
          <h1 className="text-xl font-semibold text-black tracking-tight">
            {editingMentorship ? "Edit Mentorship" : "New Mentorship"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <BasicInfoSection
          title={formData.title}
          description={formData.description}
          status={formData.status}
          capacity={formData.capacity}
          onChange={handleFieldChange}
        />

        <ScheduleSection
          startDate={formData.startDate}
          endDate={formData.endDate}
          isOnline={formData.isOnline}
          location={formData.location}
          onChange={handleFieldChange}
        />

        <ImagesSection
          coverImage={previewImages.coverImage}
          flyerImage={previewImages.flyerImage}
          onUpload={handleImageUpload}
          onRemove={handleImageRemove}
        />

        <LinksTagsSection
          applicationLink={formData.applicationLink}
          registrationLink={formData.registrationLink}
          tags={formData.tags}
          onLinkChange={(val) => handleFieldChange("applicationLink", val)}
          onRegistrationLinkChange={(val) =>
            handleFieldChange("registrationLink", val)
          }
          onTagsChange={(tags) => setFormData((prev) => ({ ...prev, tags }))}
        />

        <MentorsSection
          mentorIds={formData.mentorIds}
          teamData={teamData ?? null}
          onToggle={toggleMentor}
        />

        {/* Sticky save bar */}
        <div className="sticky bottom-0 z-10 bg-white border-t border-zinc-200 px-6 py-4 -mx-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:block">
              {editingMentorship
                ? "Editing existing mentorship"
                : "Creating new mentorship"}
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/mentorships")}
                className="border-zinc-200 rounded-none text-xs font-mono uppercase tracking-widest hover:bg-zinc-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-black text-white hover:bg-zinc-800 rounded-none text-xs font-mono uppercase tracking-widest px-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
                    Saving...
                  </>
                ) : editingMentorship ? (
                  "Save Changes"
                ) : (
                  "Create Mentorship"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
