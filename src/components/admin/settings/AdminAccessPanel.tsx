"use client";

import { Loader2, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    <section className="space-y-3">
      <div>
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900 flex items-center gap-2">
          <Users className="w-4 h-4" /> Admin Access
        </h2>
        <p className="font-mono text-xs text-zinc-400 mt-0.5">
          Manage who has access to this dashboard. New admins log in with their
          email as the initial password.
        </p>
      </div>

      <div className="bg-white border border-zinc-200 overflow-hidden">
        {/* Add admin form */}
        <div className="p-6 border-b border-zinc-100">
          <form onSubmit={handleAdd} className="flex gap-3 max-w-md">
            <input
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="new@admin.com"
              className="flex-1 h-9 bg-white border border-zinc-200 px-3 font-mono text-xs focus:outline-none focus:border-zinc-900 transition-colors text-zinc-900 placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={adding || !newAdminEmail.trim()}
              className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {adding ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Plus className="h-3 w-3" />
              )}
              Add
            </button>
          </form>
        </div>

        {/* Admin list */}
        <div className="divide-y divide-zinc-100">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
            </div>
          ) : admins.length === 0 ? (
            <p className="px-6 py-10 text-center font-mono text-sm text-zinc-400">
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
                    <div className="h-8 w-8 border border-zinc-200 flex items-center justify-center font-mono text-[10px] font-black text-zinc-600 uppercase bg-zinc-50">
                      {admin.email[0]}
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold text-zinc-900">
                        {admin.email}
                      </p>
                      <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        Added{" "}
                        {new Date(admin.createdAt).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                        {isYou && (
                          <span className="ml-2 text-zinc-900 font-black">
                            · You
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
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
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
    </section>
  );
}
