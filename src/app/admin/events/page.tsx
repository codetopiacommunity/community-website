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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Manage Events
          </h1>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
            Schedule community activities, coworking sessions, and open source sprints
          </p>
        </div>

        <Button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-none rounded-none h-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Schedule New Event
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
