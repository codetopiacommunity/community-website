"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LinksTagsSectionProps {
  applicationLink: string;
  tags: string[];
  onLinkChange: (value: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export function LinksTagsSection({
  applicationLink,
  tags,
  onLinkChange,
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
    <div className="bg-white border border-grey-200 p-8 space-y-6">
      <h2 className="text-xl font-bold text-black uppercase tracking-tight">
        Links & Tags
      </h2>

      <div>
        <Label className="text-sm font-semibold text-black mb-2 block">
          Application Link
        </Label>
        <Input
          type="url"
          value={applicationLink}
          onChange={(e) => onLinkChange(e.target.value)}
          placeholder="https://example.com/apply"
          className="border-grey-200 focus:border-black"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-black mb-2 block">
          Tags
        </Label>
        <div className="flex flex-wrap gap-2 p-3 border border-grey-200 bg-grey-50 focus-within:border-black focus-within:bg-white transition-all min-h-[44px]">
          {tags.map((tag) => (
            <span
              key={`tag-${tag}`}
              className="inline-flex items-center gap-1.5 bg-black text-white text-xs px-2.5 py-1 font-medium animate-in zoom-in duration-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-400 transition-colors"
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
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-black placeholder:text-grey-400 py-1 px-2"
            placeholder={tags.length === 0 ? "Type a tag & press Enter or comma" : ""}
          />
        </div>
      </div>
    </div>
  );
}
