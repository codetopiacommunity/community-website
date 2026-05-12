"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface BulletListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

const inputCls =
  "rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono";

export function BulletListEditor({
  items,
  onChange,
  placeholder = "Add item...",
  addLabel = "Add",
}: BulletListEditorProps) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setDraft("");
  };

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const update = (idx: number, value: string) => {
    onChange(items.map((item, i) => (i === idx ? value : item)));
  };

  return (
    <div className="space-y-3">
      {/* Existing items */}
      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ordered list
            <li key={idx} className="flex items-center gap-2">
              <span className="text-grey-300 font-mono text-xs shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <Input
                value={item}
                onChange={(e) => update(idx, e.target.value)}
                className={`${inputCls} flex-1`}
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-grey-300 hover:text-red-500 transition-colors shrink-0 p-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add new */}
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={`${inputCls} flex-1`}
        />
        <button
          type="button"
          onClick={add}
          className="h-11 px-4 bg-black text-white rounded-xl text-[10px] font-mono uppercase tracking-widest hover:bg-grey-800 transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}
