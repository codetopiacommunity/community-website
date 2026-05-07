"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ScheduleSectionProps {
  startDate: string;
  endDate: string;
  isOnline: boolean;
  location: string;
  onChange: (field: string, value: string | boolean) => void;
}

export function ScheduleSection({
  startDate,
  endDate,
  isOnline,
  location,
  onChange,
}: ScheduleSectionProps) {
  return (
    <div className="bg-white border border-grey-200 p-8 space-y-6">
      <h2 className="text-xl font-bold text-black uppercase tracking-tight">
        Schedule & Location
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-black mb-2 block">
            Start Date
          </Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className="border-grey-200 focus:border-black"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-black mb-2 block">
            End Date
          </Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className="border-grey-200 focus:border-black"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-grey-50 border border-grey-100">
        <div>
          <Label className="text-sm font-semibold text-black">
            Online Event
          </Label>
          <p className="text-xs text-grey-500 mt-1">
            Toggle if this is an online mentorship
          </p>
        </div>
        <Switch
          checked={isOnline}
          onCheckedChange={(val) => onChange("isOnline", val)}
        />
      </div>

      {!isOnline && (
        <div>
          <Label className="text-sm font-semibold text-black mb-2 block">
            Location
          </Label>
          <Input
            value={location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="e.g., Accra, Ghana"
            className="border-grey-200 focus:border-black"
          />
        </div>
      )}
    </div>
  );
}
