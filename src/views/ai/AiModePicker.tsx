"use client";

import { Hover } from "@/components/animation/springs/hover";
import { aiModes, type AiMode } from "@/data/mocks/ai";

export function AiModePicker({
  selected,
  onSelect,
}: {
  selected: AiMode;
  onSelect: (m: AiMode) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {aiModes.map((m) => {
        const active = selected === m.id;
        return (
          <Hover
            key={m.id}
            tag="button"
            from={{ y: 0 }}
            to={{ y: -3 }}
            config={{ tension: 280, friction: 22 }}
            onClick={() => onSelect(m.id)}
            className="flex flex-col items-center gap-2 p-4 rounded-card border-2
              cursor-pointer text-center transition-colors duration-[150ms]"
            style={{
              background:   active ? "color-mix(in srgb,var(--c-gold) 8%,white)" : "white",
              borderColor:  active ? "var(--c-gold)" : "var(--c-ivory-dk)",
            }}
          >
            <span className="text-[1.75rem] leading-none">{m.icon}</span>
            <span
              className="text-[0.75rem] font-semibold leading-snug"
              style={{ color: active ? "var(--c-gold)" : "var(--c-muted)" }}
            >
              {m.label}
            </span>
          </Hover>
        );
      })}
    </div>
  );
}
