"use client";

import { Badge } from "@/components/ui/Badge";
import { aiHistory, modeLabelMap } from "@/data/mocks/ai";

const modeBadgeVariant: Record<string, "teal" | "gold" | "muted"> = {
  proposal:         "teal",
  logframe:         "teal",
  activity_report:  "gold",
  concept_note:     "gold",
  financial_report: "muted",
  meeting_minutes:  "muted",
};

export function AiHistoryPanel() {
  return (
    <aside
      dir="rtl"
      className="bg-white rounded-card border border-ivory-dk overflow-hidden h-fit"
    >
      <div className="px-4 py-3.5 border-b border-ivory-dk">
        <h3 className="font-display font-bold text-[0.875rem] text-foreground m-0">
          الوثائق السابقة
        </h3>
      </div>

      <ul className="list-none p-0 m-0">
        {aiHistory.map((item) => (
          <li
            key={item.id}
            className="px-4 py-3.5 border-b border-ivory-dk last:border-0
              hover:bg-ivory cursor-pointer transition-colors duration-[150ms] group"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <Badge variant={modeBadgeVariant[item.mode] ?? "teal"} className="flex-shrink-0">
                {modeLabelMap[item.mode]}
              </Badge>
              <span className="text-[0.6875rem] text-muted flex-shrink-0">{item.date}</span>
            </div>
            <p className="text-[0.8125rem] font-semibold text-foreground m-0 mb-1 leading-snug
              group-hover:text-teal transition-colors duration-[150ms]">
              {item.title}
            </p>
            <p className="text-[0.6875rem] text-muted m-0 truncate">{item.preview}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
