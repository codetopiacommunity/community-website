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
      className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-zinc-600 text-zinc-400 hover:text-white hover:border-white px-4 py-2 transition-colors shrink-0"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
