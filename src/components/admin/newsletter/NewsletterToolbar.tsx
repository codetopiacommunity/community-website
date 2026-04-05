"use client";

import {
  AlignLeft,
  Bold,
  ChevronDown,
  Code,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
  Table,
  Type,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface ToolItem {
  label: string;
  icon?: React.ReactNode;
  syntax: string;
  wrap: boolean;
  title: string;
  block?: boolean;
}

export interface ToolGroup {
  label: string;
  icon: React.ReactNode;
  items: ToolItem[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    label: "Text",
    icon: <Type className="h-3 w-3" />,
    items: [
      {
        label: "Bold",
        icon: <Bold className="h-3 w-3" />,
        syntax: "**",
        wrap: true,
        title: "Bold (**text**)",
      },
      {
        label: "Italic",
        icon: <Italic className="h-3 w-3" />,
        syntax: "_",
        wrap: true,
        title: "Italic (_text_)",
      },
      {
        label: "Strikethrough",
        icon: <Strikethrough className="h-3 w-3" />,
        syntax: "~~",
        wrap: true,
        title: "Strikethrough (~~text~~)",
      },
      {
        label: "Inline code",
        icon: <Code className="h-3 w-3" />,
        syntax: "`",
        wrap: true,
        title: "Inline code",
      },
    ],
  },
  {
    label: "Headings",
    icon: <Heading2 className="h-3 w-3" />,
    items: [
      {
        label: "Heading 1",
        icon: <AlignLeft className="h-3 w-3" />,
        syntax: "# ",
        wrap: false,
        title: "H1",
        block: true,
      },
      {
        label: "Heading 2",
        icon: <Heading2 className="h-3 w-3" />,
        syntax: "## ",
        wrap: false,
        title: "H2",
        block: true,
      },
      {
        label: "Heading 3",
        icon: <Heading3 className="h-3 w-3" />,
        syntax: "### ",
        wrap: false,
        title: "H3",
        block: true,
      },
      {
        label: "Heading 4",
        icon: <Heading3 className="h-3 w-3" />,
        syntax: "#### ",
        wrap: false,
        title: "H4",
        block: true,
      },
    ],
  },
  {
    label: "Lists",
    icon: <List className="h-3 w-3" />,
    items: [
      {
        label: "Bullet list",
        icon: <List className="h-3 w-3" />,
        syntax: "- ",
        wrap: false,
        title: "Bullet list",
        block: true,
      },
      {
        label: "Numbered list",
        icon: <ListOrdered className="h-3 w-3" />,
        syntax: "1. ",
        wrap: false,
        title: "Numbered list",
        block: true,
      },
      {
        label: "Task list",
        icon: <List className="h-3 w-3" />,
        syntax: "- [ ] ",
        wrap: false,
        title: "Task list item",
        block: true,
      },
    ],
  },
  {
    label: "Insert",
    icon: <Link className="h-3 w-3" />,
    items: [
      {
        label: "Link",
        icon: <Link className="h-3 w-3" />,
        syntax: "[link text](https://)",
        wrap: false,
        title: "Insert link",
      },
      {
        label: "Image",
        icon: <Image className="h-3 w-3" />,
        syntax: "![alt text](https://image-url)",
        wrap: false,
        title: "Insert image",
      },
      {
        label: "Blockquote",
        icon: <Quote className="h-3 w-3" />,
        syntax: "> ",
        wrap: false,
        title: "Blockquote",
        block: true,
      },
      {
        label: "Code block",
        icon: <Code className="h-3 w-3" />,
        syntax: "```\n",
        wrap: false,
        title: "Code block",
        block: true,
      },
      {
        label: "Divider",
        icon: <Minus className="h-3 w-3" />,
        syntax: "\n---\n",
        wrap: false,
        title: "Horizontal rule",
        block: true,
      },
      {
        label: "Table",
        icon: <Table className="h-3 w-3" />,
        syntax:
          "| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell     | Cell     | Cell     |\n",
        wrap: false,
        title: "Insert table",
        block: true,
      },
      {
        label: "Button link",
        icon: <Link className="h-3 w-3" />,
        syntax: "[→ Click here](https://)",
        wrap: false,
        title: "CTA button link",
      },
    ],
  },
];

function ToolbarDropdown({
  group,
  onInsert,
}: {
  group: ToolGroup;
  onInsert: (item: ToolItem) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
          open
            ? "border-black bg-black text-white"
            : "border-grey-200 text-grey-600 hover:border-black hover:text-black hover:bg-grey-50"
        }`}
      >
        {group.icon}
        {group.label}
        <ChevronDown
          className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-xl border border-grey-200 bg-white shadow-lg overflow-hidden">
          {group.items.map((item) => (
            <button
              key={item.title}
              type="button"
              title={item.title}
              onClick={() => {
                onInsert(item);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-grey-700 hover:bg-grey-50 hover:text-black transition-colors text-left"
            >
              <span className="text-grey-400">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function NewsletterToolbar({
  onInsert,
  charCount,
}: {
  onInsert: (item: ToolItem) => void;
  charCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-grey-100">
      {TOOL_GROUPS.map((group) => (
        <ToolbarDropdown key={group.label} group={group} onInsert={onInsert} />
      ))}
      <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-grey-400">
        <Type className="h-3 w-3" />
        {charCount} chars
      </span>
    </div>
  );
}
