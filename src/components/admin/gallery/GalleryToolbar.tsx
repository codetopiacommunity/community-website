"use client";

import { Filter, Search } from "lucide-react";
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
  const activeFilter = filterCategory !== "" ? filterCategory : null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative flex-1 group w-full font-mono">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-400 group-focus-within:text-black transition-colors" />
        <Input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-grey-50/50 border border-grey-100 rounded-xl pl-12 pr-4 text-xs focus:border-black focus:ring-0 transition-all text-black placeholder:text-grey-400 focus:bg-white h-12 font-medium"
        />
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
              {activeFilter && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-30" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-black border-2 border-white" />
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-black rounded-xl p-1.5 font-mono shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-200"
          >
            <DropdownMenuLabel className="text-[10px] uppercase text-grey-500 font-bold tracking-widest px-2 py-1.5">
              Filter By Category
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-grey-100 mb-1" />
            <DropdownMenuItem
              onClick={() => setFilterCategory("")}
              className={`text-xs font-bold px-3 py-2.5 mb-1 cursor-pointer rounded-lg transition-colors outline-none focus:bg-black focus:text-white ${!activeFilter ? "bg-black text-white" : "text-black bg-transparent"}`}
            >
              All Categories
            </DropdownMenuItem>
            {GALLERY_CATEGORIES.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs font-bold px-3 py-2.5 mb-1 cursor-pointer rounded-lg transition-colors outline-none focus:bg-black focus:text-white ${filterCategory === cat ? "bg-black text-white" : "text-black bg-transparent"}`}
              >
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
