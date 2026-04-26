"use client";

import { Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EventFormData } from "../types";

interface EventSchedulingStepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

export function EventSchedulingStep({
  formData,
  setFormData,
}: EventSchedulingStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
          <Calendar className="h-3 w-3" /> START TIME *
        </Label>
        <Input
          type="datetime-local"
          value={formData.startDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, startDate: e.target.value }))
          }
          className="rounded-none border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black focus:border-black focus:bg-white transition-all font-mono"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
          <Clock className="h-3 w-3" /> END TIME (OPTIONAL)
        </Label>
        <Input
          type="datetime-local"
          value={formData.endDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, endDate: e.target.value }))
          }
          className="rounded-none border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black focus:border-black focus:bg-white transition-all font-mono"
          required
        />
      </div>
    </div>
  );
}
