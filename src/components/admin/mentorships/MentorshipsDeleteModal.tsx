"use client";

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

interface MentorshipsDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorshipId: number | null;
  onSuccess: () => void;
}

export function MentorshipsDeleteModal({
  isOpen,
  onClose,
  mentorshipId,
  onSuccess,
}: MentorshipsDeleteModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!mentorshipId) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/mentorships/${mentorshipId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Mentorship deleted successfully");
        onSuccess();
        onClose();
      } else {
        toast.error("Failed to delete mentorship");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-grey-100 rounded-none gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <DialogHeader className="px-8 py-10 border-b border-grey-50 bg-white">
          <div className="flex flex-col gap-2 text-center">
            <DialogTitle className="text-2xl font-black text-black uppercase tracking-tighter font-sans">
              Delete Mentorship
            </DialogTitle>
            <DialogDescription className="text-sm text-grey-600 font-normal">
              This action cannot be undone. Are you sure you want to delete this
              mentorship?
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 flex gap-3">
          <Button
            disabled={loading}
            variant="outline"
            onClick={onClose}
            className="flex-1 h-10 rounded-none border border-grey-200 text-grey-700 hover:bg-grey-50"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 h-10 rounded-none bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
