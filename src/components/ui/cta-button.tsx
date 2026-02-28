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
          "relative group w-full sm:w-auto font-mono",
          wrapperClassName,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 block pointer-events-none translate-x-1 translate-y-1 bg-[#8c8c82]",
            offsetClassName,
          )}
        />
        <Comp
          // biome-ignore lint/suspicious/noExplicitAny: Radix Slot ref typing doesn't always align with button props
          ref={ref as any}
          className={cn(
            "relative z-10 w-full sm:w-auto h-12 flex items-center justify-center px-6 text-sm font-bold tracking-wider rounded-none transition-colors uppercase font-sans border-none bg-[#1B1B1B] text-white hover:bg-black",
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
