"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoSectionProps {
  title: string;
  description: string;
  status: string;
  capacity: string;
  onChange: (field: string, value: string) => void;
}

export function BasicInfoSection({
  title,
  description,
  status,
  capacity,
  onChange,
}: BasicInfoSectionProps) {
  return (
    <div className="bg-zinc-50 border border-zinc-100 p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-l-2 border-black pl-3">
          01 — Basic Info
        </span>
      </div>

      <div>
        <label
          htmlFor="mentorship-title"
          className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
        >
          Title <span className="text-black">*</span>
        </label>
        <Input
          id="mentorship-title"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g., Advanced React Patterns"
          className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
        />
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <label
          htmlFor="mentorship-description"
          className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
        >
          Description <span className="text-black">*</span>
        </label>
        <Textarea
          id="mentorship-description"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe the mentorship program..."
          className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white min-h-32 resize-none"
        />
      </div>

      <div className="border-t border-zinc-100 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="mentorship-status"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Status
          </label>
          <select
            id="mentorship-status"
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-zinc-200 focus:outline-none focus:border-zinc-900 rounded-none bg-white text-sm text-black"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="full">Full</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="mentorship-capacity"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Capacity
          </label>
          <Input
            id="mentorship-capacity"
            type="number"
            value={capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
            placeholder="e.g., 20"
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />
        </div>
      </div>
    </div>
  );
}
