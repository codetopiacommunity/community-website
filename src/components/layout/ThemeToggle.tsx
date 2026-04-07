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
      className="p-2 text-grey-300 hover:text-grey-50 transition-colors outline-none"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
