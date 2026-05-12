"use client";

import { Input } from "@/components/ui/input";
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
    <div className="bg-zinc-50 border border-zinc-100 p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-l-2 border-black pl-3">
          02 — Schedule & Location
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="mentorship-start-date"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Start Date
          </label>
          <Input
            id="mentorship-start-date"
            type="date"
            value={startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="mentorship-end-date"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            End Date
          </label>
          <Input
            id="mentorship-end-date"
            type="date"
            value={endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <div className="flex items-center justify-between p-4 bg-white border border-zinc-200">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Online Event
            </p>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Toggle if this is an online mentorship
            </p>
          </div>
          <Switch
            checked={isOnline}
            onCheckedChange={(val) => onChange("isOnline", val)}
          />
        </div>
      </div>

      {!isOnline && (
        <div className="border-t border-zinc-100 pt-5">
          <label
            htmlFor="mentorship-location"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Location
          </label>
          <Input
            id="mentorship-location"
            value={location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="e.g., Accra, Ghana"
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />
        </div>
      )}
    </div>
  );
}
