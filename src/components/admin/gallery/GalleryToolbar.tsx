"use client";

import { Filter, Search, X } from "lucide-react";
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

const GALLERY_CATEGORIES = [
  "Events",
  "Workshops",
  "Meetups",
  "Hackathons",
  "Community",
  "Other",
];

export function GalleryToolbar({
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
}: {
  search: string;
  setSearch: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-zinc-200 pl-9 pr-9 font-mono text-xs text-zinc-900 placeholder:text-zinc-400 h-9 focus:border-zinc-900 focus:ring-0 transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="relative flex items-center gap-2 border border-zinc-200 px-4 h-9 font-mono text-xs uppercase tracking-widest text-zinc-900 hover:border-zinc-900 hover:bg-white transition-colors bg-white font-bold"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
            {filterCategory && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-black" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 bg-white border border-zinc-200 p-1 font-mono shadow-lg"
        >
          <DropdownMenuLabel className="font-mono text-[10px] uppercase text-zinc-400 tracking-widest px-2 py-1.5">
            Filter by Category
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-100" />
          <DropdownMenuItem
            onClick={() => setFilterCategory("")}
            className={`text-xs font-bold px-3 py-2 cursor-pointer transition-colors focus:bg-black focus:text-white ${!filterCategory ? "bg-black text-white" : "text-zinc-900"}`}
          >
            All Categories
          </DropdownMenuItem>
          {GALLERY_CATEGORIES.map((cat) => (
            <DropdownMenuItem
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs font-bold px-3 py-2 cursor-pointer transition-colors focus:bg-black focus:text-white ${filterCategory === cat ? "bg-black text-white" : "text-zinc-900"}`}
            >
              {cat}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
