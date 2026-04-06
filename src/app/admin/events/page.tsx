"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { EventsDeleteModal } from "@/components/admin/events/EventsDeleteModal";
import { EventsFormModal } from "@/components/admin/events/EventsFormModal";
import { EventsTable } from "@/components/admin/events/EventsTable";
import { EventsToolbar } from "@/components/admin/events/EventsToolbar";
import { Button } from "@/components/ui/button";
import { useAdminCRUD } from "@/hooks/useAdminCRUD";
import { useFetchData } from "@/hooks/useFetchData";
import { type Event, getEventStatus } from "@/lib/events";

export default function ManageEventsPage() {
  const {
    data: events,
    loading,
    refetch,
  } = useFetchData<Event[]>("/api/admin/events", {
    errorMessage: "Failed to load events schedule",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const {
    editingItem: editingEvent,
    isFormOpen: isFormModalOpen,
    itemToDelete: eventToDelete,
    isDeleteOpen: isDeleteModalOpen,
    openAdd,
    openEdit,
    openDelete,
    closeForm,
    closeDelete,
  } = useAdminCRUD<Event>();

  const filteredEvents = (events ?? []).filter(
    (e) =>
      (!statusFilter || getEventStatus(e) === statusFilter) &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.classification.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Manage <span className="text-grey-400">Events</span>
          </h1>
          <div className="flex items-center gap-2 mt-1 font-mono">
            <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium">
              Schedule community activities, coworking sessions, and open source
              sprints
            </p>
          </div>
        </div>

        <Button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-[10px] uppercase font-mono hover:bg-grey-800 transition-all group active:scale-[0.98] tracking-widest shadow-none"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
          SCHEDULE NEW EVENT
        </Button>
      </div>

      <EventsToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <EventsTable
        events={filteredEvents}
        loading={loading}
        onEdit={(event) => openEdit(event)}
        onDelete={(id) => openDelete(id)}
      />

      <EventsFormModal
        isOpen={isFormModalOpen}
        onClose={closeForm}
        editingEvent={editingEvent}
        onSuccess={refetch}
      />

      <EventsDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDelete}
        eventId={eventToDelete}
        onSuccess={refetch}
      />
    </div>
  );
}
