import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OffsetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  asChild?: boolean;
  wrapperClassName?: string;
  offsetClassName?: string;
}

export const OffsetButton = React.forwardRef<
  HTMLButtonElement,
  OffsetButtonProps
>(
  (
    { className, label, children, wrapperClassName, offsetClassName, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative group w-full sm:w-auto font-mono",
          wrapperClassName,
        )}
      >
        {/* Offset block */}
        <div
          className={cn(
            "absolute inset-0 bg-[#8c8c82] translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 block pointer-events-none",
            offsetClassName,
          )}
        />
        <Button
          ref={ref}
          {...props}
          className={cn(
            "relative z-10 w-full sm:w-auto bg-[#1B1B1B] text-white hover:bg-black hover:text-white border-none h-12 px-6 text-sm font-bold tracking-wider rounded-none transition-colors",
            className,
          )}
        >
          {children || label}
        </Button>
      </div>
    );
  },
);
OffsetButton.displayName = "OffsetButton";
