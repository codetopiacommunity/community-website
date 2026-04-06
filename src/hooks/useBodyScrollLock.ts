"use client";

import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [locked]);
}
