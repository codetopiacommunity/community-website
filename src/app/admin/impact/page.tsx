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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Manage <span className="text-grey-400">Impact</span>
          </h1>
          <div className="flex items-center gap-2 mt-1 font-mono">
            <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium">
              Community impact stories shown on the home page
            </p>
          </div>
        </div>
        <Button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          ADD STORY
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
