"use client";

import { AlertCircle } from "lucide-react";
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

interface NewsletterDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsletterId: number | null;
  onSuccess: () => void;
}

export function NewsletterDeleteModal({
  isOpen,
  onClose,
  newsletterId,
  onSuccess,
}: NewsletterDeleteModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!newsletterId) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/newsletter/${newsletterId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Newsletter permanently deleted");
        onSuccess();
        onClose();
      } else {
        toast.error("Failed to delete newsletter");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-black shadow-2xl rounded-3xl p-8 overflow-hidden font-mono">
        <DialogHeader className="items-center text-center">
          <div className="h-20 w-20 bg-black text-white rounded-full flex items-center justify-center mb-6 border-4 border-grey-100 animate-in zoom-in duration-300">
            <AlertCircle className="h-10 w-10" />
          </div>
          <DialogTitle className="text-3xl font-black uppercase tracking-tighter font-sans text-black leading-none mb-4">
            DELETE <span className="text-grey-400">NEWSLETTER</span>
          </DialogTitle>
          <DialogDescription className="text-grey-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed px-4 font-bold">
            CRITICAL OPS: THIS ACTION CANNOT BE UNDONE. THE NEWSLETTER WILL BE
            PERMANENTLY DELETED AND CANNOT BE RECOVERED.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-8 font-mono">
          <Button
            disabled={loading}
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-red-600 text-white text-[10px] items-center justify-center uppercase font-black tracking-[0.2em] hover:bg-black transition-all border-none shadow-none"
          >
            {loading ? "DELETING..." : "CONFIRM DELETION"}
          </Button>
          <Button
            disabled={loading}
            variant="ghost"
            onClick={onClose}
            className="h-14 rounded-2xl text-grey-400 text-[10px] items-center justify-center uppercase font-black tracking-[0.2em] hover:bg-grey-100 transition-all"
          >
            CANCEL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
