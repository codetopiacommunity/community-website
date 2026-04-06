"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsletterSendConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  subscriberCount: number;
  onConfirm: () => void;
  isSending: boolean;
}

export function NewsletterSendConfirmModal({
  isOpen,
  onClose,
  subject,
  subscriberCount,
  onConfirm,
  isSending,
}: NewsletterSendConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-black shadow-2xl rounded-3xl p-8 overflow-hidden font-mono">
        <DialogHeader className="items-center text-center">
          <div className="h-20 w-20 bg-black text-white rounded-full flex items-center justify-center mb-6 border-4 border-grey-100 animate-in zoom-in duration-300">
            <Send className="h-10 w-10" />
          </div>
          <DialogTitle className="text-3xl font-black uppercase tracking-tighter font-sans text-black leading-none mb-4">
            SEND <span className="text-grey-400">NEWSLETTER</span>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3 items-center px-4">
              <p className="text-black font-black text-sm uppercase tracking-widest leading-snug break-words w-full text-center">
                {subject}
              </p>
              <p className="text-grey-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed font-bold">
                SENDING TO {subscriberCount} SUBSCRIBER
                {subscriberCount !== 1 ? "S" : ""}
              </p>
              <p className="text-grey-400 font-mono text-[10px] uppercase tracking-widest leading-relaxed font-bold">
                THIS ACTION CANNOT BE UNDONE. THE NEWSLETTER WILL BE SENT TO ALL
                ACTIVE SUBSCRIBERS.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-8 font-mono">
          <Button
            disabled={isSending}
            onClick={onConfirm}
            className="h-14 rounded-2xl bg-black text-white text-[10px] items-center justify-center uppercase font-black tracking-[0.2em] hover:bg-grey-800 transition-all border-none shadow-none"
          >
            {isSending ? "SENDING..." : "SEND NEWSLETTER"}
          </Button>
          <Button
            disabled={isSending}
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
