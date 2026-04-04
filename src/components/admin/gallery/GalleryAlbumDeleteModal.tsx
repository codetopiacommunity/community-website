"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryAlbumDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: { id: number; title: string } | null;
  onSuccess: () => void;
}

export function GalleryAlbumDeleteModal({
  isOpen,
  onClose,
  album,
  onSuccess,
}: GalleryAlbumDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  async function handleDelete() {
    if (!album) return;
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/gallery/albums/${album.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to delete album. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <div className="p-8 text-center space-y-4">
          <div className="mx-auto flex items-center justify-center p-4 bg-red-100/50 w-16 h-16 rounded-2xl mb-2">
            <Trash2 className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-black text-black uppercase tracking-tighter font-sans">
            Delete Album?
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-grey-500 font-mono">
            You are about to permanently delete{" "}
            <span className="font-bold text-black">{album?.title}</span>. This
            will also remove all photos in this album. This action cannot be
            undone.
          </DialogDescription>

          {error && (
            <p className="text-xs font-bold text-red-500 font-mono bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-left">
              {error}
            </p>
          )}
        </div>

        <div className="px-8 py-6 bg-grey-50/30 border-t-2 border-grey-100 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full sm:flex-1 text-[10px] uppercase text-black hover:bg-grey-100 h-11 rounded-xl font-bold tracking-widest transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:flex-1 bg-red-500 text-white text-[10px] uppercase h-11 rounded-xl active:scale-[0.98] transition-all border border-red-600 hover:bg-red-600 font-bold tracking-widest shadow-none flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                DELETING
              </>
            ) : (
              "CONFIRM DELETE"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
