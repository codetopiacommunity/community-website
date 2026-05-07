"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="bg-white border border-grey-200 p-8 space-y-6">
      <h2 className="text-xl font-bold text-black uppercase tracking-tight">
        Basic Information
      </h2>

      <div>
        <Label className="text-sm font-semibold text-black mb-2 block">
          Title *
        </Label>
        <Input
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g., Advanced React Patterns"
          className="border-grey-200 focus:border-black"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-black mb-2 block">
          Description *
        </Label>
        <Textarea
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe the mentorship program..."
          className="border-grey-200 focus:border-black min-h-32"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-black mb-2 block">
            Status
          </Label>
          <select
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-grey-200 focus:outline-none focus:border-black"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="full">Full</option>
          </select>
        </div>
        <div>
          <Label className="text-sm font-semibold text-black mb-2 block">
            Capacity
          </Label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
            placeholder="e.g., 20"
            className="border-grey-200 focus:border-black"
          />
        </div>
      </div>
    </div>
  );
}
