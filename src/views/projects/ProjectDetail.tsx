"use client";

import { useState } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { statusLabel, statusVariant, activityTypeLabels, type Project } from "@/data/mocks/projects";

const TABS = ["نظرة عامة", "الأنشطة", "الميزانية", "المؤشرات"] as const;
type Tab = typeof TABS[number];

const activityStatusColor: Record<string, string> = {
  completed: "var(--c-success)",
  planned:   "var(--c-teal)",
  cancelled: "var(--c-danger)",
};
const activityStatusLabel: Record<string, string> = {
  completed: "مكتمل",
  planned:   "مخطط",
  cancelled: "ملغى",
};

export function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<Tab>("نظرة عامة");
  const spentPct = Math.round((project.spent / project.budget) * 100);

  return (
    <Inview
      tag="div"
      from={{ opacity: 0, y: 16 }}
      to={{ opacity: 1, y: 0 }}
      mode="once"
      config={{ tension: 220, friction: 28 }}
      dir="rtl"
    >
      {/* ── Back + title ── */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="text-muted hover:text-teal text-[0.875rem] bg-transparent
            border-0 cursor-pointer transition-colors duration-[150ms]"
        >
          ← رجوع
        </button>
        <span className="text-ivory-dk">|</span>
        <h2 className="font-display font-bold text-[1.125rem] text-foreground m-0">
          {project.name}
        </h2>
        <Badge variant={statusVariant[project.status]}>
          {statusLabel[project.status]}
        </Badge>
      </div>

      {/* ── Hero progress card ── */}
      <div
        className="rounded-card p-6 mb-5 relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg,var(--c-teal-dark),var(--c-teal))" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {[
            { l: "الممول",           v: project.funder.name            },
            { l: "الجهة",            v: project.region                 },
            { l: "مدير المشروع",     v: project.manager                },
            { l: "المدة",            v: `${project.startDate} — ${project.endDate}` },
          ].map((item) => (
            <div key={item.l}>
              <p className="text-[0.6875rem] text-white/55 m-0 mb-0.5">{item.l}</p>
              <p className="text-[0.875rem] font-semibold m-0">{item.v}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-[0.75rem] text-white/70">تقدم التنفيذ</span>
            <span className="text-[0.75rem] font-bold text-gold-lt">{project.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-badge overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
            <div className="h-full rounded-badge transition-all duration-700"
              style={{ width: `${project.progress}%`, background: "var(--c-gold)" }} />
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-5 bg-ivory-dk rounded-btn p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-btn text-[0.8125rem] font-semibold
              border-0 cursor-pointer transition-all duration-[150ms]"
            style={{
              background: tab === t ? "#fff" : "transparent",
              color:      tab === t ? "var(--c-teal)" : "var(--c-muted)",
              boxShadow:  tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {tab === "نظرة عامة" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-card border border-ivory-dk p-5">
            <h3 className="font-display font-bold text-[0.875rem] text-foreground mb-3 m-0">وصف المشروع</h3>
            <p className="text-[0.875rem] text-muted leading-[1.75] m-0">{project.description}</p>
          </div>
          <div className="bg-white rounded-card border border-ivory-dk p-5">
            <h3 className="font-display font-bold text-[0.875rem] text-foreground mb-3 m-0">الأهداف</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              {project.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.875rem] text-muted">
                  <span className="text-gold mt-0.5 flex-shrink-0">✦</span> {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-card border border-ivory-dk p-5">
            <h3 className="font-display font-bold text-[0.875rem] text-foreground mb-3 m-0">المستفيدون</h3>
            <div className="flex items-end gap-3 mb-3">
              <span className="font-display font-black text-[2rem] text-teal-dark leading-none">
                {project.beneficiariesActual.toLocaleString("ar-MA")}
              </span>
              <span className="text-muted text-[0.875rem]">
                من {project.beneficiariesTarget.toLocaleString("ar-MA")} مستهدف
              </span>
            </div>
            <ProgressBar value={Math.round((project.beneficiariesActual / project.beneficiariesTarget) * 100)} />
          </div>
          <div className="bg-white rounded-card border border-ivory-dk p-5">
            <h3 className="font-display font-bold text-[0.875rem] text-foreground mb-3 m-0">الكود والممول</h3>
            <dl className="space-y-2 text-[0.875rem]">
              <div className="flex justify-between">
                <dt className="text-muted">الكود</dt>
                <dd className="font-mono text-foreground m-0">{project.code}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">الممول</dt>
                <dd className="text-foreground font-medium m-0">{project.funder.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">نوع التمويل</dt>
                <dd className="m-0"><Badge variant="teal">{project.funder.type}</Badge></dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {tab === "الأنشطة" && (
        <div className="bg-white rounded-card border border-ivory-dk overflow-hidden">
          <ul className="list-none p-0 m-0">
            {project.activities.map((act, i) => (
              <li key={i} className="flex items-center gap-4 px-5 py-4 border-b border-ivory-dk last:border-0">
                <div className="w-1 self-stretch rounded-badge flex-shrink-0"
                  style={{ background: activityStatusColor[act.status] }} />
                <div className="flex-1">
                  <p className="text-[0.875rem] font-semibold text-foreground m-0">{act.title}</p>
                  <p className="text-[0.75rem] text-muted m-0">{act.date}</p>
                </div>
                <Badge variant={act.status === "completed" ? "success" : act.status === "cancelled" ? "danger" : "teal"}>
                  {activityStatusLabel[act.status]}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "الميزانية" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { l: "الميزانية الإجمالية", v: project.budget, c: "var(--c-teal)"   },
            { l: "المصروف الفعلي",      v: project.spent,  c: "var(--c-gold)"   },
            { l: "المتبقي",             v: project.budget - project.spent, c: "var(--c-success)" },
          ].map((item) => (
            <div key={item.l} className="bg-white rounded-card border border-ivory-dk p-5"
              style={{ borderTop: `3px solid ${item.c}` }}>
              <p className="text-[0.75rem] text-muted m-0 mb-2">{item.l}</p>
              <p className="font-display font-black text-[1.5rem] m-0 leading-none"
                style={{ color: item.c }}>
                {item.v.toLocaleString("ar-MA")}
                <span className="text-[0.75rem] font-normal text-muted mr-1">درهم</span>
              </p>
            </div>
          ))}
          <div className="md:col-span-3 bg-white rounded-card border border-ivory-dk p-5">
            <div className="flex justify-between mb-3">
              <span className="text-[0.875rem] font-semibold text-foreground">نسبة الصرف</span>
              <span className="text-[0.875rem] font-bold text-gold">{spentPct}%</span>
            </div>
            <ProgressBar value={spentPct} />
          </div>
        </div>
      )}

      {tab === "المؤشرات" && (
        <div className="bg-white rounded-card border border-ivory-dk overflow-hidden">
          <table className="w-full border-collapse text-right" dir="rtl">
            <thead>
              <tr className="bg-ivory-dk">
                {["المؤشر", "المستهدف", "المحقق", "التقدم"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[0.6875rem] font-semibold text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.indicators.map((ind, i) => {
                const pct = Math.round((ind.actual / ind.target) * 100);
                return (
                  <tr key={i} className="border-t border-ivory-dk">
                    <td className="px-5 py-4 text-[0.875rem] font-medium text-foreground">{ind.name}</td>
                    <td className="px-5 py-4 text-[0.875rem] text-muted">{ind.target} {ind.unit}</td>
                    <td className="px-5 py-4 text-[0.875rem] font-bold text-teal">{ind.actual} {ind.unit}</td>
                    <td className="px-5 py-4" style={{ minWidth: "8rem" }}>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={pct} className="flex-1" />
                        <span className="text-[0.6875rem] text-muted flex-shrink-0">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Inview>
  );
}
