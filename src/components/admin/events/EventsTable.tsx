import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Event, getEventStatus } from "@/lib/events";

interface EventsTableProps {
  events: Event[];
  loading: boolean;
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

export function EventsTable({
  events,
  loading,
  onEdit,
  onDelete,
}: EventsTableProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Active Schedule
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {events.length} Events
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}

      <div className="divide-y divide-zinc-100">
        {events.length === 0 && !loading ? (
          <div className="text-center py-20">
            <Calendar className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
            <p className="font-mono text-sm font-semibold text-zinc-900">
              No events scheduled
            </p>
            <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-widest">
              Ready for something new in the community?
            </p>
          </div>
        ) : (
          events.map((event) => {
            const status = getEventStatus(event);
            return (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`flex flex-col items-center justify-center h-14 w-14 shrink-0 font-mono border ${
                      status === "LIVE"
                        ? "bg-black border-black text-white"
                        : "bg-white border-zinc-200 text-zinc-900"
                    }`}
                  >
                    <span className="text-[9px] uppercase font-bold leading-none mb-0.5">
                      {format(new Date(event.startDate), "MMM")}
                    </span>
                    <span className="text-xl font-black leading-none">
                      {format(new Date(event.startDate), "dd")}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {event.classification}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest border ${
                          status === "LIVE"
                            ? "bg-black text-white border-black"
                            : "bg-white text-zinc-600 border-zinc-200"
                        }`}
                      >
                        {status === "LIVE" && (
                          <Clock className="h-2.5 w-2.5 animate-pulse" />
                        )}
                        {status === "COMPLETED" && (
                          <CheckCircle className="h-2.5 w-2.5" />
                        )}
                        {status}
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border border-zinc-200 text-zinc-500">
                        {event.isOnline ? "Online" : "In-Person"}
                      </span>
                    </div>
                    <p className="font-mono font-semibold text-sm text-zinc-900">
                      {event.title}
                    </p>
                    <p className="font-mono text-xs text-zinc-400 mt-0.5 line-clamp-1 max-w-xl">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="font-mono text-xs text-zinc-400 text-right">
                    <span className="block font-bold text-zinc-900">
                      {format(new Date(event.startDate), "HH:mm")} GMT
                    </span>
                    {event.endDate && (
                      <span className="text-[10px]">
                        Till {format(new Date(event.endDate), "HH:mm")}
                      </span>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-zinc-100 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-44 p-1 border border-zinc-200 shadow-lg bg-white font-mono"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(event)}
                        className="flex items-center gap-2 px-3 py-2 text-xs uppercase font-bold cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(event.id)}
                        className="flex items-center gap-2 px-3 py-2 text-xs uppercase font-bold text-red-600 cursor-pointer hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
