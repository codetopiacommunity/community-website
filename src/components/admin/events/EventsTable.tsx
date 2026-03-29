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
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden relative shadow-none">
      <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Active Schedule
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {events.length} Events Total
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      )}

      <div className="p-6 space-y-4">
        {events.length === 0 && !loading ? (
          <div className="text-center py-20 border-2 border-dashed border-grey-100 rounded-2xl">
            <Calendar className="h-12 w-12 mx-auto text-grey-200 mb-4" />
            <h3 className="text-lg font-black text-black uppercase tracking-tighter">
              No events scheduled
            </h3>
            <p className="text-grey-400 font-mono text-xs mt-1 uppercase tracking-widest">
              Ready for something new in the community?
            </p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-grey-50/30 border border-grey-100 rounded-2xl hover:border-black hover:bg-white transition-all duration-300 gap-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div
                  className={`flex flex-col items-center justify-center h-16 w-16 rounded-xl font-mono border-2 transition-all ${
                    getEventStatus(event) === "LIVE"
                      ? "bg-black border-black text-white"
                      : "bg-white border-grey-100 text-black group-hover:border-black"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold leading-none mb-1">
                    {format(new Date(event.startDate), "MMM")}
                  </span>
                  <span className="text-xl font-black leading-none tracking-tighter">
                    {format(new Date(event.startDate), "dd")}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-grey-400 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                      {event.classification}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-widest ${
                        getEventStatus(event) === "LIVE"
                          ? "bg-black text-white"
                          : "bg-white text-grey-600 border border-grey-200"
                      }`}
                    >
                      {getEventStatus(event) === "LIVE" && (
                        <Clock className="h-2.5 w-2.5 animate-pulse" />
                      )}
                      {getEventStatus(event) === "COMPLETED" && (
                        <CheckCircle className="h-2.5 w-2.5" />
                      )}
                      {getEventStatus(event)}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${event.isOnline ? "border-grey-200 text-grey-600 bg-grey-50/30" : "border-grey-200 text-grey-600 bg-grey-50/30"}`}
                    >
                      {event.isOnline ? "Online" : "In-Person"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-sans uppercase tracking-tight text-black flex items-center gap-2">
                    {event.title}
                  </h3>
                  <p className="text-grey-500 font-mono text-xs mt-1 line-clamp-1 max-w-xl">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-grey-100">
                <div className="text-grey-400 font-mono text-[10px] uppercase tracking-widest text-right">
                  <span className="block text-black font-bold mb-0.5">
                    {format(new Date(event.startDate), "HH:mm")} GMT
                  </span>
                  {event.endDate && (
                    <span className="text-[9px]">
                      Till {format(new Date(event.endDate), "HH:mm")}
                    </span>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 w-10 p-0 rounded-xl hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 p-1.5 rounded-xl border border-black shadow-xl bg-white font-mono"
                  >
                    <DropdownMenuItem
                      onClick={() => onEdit(event)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase font-bold cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      EDIT EVENT
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onDelete(event.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase font-bold text-red-600 cursor-pointer hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      DELETE EVENT
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
