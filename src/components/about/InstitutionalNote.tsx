import { cn } from "@/lib/utils";

interface InstitutionalNoteProps {
  className?: string;
}

export function InstitutionalNote({ className }: InstitutionalNoteProps) {
  return (
    <div className={cn("p-8 bg-zinc-950 border border-zinc-900", className)}>
      <p className="text-zinc-500 font-mono text-[10px] leading-relaxed uppercase tracking-[0.2em]">
        This recognition is a permanent record of excellence within the
        Codetopia Collective. It stands as a testament to the individual's
        commitment to technical mastery and community growth.
      </p>
    </div>
  );
}
