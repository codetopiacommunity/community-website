"use client";

import {
  ArrowRight,
  Calendar,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  Users2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { COMMAND_DEFS } from "./commandPaletteCommands";

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4" />,
  Calendar: <Calendar className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  Image: <ImageIcon className="h-4 w-4" />,
  Star: <Star className="h-4 w-4" />,
  Users2: <Users2 className="h-4 w-4" />,
  Mail: <Mail className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  Plus: <Plus className="h-4 w-4" />,
  Trash2: <Trash2 className="h-4 w-4" />,
};

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
  group: string;
  variant?: "danger";
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = COMMAND_DEFS.map((def) => ({
    ...def,
    icon: ICON_MAP[def.iconName],
    action: () => router.push(def.path),
  }));

  const filtered = query.trim()
    ? commands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.description?.toLowerCase().includes(q) ||
          cmd.keywords.some((k) => k.includes(q)) ||
          cmd.group.toLowerCase().includes(q)
        );
      })
    : commands;

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  const flat = Object.values(grouped).flat();

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flat[activeIndex]) {
      flat[activeIndex].action();
      onClose();
    }
  }

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl bg-white rounded-none border border-grey-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-grey-100">
          <Search className="h-4 w-4 text-grey-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or type a command..."
            className="flex-1 text-sm font-mono outline-none placeholder:text-grey-300 bg-transparent"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-grey-200 text-[10px] font-mono text-grey-400">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[380px] overflow-y-auto py-2">
          {flat.length === 0 ? (
            <p className="px-4 py-10 text-center text-[11px] font-mono text-grey-400 uppercase tracking-widest">
              No results for "{query}"
            </p>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <p className="px-4 pt-3 pb-1 text-[9px] font-black uppercase tracking-widest text-grey-400">
                  {group}
                </p>
                {items.map((cmd) => {
                  const globalIndex = flat.indexOf(cmd);
                  const isActive = globalIndex === activeIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      data-index={globalIndex}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        isActive ? "bg-black text-white" : "hover:bg-grey-50"
                      }`}
                    >
                      <span
                        className={`shrink-0 ${isActive ? "text-white" : cmd.variant === "danger" ? "text-red-500" : "text-grey-500"}`}
                      >
                        {cmd.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={`block text-sm font-semibold truncate ${cmd.variant === "danger" && !isActive ? "text-red-600" : ""}`}
                        >
                          {cmd.label}
                        </span>
                        {cmd.description && (
                          <span
                            className={`block text-[10px] font-mono truncate ${isActive ? "text-grey-300" : "text-grey-400"}`}
                          >
                            {cmd.description}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        className={`h-3 w-3 shrink-0 ${isActive ? "text-grey-300" : "text-grey-200"}`}
                      />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-grey-100 flex items-center gap-4">
          <span className="text-[9px] font-mono text-grey-400 uppercase tracking-widest flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded border border-grey-200">↑↓</kbd>{" "}
            navigate
          </span>
          <span className="text-[9px] font-mono text-grey-400 uppercase tracking-widest flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded border border-grey-200">↵</kbd>{" "}
            select
          </span>
          <span className="text-[9px] font-mono text-grey-400 uppercase tracking-widest flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded border border-grey-200">⌘K</kbd>{" "}
            toggle
          </span>
        </div>
      </div>
    </div>
  );
}
