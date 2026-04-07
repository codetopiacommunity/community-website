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
      className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest border border-border text-muted-foreground hover:text-foreground hover:border-foreground px-3 py-2 transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
