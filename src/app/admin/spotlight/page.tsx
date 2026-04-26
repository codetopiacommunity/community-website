"use client";

import { Plus } from "lucide-react";
import { SpotlightDeleteModal } from "@/components/admin/spotlight/SpotlightDeleteModal";
import { SpotlightFormModal } from "@/components/admin/spotlight/SpotlightFormModal";
import { SpotlightTable } from "@/components/admin/spotlight/SpotlightTable";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";
import type { Spotlight } from "@/types";

export default function ManageSpotlightPage() {
  const {
    data: spotlights,
    loading,
    refetch,
  } = useFetchData<Spotlight[]>("/api/admin/spotlight", {
    errorMessage: "Failed to load spotlights",
  });

  const {
    editingItem,
    isFormOpen,
    itemToDelete,
    isDeleteOpen,
    openAdd,
    openEdit,
    openDelete,
    closeForm,
    closeDelete,
  } = useAdminCRUD<Spotlight>();

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Manage Spotlight
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Feature one person in the spotlight section on the home page
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-none rounded-none h-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Spotlight
        </Button>
      </div>

      <SpotlightTable
        spotlights={spotlights ?? []}
        loading={loading}
        onEdit={openEdit}
        onDelete={openDelete}
        onAddFirst={openAdd}
        onRefetch={refetch}
      />

      <SpotlightFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        editing={editingItem}
        onSuccess={refetch}
      />

      <SpotlightDeleteModal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        spotlightId={itemToDelete}
        onSuccess={refetch}
      />
    </div>
  );
}
