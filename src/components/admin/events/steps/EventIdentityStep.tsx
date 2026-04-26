"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EventFormData } from "../types";

interface EventIdentityStepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

export function EventIdentityStep({
  formData,
  setFormData,
}: EventIdentityStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
          Event Title <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="e.g. Weekend Co-Working"
          className="rounded-none border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
          Classification <span className="text-red-500">*</span>
        </Label>
        <Input
          value={formData.classification}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              classification: e.target.value,
            }))
          }
          placeholder="e.g. BUILD TOGETHER"
          className="rounded-none border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
          Brief Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Tell us what's happening..."
          className="rounded-none min-h-[120px] border border-grey-100 bg-grey-50/50 p-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
          required
        />
      </div>
    </div>
  );
}
