"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ImpactDeleteModal } from "@/components/admin/impact/ImpactDeleteModal";
import { ImpactFormModal } from "@/components/admin/impact/ImpactFormModal";
import { ImpactTable } from "@/components/admin/impact/ImpactTable";
import { Button } from "@/components/ui/button";

interface ImpactStory {
  id: number;
  title: string;
  impact: string;
  imageUrl: string;
  logoUrl: string;
  date: string;
  location: string;
  link?: string | null;
  galleryLink?: string | null;
}

export default function ManageImpactPage() {
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/impact");
      if (res.ok) setStories(await res.json());
    } catch {
      toast.error("Failed to load impact stories");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

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
          onClick={() => {
            setEditingStory(null);
            setIsFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          ADD STORY
        </Button>
      </div>

      <ImpactTable
        stories={stories}
        loading={loading}
        onEdit={(story) => {
          setEditingStory(story);
          setIsFormOpen(true);
        }}
        onDelete={(id) => {
          setStoryToDelete(id);
          setIsDeleteOpen(true);
        }}
        onAddFirst={() => {
          setEditingStory(null);
          setIsFormOpen(true);
        }}
      />

      <ImpactFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingStory={editingStory}
        onSuccess={fetchStories}
      />

      <ImpactDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        storyId={storyToDelete}
        onSuccess={fetchStories}
      />
    </div>
  );
}
