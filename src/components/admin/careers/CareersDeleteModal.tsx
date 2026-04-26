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

export function CareersDeleteModal({
  isOpen,
  onClose,
  careerId,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  careerId: number | null;
  onSuccess: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!careerId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/careers/${careerId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Career opportunity removed");
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
      <DialogContent className="max-w-md p-0 overflow-hidden border border-grey-100 rounded-none gap-0 bg-white shadow-2xl">
        <DialogHeader className="px-8 py-8 border-b border-grey-50">
          <DialogTitle className="text-3xl font-black text-black uppercase tracking-tighter font-sans">
            Remove Opportunity
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] font-mono">
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>
        <div className="px-8 py-6 space-y-6">
          <p className="text-sm text-grey-600 font-mono">
            Are you sure you want to permanently remove this career opportunity
            from the website?
          </p>
          <div className="flex items-center justify-end gap-4 font-mono">
            <Button
              variant="ghost"
              onClick={onClose}
              type="button"
              className="text-[10px] uppercase text-black hover:bg-grey-100 px-6 h-11 rounded-none font-bold tracking-widest"
            >
              Cancel
            </Button>
            <Button
              disabled={isDeleting}
              onClick={handleDelete}
              className="bg-red-500 text-white text-[10px] uppercase px-8 h-11 rounded-none hover:bg-red-600 active:scale-[0.98] transition-all font-bold tracking-widest shadow-none flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> REMOVING
                </>
              ) : (
                "REMOVE"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
