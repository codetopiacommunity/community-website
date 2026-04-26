"use client";

import { KeyRound, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AccountFormProps {
  initialEmail: string;
  onEmailSaved: (email: string) => void;
}

export function AccountForm({ initialEmail, onEmailSaved }: AccountFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update settings");
      toast.success("Account settings updated.");
      onEmailSaved(email);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      {/* Email */}
      <section className="space-y-3">
        <div>
          <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900 flex items-center gap-2">
            <Mail className="w-4 h-4" /> Primary Identity
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            The email address used to log into this dashboard.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 p-6 space-y-3">
          <label
            htmlFor="email-address"
            className="font-mono text-[10px] font-bold text-zinc-600 uppercase tracking-widest"
          >
            Email Address
          </label>
          <input
            id="email-address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md h-10 bg-white border border-zinc-200 px-3 font-mono text-sm focus:outline-none focus:border-zinc-900 transition-colors text-zinc-900"
          />
        </div>
      </section>

      {/* Password */}
      <section className="space-y-3">
        <div>
          <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Access Credentials
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Update your password. Current password is required to save any
            changes.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4 md:border-r border-zinc-100 md:pr-8">
            <div className="border border-zinc-200 bg-zinc-50 p-3 flex gap-2">
              <Lock className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-zinc-700">
                You must verify your current password to save{" "}
                <strong>any</strong> changes.
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="current-password"
                className="font-mono text-[10px] font-bold text-zinc-600 uppercase tracking-widest"
              >
                Current Password *
              </label>
              <div className="relative">
                <KeyRound className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                <input
                  id="current-password"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-10 bg-white border border-zinc-200 pl-9 pr-3 font-mono text-sm focus:outline-none focus:border-zinc-900 transition-colors text-zinc-900"
                  placeholder="Enter current password"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="new-password"
                className="font-mono text-[10px] font-bold text-zinc-600 uppercase tracking-widest"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-10 bg-white border border-zinc-200 px-3 font-mono text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400"
                placeholder="Leave blank to keep unchanged"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="font-mono text-[10px] font-bold text-zinc-600 uppercase tracking-widest"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 bg-white border border-zinc-200 px-3 font-mono text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400"
                placeholder="Repeat new password"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving || !currentPassword}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
