"use client";

import { Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventFormData } from "../types";

interface EventParticipationStepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

export function EventParticipationStep({
  formData,
  setFormData,
}: EventParticipationStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest">
          Event Format
        </Label>
        <Select
          value={formData.isOnline ? "online" : "in_person"}
          onValueChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              isOnline: val === "online",
            }))
          }
        >
          <SelectTrigger className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black focus:border-black focus:bg-white transition-all font-mono">
            <SelectValue placeholder="Select Format" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-black rounded-xl p-1 font-mono">
            <SelectItem
              value="online"
              className="text-xs text-black focus:bg-black focus:text-white rounded-md"
            >
              ONLINE EVENT
            </SelectItem>
            <SelectItem
              value="in_person"
              className="text-xs text-black focus:bg-black focus:text-white rounded-md"
            >
              IN-PERSON EVENT
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.isOnline ? (
        <>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
              <LinkIcon className="h-3 w-3" /> RESERVE SPOT LINK (OPTIONAL)
            </Label>
            <Input
              value={formData.reserveSpotLink}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  reserveSpotLink: e.target.value,
                }))
              }
              placeholder="https://..."
              className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
              <LinkIcon className="h-3 w-3" /> JOIN MEETING LINK
            </Label>
            <Input
              value={formData.joinMeetingLink}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  joinMeetingLink: e.target.value,
                }))
              }
              placeholder="https://..."
              className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
              <LinkIcon className="h-3 w-3" /> RECORDED VIDEO LINK (OPTIONAL)
            </Label>
            <Input
              value={formData.recordedVideoLink}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recordedVideoLink: e.target.value,
                }))
              }
              placeholder="https://youtube.com/..."
              className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
            />
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <Label className="text-[10px] uppercase text-grey-500 font-bold tracking-widest flex items-center gap-2">
            <LinkIcon className="h-3 w-3" /> GOOGLE MAPS LOCATION URL
          </Label>
          <Input
            value={formData.locationUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                locationUrl: e.target.value,
              }))
            }
            placeholder="https://maps.google.com/..."
            className="rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono"
          />
        </div>
      )}
    </div>
  );
}
