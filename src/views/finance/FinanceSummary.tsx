"use client";

import { Inview } from "@/components/animation/springs/in-view";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { financeSummary, budgetCategories } from "@/data/mocks/finance";

export function FinanceSummary() {
  const { totalBudget, totalSpent, totalIncome, currency } = financeSummary;
  const remaining = totalBudget - totalSpent;
  const spentPct  = Math.round((totalSpent / totalBudget) * 100);

  const cards = [
    { label: "الميزانية الإجمالية",  value: totalBudget,  color: "var(--c-teal)",   border: "var(--c-teal)"   },
    { label: "المصاريف الفعلية",     value: totalSpent,   color: "var(--c-gold)",   border: "var(--c-gold)"   },
    { label: "الرصيد المتاح",        value: remaining,    color: "var(--c-success)",border: "var(--c-success)"},
  ];

  return (
    <div dir="rtl" className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <Inview
            key={c.label}
            tag="div"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            mode="once"
            config={{ tension: 220, friction: 28 }}
            delayIn={i * 80}
            className="bg-white rounded-card border border-ivory-dk p-5"
            style={{ borderTop: `3px solid ${c.border}` }}
          >
            <p className="text-[0.75rem] text-muted m-0 mb-2">{c.label}</p>
            <p className="font-display font-black text-[1.625rem] leading-none m-0"
              style={{ color: c.color }}>
              {c.value.toLocaleString("ar-MA")}
              <span className="text-[0.75rem] font-normal text-muted mr-1">{currency}</span>
            </p>
            {c.label === "المصاريف الفعلية" && (
              <p className="text-[0.6875rem] text-muted m-0 mt-1">{spentPct}% من الميزانية</p>
            )}
          </Inview>
        ))}
      </div>

      {/* Budget category bars */}
      <Inview
        tag="div"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        mode="once"
        config={{ tension: 200, friction: 28 }}
        delayIn={280}
        className="bg-white rounded-card border border-ivory-dk p-6"
      >
        <h3 className="font-display font-bold text-[0.9375rem] text-foreground mb-5 m-0">
          توزيع الميزانية حسب البند
        </h3>
        <div className="space-y-4">
          {budgetCategories.map((cat) => {
            const pct = Math.round((cat.spent / cat.budget) * 100);
            return (
              <div key={cat.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[0.875rem] text-foreground font-medium">{cat.label}</span>
                  <span className="text-[0.75rem] text-muted">
                    {cat.spent.toLocaleString("ar-MA")} / {cat.budget.toLocaleString("ar-MA")} درهم
                  </span>
                </div>
                <div className="w-full h-2 rounded-badge overflow-hidden bg-ivory-dk">
                  <div
                    className="h-full rounded-badge transition-all duration-700"
                    style={{ width: `${pct}%`, background: cat.color }}
                  />
                </div>
                <p className="text-[0.6875rem] m-0 mt-0.5" style={{ color: cat.color }}>
                  {pct}%
                </p>
              </div>
            );
          })}
        </div>
      </Inview>
    </div>
  );
}
