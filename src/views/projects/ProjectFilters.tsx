"use client";

import { regions, type ProjectStatus } from "@/data/mocks/projects";

const STATUSES: Array<{ value: "all" | ProjectStatus; label: string }> = [
  { value: "all",      label: "الكل"              },
  { value: "active",   label: "نشط"               },
  { value: "near_end", label: "قريب من الإنهاء"   },
  { value: "on_hold",  label: "موقوف"             },
  { value: "completed",label: "مكتمل"             },
];

export function ProjectFilters({
  search,
  setSearch,
  region,
  setRegion,
  status,
  setStatus,
  onNew,
}: {
  search: string;
  setSearch: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  status: string;
  setStatus: (v: "all" | ProjectStatus) => void;
  onNew: () => void;
}) {
  return (
    <div dir="rtl" className="flex flex-wrap items-center gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[12rem]">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-[0.875rem] pointer-events-none">
          🔍
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مشروع..."
          className="w-full pr-9 pl-4 py-2.5 rounded-btn border border-ivory-dk
            bg-white text-[0.875rem] text-foreground placeholder:text-muted
            outline-none focus:border-teal transition-colors duration-[150ms]"
        />
      </div>

      {/* Region select */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="px-3 py-2.5 rounded-btn border border-ivory-dk bg-white
          text-[0.875rem] text-foreground outline-none cursor-pointer
          focus:border-teal transition-colors duration-[150ms]"
      >
        {regions.map((r) => (
          <option key={r} value={r}>{r === "الكل" ? "كل الجهات" : r}</option>
        ))}
      </select>

      {/* Status filter pills */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className="px-3 py-1.5 rounded-badge text-[0.75rem] font-semibold
              border cursor-pointer transition-all duration-[150ms]"
            style={{
              background: status === s.value ? "var(--c-teal)"    : "var(--background)",
              color:      status === s.value ? "#fff"             : "var(--c-muted)",
              borderColor:status === s.value ? "var(--c-teal)"    : "var(--c-ivory-dk)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* New project CTA */}
      <button
        onClick={onNew}
        className="mr-auto px-5 py-2.5 rounded-btn font-semibold text-[0.875rem]
          text-white border-0 cursor-pointer transition-colors duration-[150ms]"
        style={{ background: "linear-gradient(135deg,var(--c-teal),var(--c-teal-mid))" }}
      >
        + مشروع جديد
      </button>
    </div>
  );
}
