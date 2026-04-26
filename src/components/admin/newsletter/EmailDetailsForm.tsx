"use client";

import { Input } from "@/components/ui/input";

interface EmailDetailsFormProps {
  subject: string;
  previewText: string;
  subjectError: string;
  onSubjectChange: (value: string) => void;
  onPreviewTextChange: (value: string) => void;
}

export function EmailDetailsForm({
  subject,
  previewText,
  subjectError,
  onSubjectChange,
  onPreviewTextChange,
}: EmailDetailsFormProps) {
  return (
    <div className="rounded-none border border-grey-100 bg-white p-6 space-y-4">
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
          onChange={(e) => onSubjectChange(e.target.value)}
          maxLength={200}
          placeholder="Enter newsletter subject..."
          className="font-mono text-sm border-black rounded-none h-11"
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
          onChange={(e) => onPreviewTextChange(e.target.value)}
          maxLength={150}
          placeholder="Short preview shown in email clients..."
          className="font-mono text-sm border-black rounded-none h-11"
        />
        <p className="text-grey-400 text-[10px] font-mono">
          {previewText.length}/150
        </p>
      </div>
    </div>
  );
}
