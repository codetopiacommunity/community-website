"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CareersToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
}

export function CareersToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: CareersToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-400" />
        <Input
          placeholder="Search positions, companies, or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-12 bg-white border-grey-200 rounded-xl text-xs font-medium focus:ring-black/5 focus:border-black transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-grey-400 hover:text-black transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="w-full sm:w-48">
        <Select
          value={statusFilter || "all"}
          onValueChange={(val) => setStatusFilter(val === "all" ? null : val)}
        >
          <SelectTrigger className="h-12 bg-white border-grey-200 rounded-xl text-xs font-mono uppercase tracking-widest text-grey-600 focus:ring-black/5">
            <SelectValue placeholder="STATUS" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-grey-200 shadow-xl">
            <SelectItem
              value="all"
              className="text-[10px] font-mono uppercase tracking-widest p-3"
            >
              All Status
            </SelectItem>
            <SelectItem
              value="open"
              className="text-[10px] font-mono uppercase tracking-widest p-3"
            >
              Open Only
            </SelectItem>
            <SelectItem
              value="closed"
              className="text-[10px] font-mono uppercase tracking-widest p-3"
            >
              Closed Only
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
