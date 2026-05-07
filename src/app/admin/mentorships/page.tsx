"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MentorshipsDeleteModal } from "@/components/admin/mentorships/MentorshipsDeleteModal";
import {
  type Mentorship,
  MentorshipsTable,
} from "@/components/admin/mentorships/MentorshipsTable";
import { Button } from "@/components/ui/button";
import { useFetchData } from "@/hooks/useFetchData";

export default function ManageMentorshipsPage() {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMentorshipId, setSelectedMentorshipId] = useState<
    number | null
  >(null);

  const {
    data: mentorships,
    loading,
    refetch,
  } = useFetchData<Mentorship[]>("/api/admin/mentorships", {
    errorMessage: "Failed to load mentorships",
  });

  const handleDeleteClick = (id: number) => {
    setSelectedMentorshipId(id);
    setDeleteModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Manage <span className="text-grey-400">Mentorships</span>
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest mt-1">
            Create and manage mentorship sessions
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/mentorships/new")}
          className="bg-black text-white"
        >
          Post New Session
        </Button>
      </div>

      <MentorshipsTable
        mentorships={mentorships ?? []}
        loading={loading}
        onEdit={(m) => router.push(`/admin/mentorships/${m.id}`)}
        onDelete={handleDeleteClick}
        onAddFirst={() => router.push("/admin/mentorships/new")}
      />

      <MentorshipsDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedMentorshipId(null);
        }}
        mentorshipId={selectedMentorshipId}
        onSuccess={refetch}
      />
    </div>
  );
}
