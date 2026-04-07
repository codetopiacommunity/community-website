"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SpotlightDeleteModal({
  isOpen,
  onClose,
  spotlightId,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  spotlightId: number | null;
  onSuccess: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!spotlightId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/spotlight/${spotlightId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Spotlight deleted");
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to delete");
      }
    } catch {
      toast.error("An error occurred");
    }
    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white shadow-2xl">
        <DialogHeader className="px-8 py-8 border-b border-grey-50">
          <DialogTitle className="text-3xl font-black text-black uppercase tracking-tighter font-sans">
            Delete Spotlight
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] font-mono">
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>
        <div className="px-8 py-6 space-y-6">
          <p className="text-sm text-grey-600 font-mono">
            Are you sure you want to delete this spotlight entry? The image will
            also be removed.
          </p>
          <div className="flex items-center justify-end gap-4 font-mono">
            <Button
              variant="ghost"
              onClick={onClose}
              type="button"
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-xl font-bold tracking-widest"
            >
              Cancel
            </Button>
            <Button
              disabled={isDeleting}
              onClick={handleDelete}
              className="bg-red-500 text-white text-[10px] uppercase px-8 h-11 rounded-xl hover:bg-red-600 active:scale-[0.98] transition-all font-bold tracking-widest shadow-none flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> DELETING
                </>
              ) : (
                "DELETE"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
