"use client";

import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Newsletter } from "./NewsletterComposePage";
import { NewsletterSendConfirmModal } from "./NewsletterSendConfirmModal";
import { TestEmailPanel } from "./TestEmailPanel";

interface NewsletterPreviewPageProps {
  newsletter: Newsletter;
}

export function NewsletterPreviewPage({
  newsletter,
}: NewsletterPreviewPageProps) {
  const router = useRouter();

  const [previewHtml, setPreviewHtml] = useState("");
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [showSendConfirm, setShowSendConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetch("/api/admin/subscriber-count")
      .then((r) => r.json())
      .then((data) => setSubscriberCount(data.count ?? 0))
      .catch(() => setSubscriberCount(0));
  }, []);

  useEffect(() => {
    async function loadPreview() {
      setLoadingPreview(true);
      try {
        const res = await fetch("/api/admin/newsletter/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: newsletter.subject,
            previewText: newsletter.previewText,
            markdownContent: newsletter.markdownContent,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? "Failed to generate preview");
          return;
        }
        setPreviewHtml(data.html);
      } catch {
        toast.error("Failed to generate preview");
      } finally {
        setLoadingPreview(false);
      }
    }
    loadPreview();
  }, [newsletter]);

  async function handleConfirmSend() {
    setIsSending(true);
    try {
      const res = await fetch(`/api/admin/newsletter/${newsletter.id}/send`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to send newsletter");
        return;
      }
      toast.success("Newsletter sent successfully");
      setShowSendConfirm(false);
      router.push("/admin/newsletter");
    } catch {
      toast.error("Failed to send newsletter");
    } finally {
      setIsSending(false);
    }
  }

  const noSubscribers = subscriberCount === 0;

  return (
    <>
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() =>
                router.push(`/admin/newsletter/${newsletter.id}/edit`)
              }
              className="mt-1 p-2 rounded-xl border border-grey-200 hover:border-black hover:bg-black hover:text-white transition-all"
              aria-label="Back to editor"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
                Preview <span className="text-grey-400">& Send</span>
              </h1>
              <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
                Draft #{newsletter.id} — {newsletter.subject}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500 mr-2">
              {subscriberCount === null
                ? "LOADING..."
                : noSubscribers
                  ? "NO VERIFIED SUBSCRIBERS"
                  : `${subscriberCount.toLocaleString()} SUBSCRIBER${subscriberCount !== 1 ? "S" : ""}`}
            </span>
            <Button
              onClick={() => setShowSendConfirm(true)}
              disabled={noSubscribers || isSending || subscriberCount === null}
              className="h-11 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
            >
              <Send className="h-3.5 w-3.5" />
              {noSubscribers ? "NO SUBSCRIBERS" : "SEND TO SUBSCRIBERS"}
            </Button>
          </div>
        </div>

        <TestEmailPanel newsletter={newsletter} />

        {/* Preview */}
        <div className="rounded-2xl border border-grey-100 bg-white p-6 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-black">
            EMAIL PREVIEW
          </p>
          {loadingPreview ? (
            <div className="flex items-center justify-center py-20">
              <span className="text-[10px] font-mono uppercase tracking-widest text-grey-400 animate-pulse">
                RENDERING...
              </span>
            </div>
          ) : (
            <div className="border border-black rounded-xl overflow-hidden">
              <iframe
                srcDoc={previewHtml}
                title="Newsletter Preview"
                className="w-full"
                style={{ minHeight: "600px", border: "none" }}
              />
            </div>
          )}
        </div>
      </div>

      <NewsletterSendConfirmModal
        isOpen={showSendConfirm}
        onClose={() => setShowSendConfirm(false)}
        subject={newsletter.subject}
        subscriberCount={subscriberCount ?? 0}
        onConfirm={handleConfirmSend}
        isSending={isSending}
      />
    </>
  );
}
