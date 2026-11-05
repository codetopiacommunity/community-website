"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";

/** Shows once the reader is well down a long page. */
const SHOW_AFTER_PX = 800;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 xl:hidden">
      <Container className="flex justify-end px-6">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0 })}
          className="pointer-events-auto flex size-12 cursor-pointer items-center justify-center rounded-none border border-border bg-background text-foreground transition-colors duration-200 hover:bg-muted"
        >
          <ArrowUp aria-hidden="true" className="size-5" />
        </button>
      </Container>
    </div>
  );
}
