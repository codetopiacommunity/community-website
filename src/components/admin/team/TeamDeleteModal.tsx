"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function TeamDeleteModal({
  memberId,
  isOpen,
  onClose,
  onSuccess,
}: {
  memberId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!memberId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Team member removed");
        onSuccess();
        onClose();
      } else {
        const error = await res.json();
        toast.error(error.error || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-grey-100 rounded-none gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <div className="p-8 text-center space-y-4">
          <div className="mx-auto flex items-center justify-center p-4 bg-red-100/50 w-16 h-16 rounded-none mb-2">
            <Trash2 className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-black text-black uppercase tracking-tighter font-sans">
            Remove Member?
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-grey-500 font-mono">
            This action cannot be undone. This member will be permanently
            deleted from the active directory.
          </DialogDescription>
        </div>
        <div className="px-8 py-6 bg-grey-50/30 border-t-2 border-grey-100 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full sm:flex-1 text-[10px] uppercase text-black hover:bg-grey-100 h-11 rounded-none font-bold tracking-widest transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:flex-1 bg-red-500 text-white text-[10px] uppercase h-11 rounded-none active:scale-[0.98] transition-all border border-red-600 hover:bg-red-600 font-bold tracking-widest shadow-none flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                REMOVING
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
