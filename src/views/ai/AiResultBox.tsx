"use client";

import { useState } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Badge } from "@/components/ui/Badge";
import { modeLabelMap, type AiMode } from "@/data/mocks/ai";

export function AiResultBox({
  content,
  mode,
  onClear,
}: {
  content: string;
  mode: AiMode;
  onClear: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `tadbir-${mode}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Inview
      tag="div"
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      mode="once"
      config={{ tension: 220, friction: 28 }}
      className="bg-white rounded-card border border-ivory-dk overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-dk">
        <div className="flex items-center gap-2">
          <span className="text-gold text-[1rem]">✦</span>
          <span className="font-semibold text-[0.9375rem] text-foreground">
            {modeLabelMap[mode]}
          </span>
          <Badge variant="teal">مُولَّد بالذكاء الاصطناعي</Badge>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-btn text-[0.75rem] font-semibold border-0
              cursor-pointer transition-colors duration-[150ms]"
            style={{
              background: copied ? "var(--c-success-bg)" : "var(--c-teal-bg)",
              color:      copied ? "var(--c-success)"    : "var(--c-teal)",
            }}
          >
            {copied ? "✓ تم النسخ" : "نسخ"}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-btn text-[0.75rem] font-semibold
              bg-ivory-dk text-muted border-0 cursor-pointer hover:text-foreground
              transition-colors duration-[150ms]"
          >
            تحميل ↓
          </button>
          <button
            onClick={onClear}
            className="text-muted hover:text-danger text-[1.125rem] bg-transparent
              border-0 cursor-pointer leading-none transition-colors duration-[150ms]"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        dir="rtl"
        className="px-6 py-5 text-[0.875rem] text-foreground leading-[1.9]
          whitespace-pre-wrap max-h-[32rem] overflow-y-auto"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {content}
      </div>
    </Inview>
  );
}
