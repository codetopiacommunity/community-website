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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Manage <span className="text-grey-400">Spotlight</span>
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
            Feature one person in the spotlight section on the home page
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          ADD SPOTLIGHT
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
