// biome-ignore-all lint/suspicious/noArrayIndexKey: string lists in this form may contain duplicates; composite keys using index are intentional
"use client";

import { ArrowLeft, Loader2, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  { value: "MEMBER", label: "Member" },
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "AMBASSADOR", label: "Ambassador" },
  { value: "CORE_TEAM", label: "Core Team" },
  { value: "DOMAIN_SPECIFIC", label: "Domain Specific" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];

interface Recognition {
  id: number;
  portalUsername: string;
  category: string;
  awardName: string;
  period: string;
  impactSummary: string;
  roleLabel: string | null;
  domain: string | null;
  achievements: string[];
  isPublished: boolean;
  order: number;
}

interface PortalMember {
  communityId: string;
  username: string;
  fullName: string;
  profilePictureUrl: string;
  communityRoles: string[];
}

const inputCls =
  "rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono";
const labelCls =
  "text-[10px] uppercase text-grey-500 font-bold tracking-widest";
const sectionCls = "bg-white border border-grey-100 rounded-2xl p-6 space-y-5";
const sectionHeadingCls =
  "text-[10px] font-mono uppercase tracking-widest text-grey-500 border-b border-grey-50 pb-3";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parsePeriod(value: string): { month: string; year: string } {
  // Accepts "May 2025" or legacy "Q1 2026" etc — just try to extract year
  const parts = value.trim().split(" ");
  const yearPart = parts.find((p) => /^\d{4}$/.test(p)) ?? "";
  const monthPart = MONTHS.find((m) => value.includes(m)) ?? "";
  return { month: monthPart, year: yearPart };
}

function PeriodPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { month, year } = parsePeriod(value);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) =>
    String(currentYear - 2 + i),
  );

  const selectCls =
    "h-11 px-3 text-xs font-mono border border-grey-100 bg-grey-50/50 text-black focus:border-black focus:bg-white outline-none transition-all appearance-none cursor-pointer";

  function update(newMonth: string, newYear: string) {
    if (newMonth && newYear) onChange(`${newMonth} ${newYear}`);
    else if (newMonth) onChange(newMonth);
    else if (newYear) onChange(newYear);
    else onChange("");
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <select
        value={month}
        onChange={(e) => update(e.target.value, year)}
        className={selectCls}
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={year}
        onChange={(e) => update(month, e.target.value)}
        className={selectCls}
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

function MemberPicker({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (username: string, member: PortalMember | null) => void;
}) {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<PortalMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const load = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("search", q.trim());
      const res = await fetch(`/api/admin/portal-users?${params.toString()}`);
      setMembers(res.ok ? await res.json() : []);
    } catch {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(search), 300);
    return () => clearTimeout(t);
  }, [search, load]);

  const selected = members.find((m) => m.username === value);

  return (
    <div className="space-y-3">
      {value && selected && (
        <div className="flex items-center gap-3 p-3 bg-grey-50/50 border border-grey-100 rounded-xl">
          {/* biome-ignore lint/performance/noImgElement: remote avatar */}
          <img
            src={
              selected.profilePictureUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selected.fullName)}`
            }
            alt=""
            className="h-9 w-9 rounded-full object-cover border border-grey-100 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-black font-mono truncate">
              {selected.fullName}
            </p>
            <p className="text-[10px] text-grey-400 font-mono truncate">
              @{selected.username}
              {selected.communityRoles.length
                ? ` · ${selected.communityRoles.join(", ")}`
                : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelect("", null)}
            className="text-grey-300 hover:text-red-500 transition-colors shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-grey-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={
            value ? "Search to change member…" : "Search portal members…"
          }
          className={`${inputCls} pl-9 w-full`}
        />
      </div>

      {focused && (
        <div className="border border-grey-100 rounded-xl overflow-hidden bg-white shadow-sm max-h-60 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-grey-300">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <p className="py-8 text-center font-mono text-[10px] uppercase tracking-widest text-grey-300">
              No members found
            </p>
          ) : (
            members.map((m) => (
              <button
                type="button"
                key={m.username}
                onMouseDown={() => onSelect(m.username, m)}
                className={`flex w-full items-center gap-3 border-b border-grey-50 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-grey-50/50 ${
                  value === m.username ? "bg-grey-50" : ""
                }`}
              >
                {/* biome-ignore lint/performance/noImgElement: remote avatar */}
                <img
                  src={
                    m.profilePictureUrl ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.fullName)}`
                  }
                  alt=""
                  className="h-8 w-8 rounded-full object-cover border border-grey-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-black font-mono">
                    {m.fullName}
                  </p>
                  <p className="truncate text-[10px] text-grey-400 font-mono">
                    @{m.username}
                    {m.communityRoles.length
                      ? ` · ${m.communityRoles.join(", ")}`
                      : ""}
                  </p>
                </div>
                {value === m.username && (
                  <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-black bg-grey-100 px-2 py-0.5 rounded-full shrink-0">
                    Selected
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function AchievementsEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    if (!draft.trim()) return;
    onChange([...items, draft.trim()]);
    setDraft("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="e.g. Led onboarding of 30+ new members…"
          className={`${inputCls} flex-1`}
        />
        <Button
          type="button"
          onClick={add}
          className="h-11 w-11 bg-black text-white rounded-xl flex items-center justify-center hover:bg-grey-800 shadow-none shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {items.length > 0 && (
        <div className="space-y-2 p-4 bg-grey-50/30 rounded-xl border border-dashed border-grey-200">
          {items.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="flex items-start gap-3 bg-white border border-grey-100 px-4 py-3 rounded-xl shadow-sm"
            >
              <span className="text-grey-300 font-mono text-xs mt-0.5">—</span>
              <span className="flex-1 text-xs font-mono text-grey-700 leading-relaxed">
                {item}
              </span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
                className="text-grey-200 hover:text-red-500 transition-colors shrink-0 mt-0.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface RecognitionFormProps {
  editing?: Recognition | null;
}

export function RecognitionForm({ editing }: RecognitionFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    portalUsername: editing?.portalUsername ?? "",
    category: (editing?.category ?? "MEMBER") as Category,
    awardName: editing?.awardName ?? "",
    period: editing?.period ?? "",
    impactSummary: editing?.impactSummary ?? "",
    roleLabel: editing?.roleLabel ?? "",
    domain: editing?.domain ?? "",
    achievements: editing?.achievements ?? ([] as string[]),
    isPublished: editing?.isPublished ?? true,
    order: editing?.order ?? 0,
  });

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.portalUsername) {
      toast.error("Please select a portal member.");
      return;
    }
    if (!form.awardName.trim() || !form.period.trim()) {
      toast.error("Award name and period are required.");
      return;
    }
    if (form.category === "DOMAIN_SPECIFIC" && !form.domain.trim()) {
      toast.error("Please specify the domain for a Domain Specific award.");
      return;
    }
    setSaving(true);
    try {
      const url = editing
        ? `/api/admin/recognition/${editing.id}`
        : "/api/admin/recognition";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Recognition updated." : "Recognition created.");
      router.push("/admin/recognition");
    } catch {
      toast.error("Failed to save recognition.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <Link
            href="/admin/recognition"
            className="inline-flex items-center gap-2 text-grey-400 hover:text-black font-mono text-[10px] uppercase tracking-widest transition-colors group mb-4"
          >
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            Back to Wall of Impact
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            {editing ? (
              <>
                Edit <span className="text-grey-400">Honoree</span>
              </>
            ) : (
              <>
                Add <span className="text-grey-400">Honoree</span>
              </>
            )}
          </h1>
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium font-mono mt-1">
            {editing
              ? "Update this Wall of Impact entry"
              : "Recognise a community member on the Wall of Impact"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Member */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>Portal Member</h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                Search and select the member being recognised
              </p>
              <MemberPicker
                value={form.portalUsername}
                onSelect={(username) => set("portalUsername", username)}
              />
            </div>

            {/* Award details */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>Award Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={labelCls}>
                    Award Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    required
                    placeholder="e.g. Exceptional Mentorship"
                    value={form.awardName}
                    onChange={(e) => set("awardName", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={labelCls}>
                    Period <span className="text-red-500">*</span>
                  </Label>
                  <PeriodPicker
                    value={form.period}
                    onChange={(v) => set("period", v)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={labelCls}>Category</Label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => set("category", cat.value)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest font-bold transition-all border ${
                        form.category === cat.value
                          ? "bg-black text-white border-black"
                          : "bg-grey-50/50 text-grey-500 border-grey-100 hover:border-grey-300 hover:text-black"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.category === "DOMAIN_SPECIFIC" && (
                <div className="space-y-2">
                  <Label className={labelCls}>
                    Domain <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. Backend Engineering, UI/UX Design, DevOps, Content Creation…"
                    value={form.domain}
                    onChange={(e) => set("domain", e.target.value)}
                    className={inputCls}
                  />
                  <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest">
                    The specific area of excellence this award recognises
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label className={labelCls}>
                  Role Label{" "}
                  <span className="text-grey-300 normal-case font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  placeholder="e.g. Community Mentor (overrides their portal role)"
                  value={form.roleLabel}
                  onChange={(e) => set("roleLabel", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Impact summary */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>Impact Summary</h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                A short, compelling description of their contribution (shown on
                the card and detail view)
              </p>
              <Textarea
                required
                placeholder="e.g. Mentored over 20 junior developers, consistently going above and beyond to support the community…"
                value={form.impactSummary}
                onChange={(e) => set("impactSummary", e.target.value)}
                className="rounded-xl border border-grey-100 bg-grey-50/50 min-h-[100px] px-4 py-3 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 resize-none font-mono"
              />
            </div>

            {/* Key achievements */}
            <div className={sectionCls}>
              <h2 className={sectionHeadingCls}>
                Key Achievements{" "}
                <span className="text-grey-300 normal-case font-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest -mt-2">
                Bullet-point highlights shown in the detail modal
              </p>
              <AchievementsEditor
                items={form.achievements}
                onChange={(items) => set("achievements", items)}
              />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-grey-100 rounded-2xl p-6 space-y-5 sticky top-24">
              <h2 className={sectionHeadingCls}>Settings</h2>

              <div className="space-y-2">
                <Label className={labelCls}>Display Order</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => set("order", Number(e.target.value) || 0)}
                  className={inputCls}
                />
                <p className="text-[9px] font-mono text-grey-400 uppercase tracking-widest">
                  Lower number appears first
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-grey-50/50 rounded-xl border border-grey-100">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold text-black uppercase tracking-tight font-sans">
                    Published
                  </Label>
                  <p className="text-[9px] text-grey-400 font-mono uppercase tracking-widest">
                    Visible on the public site
                  </p>
                </div>
                <Switch
                  checked={form.isPublished}
                  onCheckedChange={(val) => set("isPublished", val)}
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  disabled={saving}
                  type="submit"
                  className="w-full bg-black text-white text-[10px] uppercase h-12 rounded-xl hover:bg-grey-900 font-bold tracking-widest shadow-none flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      SAVING...
                    </>
                  ) : editing ? (
                    "SAVE CHANGES"
                  ) : (
                    "ADD HONOREE"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/admin/recognition")}
                  disabled={saving}
                  className="w-full h-11 rounded-xl text-[10px] uppercase font-mono tracking-widest hover:bg-grey-50 text-grey-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
