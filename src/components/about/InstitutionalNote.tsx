import { cn } from "@/lib/utils";

interface InstitutionalNoteProps {
  className?: string;
}

export function InstitutionalNote({ className }: InstitutionalNoteProps) {
  return (
    <div className={cn("p-8 bg-zinc-950 border border-zinc-900", className)}>
      <p className="uppercase tracking-[0.2em] text-zinc-400 font-mono text-xs leading-relaxed">
        This recognition is a permanent thank-you from the community. It honours
        people who made a real difference to others here, through code, design,
        events, writing or helping someone who was stuck.
      </p>
    </div>
  );
}
