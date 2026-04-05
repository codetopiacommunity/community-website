"use client";

import { ArrowLeft, Eye } from "lucide-react";
import { marked } from "marked";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ContentEditor } from "./ContentEditor";
import { EmailDetailsForm } from "./EmailDetailsForm";
import type { ToolItem } from "./NewsletterToolbar";

export interface Newsletter {
  id: number;
  subject: string;
  previewText: string | null;
  markdownContent: string;
  status: string;
  recipientCount: number;
  sentAt: Date | null;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface NewsletterComposePageProps {
  editingNewsletter?: Newsletter | null;
}

export function NewsletterComposePage({
  editingNewsletter = null,
}: NewsletterComposePageProps) {
  const router = useRouter();

  const [subject, setSubject] = useState(editingNewsletter?.subject ?? "");
  const [previewText, setPreviewText] = useState(
    editingNewsletter?.previewText ?? "",
  );
  const [markdownContent, setMarkdownContent] = useState(
    editingNewsletter?.markdownContent ?? "",
  );
  const [subjectError, setSubjectError] = useState("");
  const [savedId, setSavedId] = useState<number | null>(
    editingNewsletter?.id ?? null,
  );
  const [savingDraft, setSavingDraft] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    if (!showPreview) return;
    Promise.resolve(marked(markdownContent)).then((html: string) =>
      setPreviewHtml(html),
    );
  }, [showPreview, markdownContent]);

  function insertItem(
    item: ToolItem,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  ) {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = markdownContent.slice(start, end);
    let newText: string;
    let newCursor: number;

    if (item.wrap) {
      newText =
        markdownContent.slice(0, start) +
        item.syntax +
        (selected || "text") +
        item.syntax +
        markdownContent.slice(end);
      newCursor =
        start +
        item.syntax.length +
        (selected || "text").length +
        item.syntax.length;
    } else if (item.block) {
      const prefix =
        start > 0 && markdownContent[start - 1] !== "\n" ? "\n" : "";
      newText =
        markdownContent.slice(0, start) +
        prefix +
        item.syntax +
        markdownContent.slice(end);
      newCursor = start + prefix.length + item.syntax.length;
    } else {
      newText =
        markdownContent.slice(0, start) +
        item.syntax +
        markdownContent.slice(end);
      newCursor = start + item.syntax.length;
    }

    setMarkdownContent(newText);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(newCursor, newCursor);
    });
  }

  function validateSubject(): boolean {
    if (!subject.trim()) {
      setSubjectError("Subject is required");
      return false;
    }
    setSubjectError("");
    return true;
  }

  async function handleSaveDraft(): Promise<number | null> {
    if (!validateSubject()) return null;
    setSavingDraft(true);
    try {
      const body = { subject, previewText, markdownContent };
      const currentId = savedId;
      let res: Response;
      if (currentId) {
        res = await fetch(`/api/admin/newsletter/${currentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/admin/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to save draft");
        return null;
      }
      const id = currentId ?? data.id;
      if (!currentId && data.id) {
        setSavedId(data.id);
        router.replace(`/admin/newsletter/${data.id}/edit`);
      }
      toast.success("Draft saved");
      return id;
    } catch {
      toast.error("Failed to save draft");
      return null;
    } finally {
      setSavingDraft(false);
    }
  }

  async function handlePreviewClick() {
    const id = await handleSaveDraft();
    if (id) router.push(`/admin/newsletter/${id}/preview`);
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/newsletter")}
            className="mt-1 p-2 rounded-xl border border-grey-200 hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="Back to newsletters"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
              {editingNewsletter ? (
                <>
                  Edit <span className="text-grey-400">Newsletter</span>
                </>
              ) : (
                <>
                  Compose <span className="text-grey-400">Newsletter</span>
                </>
              )}
            </h1>
            <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
              {editingNewsletter
                ? `Editing draft — ID #${editingNewsletter.id}`
                : "New broadcast"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={savingDraft}
            className="h-11 rounded-xl border-black text-[10px] font-black uppercase tracking-widest"
          >
            {savingDraft ? "SAVING..." : "SAVE DRAFT"}
          </Button>
          <Button
            onClick={handlePreviewClick}
            disabled={savingDraft}
            className="h-11 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            <Eye className="h-3.5 w-3.5" />
            PREVIEW & SEND
          </Button>
        </div>
      </div>

      <EmailDetailsForm
        subject={subject}
        previewText={previewText}
        subjectError={subjectError}
        onSubjectChange={(v) => {
          setSubject(v);
          if (subjectError) setSubjectError("");
        }}
        onPreviewTextChange={setPreviewText}
      />

      <ContentEditor
        markdownContent={markdownContent}
        previewHtml={previewHtml}
        showPreview={showPreview}
        onContentChange={setMarkdownContent}
        onTogglePreview={() => setShowPreview((v) => !v)}
        onInsert={insertItem}
      />
    </div>
  );
}
