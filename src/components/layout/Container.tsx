import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-12", className)}>
            {children}
        </div>
    );
}
