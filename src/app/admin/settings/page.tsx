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
        <Loader2 className="w-8 h-8 animate-spin text-grey-400" />
        <p className="text-sm font-medium text-grey-500 animate-pulse">
          Loading secure profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-grey-900 font-sans">
          Account Settings
        </h1>
        <p className="text-grey-500 text-sm font-medium">
          Manage your administrative identity and secure access credentials.
        </p>
      </div>

      <AccountForm initialEmail={currentEmail} onEmailSaved={setCurrentEmail} />
      <AdminAccessPanel currentEmail={currentEmail} />
    </div>
  );
}
