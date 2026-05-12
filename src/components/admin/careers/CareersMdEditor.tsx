"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface CareersMdEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export function CareersMdEditor({ value, onChange }: CareersMdEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={280}
        preview="edit"
        visibleDragbar={false}
        style={{
          borderRadius: "0.75rem",
          border: "1px solid #f0f0f0",
          fontSize: "12px",
          fontFamily: "monospace",
        }}
      />
    </div>
  );
}
