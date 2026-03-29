"use client";

import { Calendar, CheckCircle, Clock, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface EventsToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string | null;
  setStatusFilter: (val: string | null) => void;
}

export function EventsToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: EventsToolbarProps) {
  const filters = [
    { label: "ALL EVENTS", value: null, icon: null },
    { label: "UPCOMING", value: "UPCOMING", icon: Calendar },
    { label: "LIVE NOW", value: "LIVE", icon: Clock },
    { label: "COMPLETED", value: "COMPLETED", icon: CheckCircle },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative flex-1 group w-full font-mono">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-400 group-focus-within:text-black transition-colors" />
        <Input
          type="text"
          placeholder="SEARCH EVENTS BY TITLE OR BRIEF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-grey-50/50 border border-grey-100 rounded-xl pl-12 pr-12 text-xs focus:border-black focus:ring-0 transition-all text-black placeholder:text-grey-400 focus:bg-white h-12 font-medium"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-lg bg-grey-100 hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="flex gap-2 w-full sm:w-auto font-mono">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative flex-1 sm:flex-none flex items-center gap-2 border border-grey-100 px-6 h-12 rounded-xl text-xs uppercase text-black hover:border-black transition-all bg-white hover:bg-grey-50 font-bold tracking-widest"
            >
              <Filter className="h-4 w-4" />
              FILTER
              {statusFilter && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-30"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-black border-2 border-white"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-black rounded-xl p-1.5 font-mono shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-200"
          >
            <DropdownMenuLabel className="text-[10px] uppercase text-grey-500 font-bold tracking-widest px-2 py-1.5">
              Filter By Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-grey-100 mb-1" />
            {filters.map((f) => {
              const Icon = f.icon;
              return (
                <DropdownMenuItem
                  key={f.label}
                  onClick={() => setStatusFilter(f.value)}
                  className={`text-xs font-bold px-3 py-2.5 mb-1 cursor-pointer rounded-lg transition-colors flex items-center gap-2 outline-none focus:bg-black focus:text-white ${statusFilter === f.value ? "bg-black text-white" : "text-black bg-transparent"}`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {f.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
