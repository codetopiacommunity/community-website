"use client";

import { Plus } from "lucide-react";
import { ImpactDeleteModal } from "@/components/admin/impact/ImpactDeleteModal";
import { ImpactFormModal } from "@/components/admin/impact/ImpactFormModal";
import { ImpactTable } from "@/components/admin/impact/ImpactTable";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";
import type { ImpactStory } from "@/types";

export default function ManageImpactPage() {
  const {
    data: stories,
    loading,
    refetch: fetchStories,
  } = useFetchData<ImpactStory[]>("/api/admin/impact", {
    errorMessage: "Failed to load impact stories",
  });
  const {
    editingItem: editingStory,
    isFormOpen,
    itemToDelete: storyToDelete,
    isDeleteOpen,
    openAdd,
    openEdit,
    openDelete,
    closeForm,
    closeDelete,
  } = useAdminCRUD<ImpactStory>();

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Manage Impact
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Community impact stories shown on the home page
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-none rounded-none h-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Story
        </Button>
      </div>

      <ImpactTable
        stories={stories ?? []}
        loading={loading}
        onEdit={(story) => openEdit(story)}
        onDelete={(id) => openDelete(id)}
        onAddFirst={openAdd}
      />

      <ImpactFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        editingStory={editingStory}
        onSuccess={fetchStories}
      />

      <ImpactDeleteModal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        storyId={storyToDelete}
        onSuccess={fetchStories}
      />
    </div>
  );
}
