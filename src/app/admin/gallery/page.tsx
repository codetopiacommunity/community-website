"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { GalleryAlbumDeleteModal } from "@/components/admin/gallery/GalleryAlbumDeleteModal";
import { GalleryAlbumFormModal } from "@/components/admin/gallery/GalleryAlbumFormModal";
import { GalleryAlbumTable } from "@/components/admin/gallery/GalleryAlbumTable";
import { GalleryToolbar } from "@/components/admin/gallery/GalleryToolbar";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";
import type { GalleryAlbum } from "@/types";

export default function ManageGalleryPage() {
  const {
    data: albums,
    loading,
    refetch: fetchAlbums,
  } = useFetchData<GalleryAlbum[]>("/api/admin/gallery/albums", {
    errorMessage: "Failed to load gallery albums",
  });

  const {
    editingItem: editingAlbum,
    isFormOpen: isFormModalOpen,
    itemToDelete: albumToDelete,
    isDeleteOpen: isDeleteModalOpen,
    openAdd,
    openEdit,
    openDelete,
    closeForm,
    closeDelete,
  } = useAdminCRUD<GalleryAlbum, { id: number; title: string }>();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredAlbums = (albums ?? []).filter((album) => {
    const matchesSearch =
      search === "" ||
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "" || album.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  function handleEdit(album: GalleryAlbum) {
    openEdit(album);
  }

  function handleDelete(id: number) {
    const album = (albums ?? []).find((a) => a.id === id);
    if (!album) return;
    openDelete({ id: album.id, title: album.title });
  }

  async function handleFormSuccess() {
    await fetchAlbums();
    toast.success(
      editingAlbum
        ? "Album updated successfully"
        : "Album created successfully",
    );
  }

  async function handleDeleteSuccess() {
    await fetchAlbums();
    toast.success("Album deleted successfully");
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Manage Gallery
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Create and manage photo albums for the community gallery
          </p>
        </div>

        <Button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-none rounded-none h-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Album
        </Button>
      </div>

      <GalleryToolbar
        search={search}
        setSearch={setSearch}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <GalleryAlbumTable
        albums={filteredAlbums}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddFirst={openAdd}
      />

      <GalleryAlbumFormModal
        isOpen={isFormModalOpen}
        onClose={closeForm}
        editingAlbum={editingAlbum}
        onSuccess={handleFormSuccess}
      />

      <GalleryAlbumDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDelete}
        album={albumToDelete}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
