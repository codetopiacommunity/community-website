"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LinksTagsSectionProps {
  applicationLink: string;
  registrationLink: string;
  tags: string[];
  onLinkChange: (value: string) => void;
  onRegistrationLinkChange: (value: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export function LinksTagsSection({
  applicationLink,
  registrationLink,
  tags,
  onLinkChange,
  onRegistrationLinkChange,
  onTagsChange,
}: LinksTagsSectionProps) {
  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="bg-zinc-50 border border-zinc-100 p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-l-2 border-black pl-3">
          04 — Links & Tags
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="mentorship-application-link"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Application Link
          </label>
          <p className="text-xs font-mono text-zinc-400 mb-2">
            Link for participants to apply or sign up.
          </p>
          <Input
            id="mentorship-application-link"
            type="url"
            value={applicationLink}
            onChange={(e) => onLinkChange(e.target.value)}
            placeholder="https://example.com/apply"
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="mentorship-registration-link"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Mentor Registration Link
          </label>
          <p className="text-xs font-mono text-zinc-400 mb-2">
            Separate link for mentor sign-ups.
          </p>
          <Input
            id="mentorship-registration-link"
            type="url"
            value={registrationLink}
            onChange={(e) => onRegistrationLinkChange(e.target.value)}
            placeholder="https://example.com/register-as-mentor"
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
          Tags
        </p>
        <p className="text-xs font-mono text-zinc-400 mb-2">
          Press Enter or comma to add a tag. Backspace removes the last one.
        </p>
        <div className="flex flex-wrap gap-2 p-3 border border-zinc-200 bg-white focus-within:border-zinc-900 transition-colors min-h-[44px]">
          {tags.map((tag) => (
            <span
              key={`tag-${tag}`}
              className="inline-flex items-center gap-1.5 bg-black text-white text-xs px-2.5 py-1 font-mono animate-in zoom-in duration-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-zinc-400 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = (e.target as HTMLInputElement).value;
                addTag(val);
                (e.target as HTMLInputElement).value = "";
              } else if (
                e.key === "Backspace" &&
                !(e.target as HTMLInputElement).value &&
                tags.length > 0
              ) {
                e.preventDefault();
                onTagsChange(tags.slice(0, -1));
              }
            }}
            onChange={(e) => {
              if (e.target.value.includes(",")) {
                const newTags = e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .filter((t) => !tags.includes(t));
                if (newTags.length > 0) onTagsChange([...tags, ...newTags]);
                e.target.value = "";
              }
            }}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-black placeholder:text-zinc-400 py-1 px-1 font-mono"
            placeholder={
              tags.length === 0 ? "Type a tag & press Enter or comma" : ""
            }
          />
        </div>
      </div>
    </div>
  );
}
