"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PRESET_TYPES = ["Full-time", "Part-time", "Internship", "Volunteer"];

const inputCls =
  "rounded-xl border border-grey-100 bg-grey-50/50 h-11 px-4 text-xs font-medium text-black placeholder:text-grey-300 focus:border-black focus:bg-white transition-all outline-none ring-0 font-mono w-full";

interface EmploymentTypeComboboxProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function EmploymentTypeCombobox({
  value,
  onChange,
  required,
}: EmploymentTypeComboboxProps) {
  const isCustom = value !== "" && !PRESET_TYPES.includes(value);
  const [open, setOpen] = useState(false);
  const [customMode, setCustomMode] = useState(isCustom);
  const [customInput, setCustomInput] = useState(isCustom ? value : "");
  const containerRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  // Sync if parent resets value (e.g. form reset)
  useEffect(() => {
    const nowCustom = value !== "" && !PRESET_TYPES.includes(value);
    setCustomMode(nowCustom);
    if (nowCustom) setCustomInput(value);
    else if (value === "") setCustomInput("");
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus custom input when switching to custom mode
  useEffect(() => {
    if (customMode) customInputRef.current?.focus();
  }, [customMode]);

  const selectPreset = (type: string) => {
    setCustomMode(false);
    setCustomInput("");
    onChange(type);
    setOpen(false);
  };

  const enterCustomMode = () => {
    setCustomMode(true);
    setCustomInput("");
    onChange("");
    setOpen(false);
  };

  const clearCustom = () => {
    setCustomMode(false);
    setCustomInput("");
    onChange("");
  };

  if (customMode) {
    return (
      <div className="relative">
        <input
          ref={customInputRef}
          required={required}
          value={customInput}
          onChange={(e) => {
            setCustomInput(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="e.g. Contract, Freelance..."
          className={inputCls}
        />
        <button
          type="button"
          onClick={clearCustom}
          title="Back to presets"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-300 hover:text-black transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for required validation */}
      <input
        tabIndex={-1}
        required={required}
        value={value}
        onChange={() => {}}
        className="absolute inset-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-11 w-full rounded-xl border border-grey-100 bg-grey-50/50 px-4 text-xs font-mono text-left flex items-center justify-between transition-all hover:border-grey-300 focus:border-black focus:bg-white outline-none"
      >
        <span className={value ? "text-black" : "text-grey-300"}>
          {value || "Select type"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-grey-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-grey-100 rounded-xl shadow-xl overflow-hidden">
          {PRESET_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => selectPreset(type)}
              className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-colors hover:bg-grey-50 ${
                value === type
                  ? "bg-black text-white hover:bg-black"
                  : "text-black"
              }`}
            >
              {type}
            </button>
          ))}
          <div className="border-t border-grey-50">
            <button
              type="button"
              onClick={enterCustomMode}
              className="w-full text-left px-4 py-2.5 text-xs font-mono text-grey-400 hover:bg-grey-50 hover:text-black transition-colors"
            >
              + Custom type...
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
