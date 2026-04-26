"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PublicationHostFormProps {
  hashnodeHost: string | null;
  onSuccess: () => void;
}

const inputCls =
  "rounded-none border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono";
const labelCls =
  "text-[10px] uppercase text-grey-500 font-bold tracking-widest";

export function PublicationHostForm({
  hashnodeHost,
  onSuccess,
}: PublicationHostFormProps) {
  const [host, setHost] = useState(hashnodeHost ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!host.trim()) {
      setError("Publication host is required");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/articles/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashnodeHost: host.trim() }),
      });

      if (res.ok) {
        toast.success("Publication host saved");
        onSuccess();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className={labelCls}>
          Hashnode Publication Host <span className="text-red-500">*</span>
        </Label>
        <Input
          value={host}
          onChange={(e) => {
            setHost(e.target.value);
            if (error) setError(null);
          }}
          className={inputCls}
          placeholder="codetopia.hashnode.dev"
        />
        {error && (
          <p className="text-[10px] text-red-500 font-mono font-medium">
            {error}
          </p>
        )}
        <p className="text-[10px] text-grey-400 font-mono">
          Enter your Hashnode publication host, e.g.{" "}
          <span className="text-grey-600 font-semibold">
            codetopia.hashnode.dev
          </span>
          . This is used to fetch articles from your Hashnode publication.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="bg-black text-white text-[10px] uppercase px-10 h-11 rounded-none active:scale-[0.98] transition-all border border-black hover:bg-zinc-900 font-bold tracking-widest shadow-none flex items-center gap-2 font-mono"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              SAVING
            </>
          ) : (
            "SAVE HOST"
          )}
        </Button>
      </div>
    </form>
  );
}
