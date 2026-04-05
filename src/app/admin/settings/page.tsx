"use client";

import {
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AdminUser {
  id: number;
  email: string;
  createdAt: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  // Admin access list
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email || "");
          setCurrentEmail(data.email || "");
        }
      } catch {
        toast.error("Failed to load current settings");
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const res = await fetch("/api/admin/admins");
        if (res.ok) setAdmins(await res.json());
      } finally {
        setAdminsLoading(false);
      }
    }
    fetchAdmins();
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
      toast.success("Account settings updated.");
      setCurrentEmail(email);
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

  async function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    setAddingAdmin(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newAdminEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to add admin");
        return;
      }
      setAdmins((prev) => [...prev, data]);
      setNewAdminEmail("");
      toast.success(`Admin added — initial password is their email address`);
    } finally {
      setAddingAdmin(false);
    }
  }

  async function handleRemoveAdmin(id: number) {
    setRemovingId(id);
    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to remove admin");
        return;
      }
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      toast.success("Admin removed");
    } finally {
      setRemovingId(null);
    }
  }

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
        {/* Email */}
        <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-sm">
          <div className="border-b border-grey-100 bg-grey-50/50 p-6">
            <h2 className="text-lg font-bold text-grey-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-grey-600" />
              Primary Identity
            </h2>
            <p className="text-sm text-grey-500 mt-1">
              The email address used to log into this dashboard.
            </p>
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

        {/* Password */}
        <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-sm">
          <div className="border-b border-grey-100 bg-grey-50/50 p-6">
            <h2 className="text-lg font-bold text-grey-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-grey-600" />
              Access Credentials
            </h2>
            <p className="text-sm text-grey-500 mt-1">
              Update your password. Current password is required to save any
              changes.
            </p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-6 md:border-r border-grey-100 md:pr-8">
              <div className="rounded-xl border border-grey-300 bg-grey-50/50 p-4 flex gap-3">
                <Lock className="w-5 h-5 text-grey-700 shrink-0 mt-0.5" />
                <p className="text-sm text-grey-800 leading-relaxed font-medium">
                  You must verify your current password to save{" "}
                  <strong>any</strong> changes.
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

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={saving || !currentPassword}
            className="flex items-center justify-center gap-2 bg-black text-white px-8 h-12 rounded-xl text-sm font-semibold hover:bg-grey-900 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Profile Changes"
            )}
          </Button>
        </div>
      </form>

      {/* Admin Access */}
      <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-sm">
        <div className="border-b border-grey-100 bg-grey-50/50 p-6">
          <h2 className="text-lg font-bold text-grey-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-grey-600" />
            Admin Access
          </h2>
          <p className="text-sm text-grey-500 mt-1">
            Manage who has access to this dashboard. New admins log in with
            their email as the initial password.
          </p>
        </div>

        {/* Add admin form */}
        <div className="p-6 border-b border-grey-100">
          <form onSubmit={handleAddAdmin} className="flex gap-3 max-w-md">
            <input
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="new@admin.com"
              className="flex-1 h-11 bg-white border border-grey-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-lg transition-shadow font-mono"
            />
            <Button
              type="submit"
              disabled={addingAdmin || !newAdminEmail.trim()}
              className="h-11 px-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
            >
              {addingAdmin ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              Add Admin
            </Button>
          </form>
        </div>

        {/* Admin list */}
        <div className="divide-y divide-grey-100">
          {adminsLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-grey-400" />
            </div>
          ) : admins.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-grey-400">
              No admins found
            </p>
          ) : (
            admins.map((admin) => {
              const isYou = admin.email === currentEmail;
              return (
                <div
                  key={admin.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-grey-100 border border-grey-200 flex items-center justify-center text-[10px] font-black text-grey-600 uppercase">
                      {admin.email[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-grey-900 font-mono">
                        {admin.email}
                      </p>
                      <p className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">
                        Added{" "}
                        {new Date(admin.createdAt).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                        {isYou && (
                          <span className="ml-2 text-black font-black">
                            · YOU
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {!isYou && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmin(admin.id)}
                      disabled={removingId === admin.id}
                      className="p-2 rounded-lg text-grey-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      aria-label={`Remove ${admin.email}`}
                    >
                      {removingId === admin.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
