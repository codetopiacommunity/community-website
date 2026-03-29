"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { Event } from "@/lib/events";
import { EventIdentityStep } from "./steps/EventIdentityStep";
import { EventParticipationStep } from "./steps/EventParticipationStep";
import { EventSchedulingStep } from "./steps/EventSchedulingStep";
import { FormNavigation } from "./steps/FormNavigation";
import type { EventFormData } from "./types";

interface EventsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingEvent: Event | null;
  onSuccess: () => void;
}

export function EventsFormModal({
  isOpen,
  onClose,
  editingEvent,
  onSuccess,
}: EventsFormModalProps) {
  const [activeTab, setActiveTab] = useState("core");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    classification: "",
    description: "",
    startDate: "",
    endDate: "",
    isOnline: true,
    reserveSpotLink: "",
    joinMeetingLink: "",
    recordedVideoLink: "",
    locationUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (editingEvent) {
        setFormData({
          title: editingEvent.title,
          classification: editingEvent.classification,
          description: editingEvent.description,
          startDate: editingEvent.startDate
            ? new Date(editingEvent.startDate).toISOString().slice(0, 16)
            : "",
          endDate: editingEvent.endDate
            ? new Date(editingEvent.endDate).toISOString().slice(0, 16)
            : "",
          isOnline: editingEvent.isOnline ?? true,
          reserveSpotLink: editingEvent.reserveSpotLink || "",
          joinMeetingLink: editingEvent.joinMeetingLink || "",
          recordedVideoLink: editingEvent.recordedVideoLink || "",
          locationUrl: editingEvent.locationUrl || "",
        });
      } else {
        setFormData({
          title: "",
          classification: "",
          description: "",
          startDate: "",
          endDate: "",
          isOnline: true,
          reserveSpotLink: "",
          joinMeetingLink: "",
          recordedVideoLink: "",
          locationUrl: "",
        });
      }
      setActiveTab("core");
      setIsSubmitting(false);
    }
  }, [editingEvent, isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : "/api/admin/events";
      const method = editingEvent ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: formData.endDate
            ? new Date(formData.endDate).toISOString()
            : null,
        }),
      });

      if (res.ok) {
        toast.success(
          `Event ${editingEvent ? "updated" : "created"} successfully`,
        );
        onSuccess();
        onClose();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to save event");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border border-grey-100 rounded-3xl gap-0 bg-white animate-in zoom-in-95 duration-200 shadow-2xl">
        <DialogHeader className="px-8 py-10 border-b border-grey-50 bg-white">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <DialogTitle className="text-4xl font-black text-black uppercase tracking-tighter font-sans">
              {editingEvent ? "Update Event" : "New Activity"}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] flex items-center justify-center sm:justify-start gap-3 font-mono">
              <span className="px-2 py-1 bg-black rounded-lg text-white font-mono leading-none tracking-normal">
                {activeTab === "core"
                  ? "PART 01"
                  : activeTab === "timing"
                    ? "PART 02"
                    : "PART 03"}
              </span>
              {activeTab === "core" && "EVENT IDENTITY"}
              {activeTab === "timing" && "SCHEDULING & STATUS"}
              {activeTab === "action" && "PARTICIPATION DETAILS"}
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="p-8 pb-4">
              <TabsContent value="core" className="mt-0 font-mono">
                <EventIdentityStep
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>

              <TabsContent value="timing" className="mt-0 font-mono">
                <EventSchedulingStep
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>

              <TabsContent value="action" className="mt-0 font-mono">
                <EventParticipationStep
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>
            </div>

            <FormNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onClose={onClose}
              isSubmitting={isSubmitting}
              editingEvent={!!editingEvent}
            />
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}
