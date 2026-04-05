"use client";

import {
  AlignLeft,
  ArrowLeft,
  Bold,
  ChevronDown,
  Code,
  Eye,
  EyeOff,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
  Table,
  Type,
} from "lucide-react";
import { marked } from "marked";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

interface ToolItem {
  label: string;
  icon?: React.ReactNode;
  syntax: string;
  wrap: boolean;
  title: string;
  block?: boolean; // insert on new line
}

interface ToolGroup {
  label: string;
  icon: React.ReactNode;
  items: ToolItem[];
}

const TOOL_GROUPS: ToolGroup[] = [
  {
    label: "Text",
    icon: <Type className="h-3 w-3" />,
    items: [
      {
        label: "Bold",
        icon: <Bold className="h-3 w-3" />,
        syntax: "**",
        wrap: true,
        title: "Bold (**text**)",
      },
      {
        label: "Italic",
        icon: <Italic className="h-3 w-3" />,
        syntax: "_",
        wrap: true,
        title: "Italic (_text_)",
      },
      {
        label: "Strikethrough",
        icon: <Strikethrough className="h-3 w-3" />,
        syntax: "~~",
        wrap: true,
        title: "Strikethrough (~~text~~)",
      },
      {
        label: "Inline code",
        icon: <Code className="h-3 w-3" />,
        syntax: "`",
        wrap: true,
        title: "Inline code",
      },
    ],
  },
  {
    label: "Headings",
    icon: <Heading2 className="h-3 w-3" />,
    items: [
      {
        label: "Heading 1",
        icon: <AlignLeft className="h-3 w-3" />,
        syntax: "# ",
        wrap: false,
        title: "H1",
        block: true,
      },
      {
        label: "Heading 2",
        icon: <Heading2 className="h-3 w-3" />,
        syntax: "## ",
        wrap: false,
        title: "H2",
        block: true,
      },
      {
        label: "Heading 3",
        icon: <Heading3 className="h-3 w-3" />,
        syntax: "### ",
        wrap: false,
        title: "H3",
        block: true,
      },
      {
        label: "Heading 4",
        icon: <Heading3 className="h-3 w-3" />,
        syntax: "#### ",
        wrap: false,
        title: "H4",
        block: true,
      },
    ],
  },
  {
    label: "Lists",
    icon: <List className="h-3 w-3" />,
    items: [
      {
        label: "Bullet list",
        icon: <List className="h-3 w-3" />,
        syntax: "- ",
        wrap: false,
        title: "Bullet list",
        block: true,
      },
      {
        label: "Numbered list",
        icon: <ListOrdered className="h-3 w-3" />,
        syntax: "1. ",
        wrap: false,
        title: "Numbered list",
        block: true,
      },
      {
        label: "Task list",
        icon: <List className="h-3 w-3" />,
        syntax: "- [ ] ",
        wrap: false,
        title: "Task list item",
        block: true,
      },
    ],
  },
  {
    label: "Insert",
    icon: <Link className="h-3 w-3" />,
    items: [
      {
        label: "Link",
        icon: <Link className="h-3 w-3" />,
        syntax: "[link text](https://)",
        wrap: false,
        title: "Insert link",
      },
      {
        label: "Image",
        icon: <Image className="h-3 w-3" />,
        syntax: "![alt text](https://image-url)",
        wrap: false,
        title: "Insert image",
      },
      {
        label: "Blockquote",
        icon: <Quote className="h-3 w-3" />,
        syntax: "> ",
        wrap: false,
        title: "Blockquote",
        block: true,
      },
      {
        label: "Code block",
        icon: <Code className="h-3 w-3" />,
        syntax: "```\n",
        wrap: false,
        title: "Code block",
        block: true,
      },
      {
        label: "Divider",
        icon: <Minus className="h-3 w-3" />,
        syntax: "\n---\n",
        wrap: false,
        title: "Horizontal rule",
        block: true,
      },
      {
        label: "Table",
        icon: <Table className="h-3 w-3" />,
        syntax:
          "| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell     | Cell     | Cell     |\n",
        wrap: false,
        title: "Insert table",
        block: true,
      },
      {
        label: "Button link",
        icon: <Link className="h-3 w-3" />,
        syntax: "[→ Click here](https://)",
        wrap: false,
        title: "CTA button link",
      },
    ],
  },
];

function ToolbarDropdown({
  group,
  onInsert,
}: {
  group: ToolGroup;
  onInsert: (item: ToolItem) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
          open
            ? "border-black bg-black text-white"
            : "border-grey-200 text-grey-600 hover:border-black hover:text-black hover:bg-grey-50"
        }`}
      >
        {group.icon}
        {group.label}
        <ChevronDown
          className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-xl border border-grey-200 bg-white shadow-lg overflow-hidden">
          {group.items.map((item) => (
            <button
              key={item.title}
              type="button"
              title={item.title}
              onClick={() => {
                onInsert(item);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-grey-700 hover:bg-grey-50 hover:text-black transition-colors text-left"
            >
              <span className="text-grey-400">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function NewsletterComposePage({
  editingNewsletter = null,
}: NewsletterComposePageProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  function insertItem(item: ToolItem) {
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

      {/* Email Details */}
      <div className="rounded-2xl border border-grey-100 bg-white p-6 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-black">
          EMAIL DETAILS
        </p>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="newsletter-subject"
            className="text-[10px] font-black uppercase tracking-widest text-black"
          >
            SUBJECT <span className="text-red-500">*</span>
          </label>
          <Input
            id="newsletter-subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (subjectError) setSubjectError("");
            }}
            maxLength={200}
            placeholder="Enter newsletter subject..."
            className="font-mono text-sm border-black rounded-xl h-11"
            aria-invalid={!!subjectError}
          />
          {subjectError && (
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
              {subjectError}
            </p>
          )}
          <p className="text-grey-400 text-[10px] font-mono">
            {subject.length}/200
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="newsletter-preview-text"
            className="text-[10px] font-black uppercase tracking-widest text-black"
          >
            PREVIEW TEXT{" "}
            <span className="text-grey-400 normal-case font-normal">
              (optional)
            </span>
          </label>
          <Input
            id="newsletter-preview-text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            maxLength={150}
            placeholder="Short preview shown in email clients..."
            className="font-mono text-sm border-black rounded-xl h-11"
          />
          <p className="text-grey-400 text-[10px] font-mono">
            {previewText.length}/150
          </p>
        </div>
      </div>

      {/* Content Editor */}
      <div className="rounded-2xl border border-grey-100 bg-white p-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-black">
            CONTENT
          </p>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-grey-500 hover:text-black transition-colors"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-3 w-3" /> EDIT
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" /> PREVIEW
              </>
            )}
          </button>
        </div>

        {/* Toolbar */}
        {!showPreview && (
          <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-grey-100">
            {TOOL_GROUPS.map((group) => (
              <ToolbarDropdown
                key={group.label}
                group={group}
                onInsert={insertItem}
              />
            ))}
            <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-grey-400">
              <Type className="h-3 w-3" />
              {markdownContent.length} chars
            </span>
          </div>
        )}

        {showPreview ? (
          <div
            className="min-h-[520px] rounded-xl border border-black p-6 prose prose-sm max-w-none text-sm"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled markdown preview
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            placeholder={
              "Write your newsletter content in Markdown...\n\n## Hello readers\n\nStart typing here."
            }
            className="w-full min-h-[520px] rounded-xl border border-black p-4 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 placeholder:text-grey-300 leading-relaxed"
            spellCheck
          />
        )}

        {/* Template vars */}
        <div className="border border-grey-100 rounded-xl p-4 bg-grey-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-black mb-3">
            TEMPLATE VARIABLES
          </p>
          <div className="flex items-center gap-3">
            <code className="bg-black text-white text-[10px] font-mono px-2 py-1 rounded-md tracking-wider">
              {"{{base_url}}"}
            </code>
            <span className="text-[10px] font-mono text-grey-500 uppercase tracking-widest">
              — THE SITE BASE URL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
