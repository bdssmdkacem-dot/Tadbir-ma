"use client";

import { useState, useMemo } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Badge } from "@/components/ui/Badge";
import {
  activities,
  actTypeLabel,
  actTypeColor,
  actStatusLabel,
  type Activity,
  type ActType,
  type ActStatus,
} from "@/data/mocks/modules";

type View = "list" | "calendar";

const STATUS_BADGE: Record<ActStatus, "teal" | "success" | "danger"> = {
  planned: "teal", completed: "success", cancelled: "danger",
};
const TYPE_BADGE: Record<ActType, "teal" | "gold" | "success" | "danger" | "muted"> = {
  meeting: "teal", training: "gold", field: "success", report: "danger", workshop: "muted",
};
const iCls = "w-full px-3 py-2.5 rounded-btn border border-ivory-dk bg-background text-[0.875rem] text-foreground placeholder:text-muted outline-none focus:border-teal transition-colors duration-[150ms]";

// ── Add Activity Modal ────────────────────────────────────────────────────────
function AddActivityModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [type,  setType]  = useState<ActType>("meeting");
  const [date,  setDate]  = useState("");
  const [time,  setTime]  = useState("");
  const [loc,   setLoc]   = useState("");
  const [proj,  setProj]  = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(8,63,77,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div dir="rtl" className="w-full max-w-[28rem] bg-white rounded-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-dk">
          <h2 className="font-display font-bold text-[1rem] text-foreground m-0">نشاط جديد</h2>
          <button onClick={onClose} className="text-muted text-[1.25rem] bg-transparent border-0 cursor-pointer">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[0.75rem] font-semibold text-foreground">عنوان النشاط *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="اجتماع الشركاء الربعي" className={iCls} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.75rem] font-semibold text-foreground">نوع النشاط</label>
            <select value={type} onChange={e => setType(e.target.value as ActType)} className={iCls}>
              {(Object.keys(actTypeLabel) as ActType[]).map(t => (
                <option key={t} value={t}>{actTypeLabel[t]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.75rem] font-semibold text-foreground">المشروع</label>
            <input value={proj} onChange={e => setProj(e.target.value)} placeholder="تمكين المرأة" className={iCls} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.75rem] font-semibold text-foreground">المكان</label>
            <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="مقر الجمعية" className={iCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[0.75rem] font-semibold text-foreground">التاريخ</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={iCls} />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[0.75rem] font-semibold text-foreground">الوقت</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className={iCls} />
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-ivory-dk">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-btn text-[0.875rem] font-semibold text-muted bg-ivory-dk border-0 cursor-pointer">
            إلغاء
          </button>
          <button onClick={() => { if (title) { alert(`✓ تمت إضافة النشاط: ${title}`); onClose(); } }}
            className="flex-1 py-2.5 rounded-btn text-[0.875rem] font-semibold text-white border-0 cursor-pointer"
            style={{ background: "var(--c-teal)" }}>
            ✓ حفظ النشاط
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Activity Row ──────────────────────────────────────────────────────────────
function ActivityRow({ act, delay }: { act: Activity; delay: number }) {
  return (
    <Inview tag="div" from={{ opacity: 0, y: 12 }} to={{ opacity: 1, y: 0 }} mode="once"
      config={{ tension: 220, friction: 28 }} delayIn={delay}
      className="flex items-center gap-4 px-5 py-4 border-b border-ivory-dk last:border-0
        hover:bg-ivory transition-colors duration-[150ms]">
      <div className="w-1 self-stretch rounded-badge flex-shrink-0"
        style={{ background: actTypeColor[act.type] }} />
      <div className="flex-1 min-w-0">
        <p className="text-[0.875rem] font-semibold text-foreground m-0 truncate">{act.title}</p>
        <p className="text-[0.75rem] text-muted m-0 mt-0.5">{act.date} — {act.time} · {act.location}</p>
        <p className="text-[0.6875rem] text-muted m-0 mt-0.5">المشروع: {act.project} · {act.participants} مشارك</p>
      </div>
      <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
        <Badge variant={TYPE_BADGE[act.type]}>{actTypeLabel[act.type]}</Badge>
        <Badge variant={STATUS_BADGE[act.status]}>{actStatusLabel[act.status]}</Badge>
      </div>
    </Inview>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display font-bold text-[0.9375rem] text-foreground mb-3 flex items-center gap-2 m-0">
        {title}
        <span className="text-[0.6875rem] text-muted font-normal bg-ivory-dk px-2 py-0.5 rounded-badge">{count}</span>
      </h3>
      <div className="bg-white rounded-card border border-ivory-dk overflow-hidden">{children}</div>
    </div>
  );
}

// ── Calendar View ─────────────────────────────────────────────────────────────
function CalendarView({ acts }: { acts: Activity[] }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const byDay: Record<number, Activity[]> = {};
  acts.forEach(a => {
    const d = parseInt(a.date.split("-")[2] ?? "0");
    if (d) { if (!byDay[d]) byDay[d] = []; byDay[d].push(a); }
  });

  return (
    <div className="bg-white rounded-card border border-ivory-dk overflow-hidden">
      <div className="px-5 py-4 border-b border-ivory-dk">
        <h3 className="font-display font-bold text-[0.9375rem] text-foreground m-0">يونيو 2026</h3>
      </div>
      <div className="grid grid-cols-7 text-center border-b border-ivory-dk">
        {["أح", "إث", "ثل", "أر", "خم", "جم", "سب"].map(d => (
          <div key={d} className="py-2 text-[0.6875rem] font-semibold text-muted border-l border-ivory-dk first:border-0">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map(d => (
          <div key={d} className="min-h-[5rem] border-b border-l border-ivory-dk p-1.5">
            <p className="text-[0.6875rem] font-semibold text-muted m-0 mb-1">{d}</p>
            {(byDay[d] ?? []).map(a => (
              <div key={a.id} className="rounded text-[0.5rem] px-1 py-0.5 mb-0.5 text-white truncate"
                style={{ background: actTypeColor[a.type] }}>
                {a.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function ActivitiesPage() {
  const [view,       setView]       = useState<View>("list");
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ActType>("all");
  const [showModal,  setShowModal]  = useState(false);

  const filtered = useMemo(() => activities.filter(a => {
    const mT = typeFilter === "all" || a.type === typeFilter;
    const mS = !search || a.title.includes(search) || a.project.includes(search);
    return mT && mS;
  }), [typeFilter, search]);

  const planned   = filtered.filter(a => a.status === "planned");
  const completed = filtered.filter(a => a.status === "completed");
  const cancelled = filtered.filter(a => a.status === "cancelled");

  return (
    <div dir="rtl" className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 بحث..."
          className="flex-1 min-w-[12rem] px-3 py-2.5 rounded-btn border border-ivory-dk
            bg-white text-[0.875rem] outline-none focus:border-teal transition-colors" />

        <div className="flex gap-2 flex-wrap">
          {(["all", "meeting", "training", "field", "report", "workshop"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="px-3 py-1.5 rounded-badge text-[0.75rem] font-semibold border cursor-pointer transition-all duration-[150ms]"
              style={{
                background:  typeFilter === t ? "var(--c-teal)" : "transparent",
                color:       typeFilter === t ? "#fff" : "var(--c-muted)",
                borderColor: typeFilter === t ? "var(--c-teal)" : "var(--c-ivory-dk)",
              }}>
              {t === "all" ? "الكل" : actTypeLabel[t as ActType]}
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-ivory-dk rounded-btn p-1">
          {(["list", "calendar"] as View[]).map(v => (
            <button key={v} onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-btn text-[0.75rem] font-semibold border-0 cursor-pointer transition-all duration-[150ms]"
              style={{
                background: view === v ? "white" : "transparent",
                color:      view === v ? "var(--c-teal)" : "var(--c-muted)",
              }}>
              {v === "list" ? "◉ قائمة" : "▦ تقويم"}
            </button>
          ))}
        </div>

        <button onClick={() => setShowModal(true)}
          className="mr-auto px-5 py-2.5 rounded-btn font-semibold text-[0.875rem] text-white border-0 cursor-pointer"
          style={{ background: "linear-gradient(135deg,var(--c-teal),var(--c-teal-mid))" }}>
          + نشاط جديد
        </button>
      </div>

      {view === "list" ? (
        <div className="space-y-5">
          {planned.length > 0 && (
            <Section title="الأنشطة المخططة" count={planned.length}>
              {planned.map((a, i) => <ActivityRow key={a.id} act={a} delay={i * 60} />)}
            </Section>
          )}
          {completed.length > 0 && (
            <Section title="الأنشطة المنجزة" count={completed.length}>
              {completed.map((a, i) => <ActivityRow key={a.id} act={a} delay={i * 60} />)}
            </Section>
          )}
          {cancelled.length > 0 && (
            <Section title="الأنشطة الملغاة" count={cancelled.length}>
              {cancelled.map((a, i) => <ActivityRow key={a.id} act={a} delay={i * 60} />)}
            </Section>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[2rem] m-0 mb-2">📅</p>
              <p className="text-[0.9375rem] text-muted m-0">لا توجد أنشطة تطابق البحث</p>
            </div>
          )}
        </div>
      ) : (
        <CalendarView acts={filtered} />
      )}

      {showModal && <AddActivityModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
