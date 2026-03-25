"use client";

import { KeyRound, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email || "");
        }
      } catch (_err) {
        toast.error("Failed to load current settings");
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Current password is required to save changes.");
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

      toast.success("Account settings securely updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSaving(false);
    }
  };

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

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Email Settings Block */}
        <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-sm">
          <div className="border-b border-grey-100 bg-grey-50/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-grey-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-grey-600" />
                Primary Identity
              </h2>
              <p className="text-sm text-grey-500 mt-1">
                The email address used to log into this dashboard and receive
                system alerts.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-md space-y-3">
              <label
                htmlFor="email-address"
                className="text-xs font-bold text-grey-700 uppercase tracking-wide"
              >
                Email Address
              </label>
              <input
                id="email-address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 bg-white border border-grey-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-lg transition-shadow text-grey-900 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Security Settings Block */}
        <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-sm">
          <div className="border-b border-grey-100 bg-grey-50/50 p-6">
            <h2 className="text-lg font-bold text-grey-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-grey-600" />
              Access Credentials
            </h2>
            <p className="text-sm text-grey-500 mt-1">
              Update your password or verify existing credentials to safely push
              system modifications.
            </p>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Required Verification Column */}
            <div className="space-y-6 md:border-r border-grey-100 md:pr-8">
              <div className="rounded-xl border border-grey-300 bg-grey-50/50 p-4 flex gap-3">
                <Lock className="w-5 h-5 text-grey-700 shrink-0 mt-0.5" />
                <p className="text-sm text-grey-800 leading-relaxed font-medium">
                  Authentication checkpoint: You must verify your current active
                  password in order to save <strong>any</strong> changes to your
                  profile.
                </p>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="current-password"
                  className="text-xs font-bold text-grey-700 uppercase tracking-wide"
                >
                  Current Password *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-grey-400 absolute left-3.5 top-3.5" />
                  <input
                    id="current-password"
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-11 bg-white border border-grey-300 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-lg transition-shadow text-grey-900"
                    placeholder="Enter current password"
                  />
                </div>
              </div>
            </div>

            {/* Optional New Password Column */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="new-password"
                  className="text-xs font-bold text-grey-700 uppercase tracking-wide"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 bg-white border border-grey-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-lg transition-shadow placeholder:text-grey-400 font-medium"
                  placeholder="Leave blank to keep unchanged"
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="confirm-password"
                  className="text-xs font-bold text-grey-700 uppercase tracking-wide"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 bg-white border border-grey-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-lg transition-shadow placeholder:text-grey-400 font-medium"
                  placeholder="Repeat new password"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Belt */}
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={saving || !currentPassword}
            className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-sm font-semibold hover:bg-grey-900 transition-all active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Save Profile Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
