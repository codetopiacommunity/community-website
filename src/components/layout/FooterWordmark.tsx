"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * The big wordmark that opens the footer on every page. Sized in vw so the
 * one word always spans the screen, and hidden from screen readers: it is
 * decoration, the logo below already names us.
 *
 * It rises into place from below the first time it scrolls into view. The
 * wrapper clips it, so the word comes up out of the footer's edge rather
 * than floating over the page above. The wrapper is what is watched: the
 * word itself starts mostly clipped, so it would never count as in view.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const shown = inView || reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden
      className="w-full overflow-hidden pt-10 sm:pt-14 select-none pointer-events-none"
    >
      <motion.p
        initial={false}
        animate={shown ? { y: 0, opacity: 1 } : { y: "70%", opacity: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
        }
        className="font-sans font-black uppercase leading-none text-white/[0.1] whitespace-nowrap text-[14.5vw] tracking-tight w-full text-center"
      >
        Community
      </motion.p>
    </div>
  );
}
