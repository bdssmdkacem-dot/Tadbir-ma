"use client";

import { useState } from "react";
import { categoryLabel, filterTypes, type TxType, type TxCategory } from "@/data/mocks/finance";
import { projects } from "@/data/mocks/projects";

const CATEGORIES: TxCategory[] = ["grant","subscription","donation","salary","equipment","travel","services","other"];

export function AddTransactionModal({ onClose }: { onClose: () => void }) {
  const [type,     setType]     = useState<TxType>("income");
  const [category, setCategory] = useState<TxCategory>("grant");
  const [label,    setLabel]    = useState("");
  const [amount,   setAmount]   = useState("");
  const [date,     setDate]     = useState("");
  const [project,  setProject]  = useState("عام");
  const [ref,      setRef]      = useState("");

  function handleSubmit() {
    if (!label || !amount) return;
    alert(`✓ تمت إضافة المعاملة: ${label} — ${amount} درهم`);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(8,63,77,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div dir="rtl" className="w-full max-w-[28rem] bg-white rounded-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-dk">
          <h2 className="font-display font-bold text-[1rem] text-foreground m-0">إضافة معاملة مالية</h2>
          <button onClick={onClose} className="text-muted text-[1.25rem] bg-transparent border-0 cursor-pointer">×</button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div className="flex rounded-btn overflow-hidden border border-ivory-dk">
            {(["income","expense"] as TxType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setType(t); setCategory(t === "income" ? "grant" : "salary"); }}
                className="flex-1 py-2.5 text-[0.875rem] font-semibold border-0 cursor-pointer
                  transition-colors duration-[150ms]"
                style={{
                  background: type === t ? (t === "income" ? "var(--c-success)" : "var(--c-danger)") : "var(--background)",
                  color: type === t ? "#fff" : "var(--c-muted)",
                }}
              >
                {t === "income" ? "↑ مدخل" : "↓ مصروف"}
              </button>
            ))}
          </div>

          <Field label="البيان *">
            <input value={label} onChange={(e) => setLabel(e.target.value)}
              placeholder="وصف المعاملة" className={iCls} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="المبلغ (درهم) *">
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                placeholder="85000" className={iCls} />
            </Field>
            <Field label="التاريخ">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={iCls} />
            </Field>
          </div>

          <Field label="التصنيف">
            <select value={category} onChange={(e) => setCategory(e.target.value as TxCategory)} className={iCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel[c]}</option>)}
            </select>
          </Field>

          <Field label="المشروع">
            <select value={project} onChange={(e) => setProject(e.target.value)} className={iCls}>
              <option value="عام">عام</option>
              {projects.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </Field>

          <Field label="المرجع (اختياري)">
            <input value={ref} onChange={(e) => setRef(e.target.value)}
              placeholder="REF-2026-001" className={iCls} />
          </Field>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-ivory-dk">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-btn text-[0.875rem] font-semibold text-muted
              bg-ivory-dk border-0 cursor-pointer">
            إلغاء
          </button>
          <button onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-btn text-[0.875rem] font-semibold text-white
              border-0 cursor-pointer"
            style={{ background: type === "income" ? "var(--c-success)" : "var(--c-danger)" }}>
            {type === "income" ? "✓ إضافة مدخل" : "✓ إضافة مصروف"}
          </button>
        </div>
      </div>
    </div>
  );
}

const iCls = `w-full px-3 py-2.5 rounded-btn border border-ivory-dk bg-background
  text-[0.875rem] text-foreground placeholder:text-muted outline-none
  focus:border-teal transition-colors duration-[150ms]`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[0.75rem] font-semibold text-foreground">{label}</label>
      {children}
    </div>
  );
}
