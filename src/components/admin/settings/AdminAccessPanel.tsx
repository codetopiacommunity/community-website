"use client";

import { Loader2, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AdminUser {
  id: number;
  email: string;
  createdAt: string;
}

interface AdminAccessPanelProps {
  currentEmail: string;
}

export function AdminAccessPanel({ currentEmail }: AdminAccessPanelProps) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/admins")
      .then((r) => r.json())
      .then((data) => setAdmins(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    setAdding(true);
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
      toast.success("Admin added — initial password is their email address");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: number) {
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

  return (
    <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-sm">
      <div className="border-b border-grey-100 bg-grey-50/50 p-6">
        <h2 className="text-lg font-bold text-grey-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-grey-600" />
          Admin Access
        </h2>
        <p className="text-sm text-grey-500 mt-1">
          Manage who has access to this dashboard. New admins log in with their
          email as the initial password.
        </p>
      </div>

      <div className="p-6 border-b border-grey-100">
        <form onSubmit={handleAdd} className="flex gap-3 max-w-md">
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="new@admin.com"
            className="flex-1 h-11 bg-white border border-grey-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-lg transition-shadow font-mono"
          />
          <Button
            type="submit"
            disabled={adding || !newAdminEmail.trim()}
            className="h-11 px-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
          >
            {adding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            Add Admin
          </Button>
        </form>
      </div>

      <div className="divide-y divide-grey-100">
        {loading ? (
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
                      {new Date(admin.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
                    onClick={() => handleRemove(admin.id)}
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
  );
}
