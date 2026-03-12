import { Slot } from "radix-ui";
import React from "react";
import { cn } from "@/lib/utils";

export interface CtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  wrapperClassName?: string;
  offsetClassName?: string;
  asChild?: boolean;
}

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  (
    {
      className,
      label,
      children,
      wrapperClassName,
      offsetClassName,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "button";

    return (
      <div
        className={cn(
          "relative group w-full sm:w-auto font-sans",
          wrapperClassName,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 border border-white translate-x-[4px] translate-y-[4px] pointer-events-none group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300",
            offsetClassName,
          )}
        />
        <Comp
          // biome-ignore lint/suspicious/noExplicitAny: Radix Slot ref typing doesn't always align with button props
          ref={ref as any}
          className={cn(
            "relative z-10 w-full sm:w-auto h-14 sm:h-16 px-8 flex items-center justify-center bg-[#18181b] text-white border border-white font-bold uppercase tracking-widest text-sm hover:bg-zinc-900 transition-colors duration-300",
            className,
          )}
          {...props}
        >
          {children || label}
        </Comp>
      </div>
    );
  },
);
CtaButton.displayName = "CtaButton";
