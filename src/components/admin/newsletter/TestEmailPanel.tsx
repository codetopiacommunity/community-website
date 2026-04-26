"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Newsletter } from "./NewsletterComposePage";

function isValidEmail(email: string): boolean {
  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;
  const domain = email.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  return dot > 0 && dot < domain.length - 1 && !email.includes(" ");
}

interface TestEmailPanelProps {
  newsletter: Pick<Newsletter, "subject" | "previewText" | "markdownContent">;
}

export function TestEmailPanel({ newsletter }: TestEmailPanelProps) {
  const [show, setShow] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!isValidEmail(testEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/admin/newsletter/test-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testEmail,
          subject: newsletter.subject,
          previewText: newsletter.previewText,
          markdownContent: newsletter.markdownContent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to send test email");
      } else {
        toast.success("Test email sent");
        setShow(false);
      }
    } catch {
      toast.error("Failed to send test email");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-none border border-grey-100 bg-white p-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-black">
          TEST EMAIL
        </p>
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-[10px] font-black uppercase tracking-widest text-grey-500 hover:text-black transition-colors"
        >
          {show ? "CANCEL" : "SEND TEST →"}
        </button>
      </div>
      {show && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="email"
              value={testEmail}
              onChange={(e) => {
                setTestEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="test@example.com"
              className="font-mono text-sm border-black rounded-none h-11 flex-1"
              aria-invalid={!!error}
            />
            <Button
              onClick={handleSend}
              disabled={sending}
              className="h-11 rounded-none bg-black text-white text-[10px] font-black uppercase tracking-widest px-5"
            >
              {sending ? "SENDING..." : "SEND"}
            </Button>
          </div>
          {error && (
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
