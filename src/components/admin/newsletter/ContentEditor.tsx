"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRef } from "react";
import type { ToolItem } from "./NewsletterToolbar";
import { NewsletterToolbar } from "./NewsletterToolbar";

interface ContentEditorProps {
  markdownContent: string;
  previewHtml: string;
  showPreview: boolean;
  onContentChange: (value: string) => void;
  onTogglePreview: () => void;
  onInsert: (
    item: ToolItem,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  ) => void;
}

export function ContentEditor({
  markdownContent,
  previewHtml,
  showPreview,
  onContentChange,
  onTogglePreview,
  onInsert,
}: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="rounded-none border border-grey-100 bg-white p-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-black">
          CONTENT
        </p>
        <button
          type="button"
          onClick={onTogglePreview}
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

      {!showPreview && (
        <NewsletterToolbar
          onInsert={(item) => onInsert(item, textareaRef)}
          charCount={markdownContent.length}
        />
      )}

      {showPreview ? (
        <div
          className="min-h-[520px] rounded-none border border-black p-6 prose prose-sm max-w-none text-sm"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled markdown preview
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={markdownContent}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={
            "Write your newsletter content in Markdown...\n\n## Hello readers\n\nStart typing here."
          }
          className="w-full min-h-[520px] rounded-none border border-black p-4 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 placeholder:text-grey-300 leading-relaxed"
          spellCheck
        />
      )}

      <div className="border border-grey-100 rounded-none p-4 bg-grey-50">
        <p className="text-[10px] font-black uppercase tracking-widest text-black mb-3">
          TEMPLATE VARIABLES
        </p>
        <div className="flex items-center gap-3">
          <code className="bg-black text-white text-[10px] font-mono px-2 py-1 rounded-none tracking-wider">
            {"{{base_url}}"}
          </code>
          <span className="text-[10px] font-mono text-grey-500 uppercase tracking-widest">
            — THE SITE BASE URL
          </span>
        </div>
      </div>
    </div>
  );
}
