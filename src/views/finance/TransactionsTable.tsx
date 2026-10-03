"use client";

import { useState, useMemo } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Badge } from "@/components/ui/Badge";
import { transactions, categoryLabel, filterTypes, type TxType } from "@/data/mocks/finance";

export function TransactionsTable({ onAdd }: { onAdd: () => void }) {
  const [filter, setFilter] = useState<"all" | TxType>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchType   = filter === "all" || t.type === filter;
      const matchSearch = !search || t.label.includes(search) || t.project.includes(search);
      return matchType && matchSearch;
    });
  }, [filter, search]);

  const totalIncome  = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <Inview
      tag="section"
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      mode="once"
      config={{ tension: 200, friction: 28 }}
      delayIn={160}
      className="bg-white rounded-card border border-ivory-dk overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-ivory-dk">
        <h3 className="font-display font-bold text-[0.9375rem] text-foreground m-0 flex-shrink-0">
          سجل المعاملات
        </h3>

        {/* Filter pills */}
        <div className="flex gap-2">
          {filterTypes.map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className="px-3 py-1 rounded-badge text-[0.75rem] font-semibold border cursor-pointer
                transition-all duration-[150ms]"
              style={{
                background:  filter === f.value ? "var(--c-teal)" : "transparent",
                color:       filter === f.value ? "#fff" : "var(--c-muted)",
                borderColor: filter === f.value ? "var(--c-teal)" : "var(--c-ivory-dk)",
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 بحث..." className="px-3 py-1.5 rounded-btn border border-ivory-dk
            bg-background text-[0.8125rem] outline-none focus:border-teal transition-colors
            duration-[150ms] flex-1 min-w-[10rem]" />

        {/* Add button */}
        <button onClick={onAdd}
          className="mr-auto px-4 py-1.5 rounded-btn text-[0.8125rem] font-semibold text-white
            border-0 cursor-pointer flex-shrink-0"
          style={{ background: "var(--c-teal)" }}>
          + إضافة
        </button>
      </div>

      {/* Totals strip */}
      <div className="flex gap-6 px-5 py-3 bg-ivory border-b border-ivory-dk text-[0.75rem]">
        <span className="text-muted">
          مداخيل: <strong style={{ color: "var(--c-success)" }}>{totalIncome.toLocaleString("ar-MA")} درهم</strong>
        </span>
        <span className="text-muted">
          مصاريف: <strong style={{ color: "var(--c-danger)" }}>{totalExpense.toLocaleString("ar-MA")} درهم</strong>
        </span>
        <span className="text-muted">
          الرصيد: <strong style={{ color: totalIncome - totalExpense >= 0 ? "var(--c-success)" : "var(--c-danger)" }}>
            {(totalIncome - totalExpense).toLocaleString("ar-MA")} درهم
          </strong>
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-right">
          <thead>
            <tr className="bg-ivory">
              {["البيان", "المشروع", "التصنيف", "التاريخ", "المبلغ"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-[0.6875rem] font-semibold text-muted whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="border-t border-ivory-dk hover:bg-ivory transition-colors duration-[150ms]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] flex-shrink-0"
                      style={{
                        background: tx.type === "income" ? "var(--c-success-bg)" : "var(--c-danger-bg)",
                        color:      tx.type === "income" ? "var(--c-success)"    : "var(--c-danger)",
                      }}
                    >
                      {tx.type === "income" ? "↑" : "↓"}
                    </span>
                    <span className="text-[0.8125rem] font-medium text-foreground">{tx.label}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[0.8125rem] text-muted">{tx.project}</td>
                <td className="px-4 py-3">
                  <Badge variant="muted">{categoryLabel[tx.category]}</Badge>
                </td>
                <td className="px-4 py-3 text-[0.8125rem] text-muted whitespace-nowrap">{tx.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className="text-[0.875rem] font-bold"
                    style={{ color: tx.type === "income" ? "var(--c-success)" : "var(--c-danger)" }}
                  >
                    {tx.type === "income" ? "+" : "-"}{tx.amount.toLocaleString("ar-MA")}
                  </span>
                  <span className="text-[0.6875rem] text-muted mr-1">درهم</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-[0.875rem] text-muted py-10 m-0">لا توجد معاملات</p>
        )}
      </div>
    </Inview>
  );
}
