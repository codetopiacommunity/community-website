"use client";

import { Moon, Sun } from "lucide-react";
import { useContentTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useContentTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200 shrink-0
        dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white
        border-zinc-300 text-zinc-600 hover:border-zinc-800 hover:text-zinc-900 bg-transparent"
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
