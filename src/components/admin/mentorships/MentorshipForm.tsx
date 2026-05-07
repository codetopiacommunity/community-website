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
        title: editingMentorship.title as string,
        description: editingMentorship.description as string,
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
          tags={formData.tags}
          onLinkChange={(val) => handleFieldChange("applicationLink", val)}
          onTagsChange={(tags) => setFormData((prev) => ({ ...prev, tags }))}
        />

        <MentorsSection
          mentorIds={formData.mentorIds}
          teamData={teamData ?? null}
          onToggle={toggleMentor}
        />

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
