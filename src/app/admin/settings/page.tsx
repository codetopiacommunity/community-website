"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AccountForm } from "@/components/admin/settings/AccountForm";
import { AdminAccessPanel } from "@/components/admin/settings/AdminAccessPanel";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((data) => setCurrentEmail(data.email ?? ""))
      .catch(() => toast.error("Failed to load current settings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest animate-pulse">
          Loading secure profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <div className="pb-8 border-b border-zinc-100">
        <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
          Account Settings
        </h1>
        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
          Manage your administrative identity and secure access credentials
        </p>
      </div>

      <AccountForm initialEmail={currentEmail} onEmailSaved={setCurrentEmail} />
      <AdminAccessPanel currentEmail={currentEmail} />
    </div>
  );
}
