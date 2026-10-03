"use client";

import { useState } from "react";
import { funders, newProjectSteps } from "@/data/mocks/projects";

interface FormData {
  name: string; code: string; funder: string; region: string;
  startDate: string; endDate: string;
  budget: string; description: string; objectives: string;
  beneficiariesTarget: string; manager: string;
  indicator1: string; indicator1Target: string; indicator1Unit: string;
}

const EMPTY: FormData = {
  name: "", code: "", funder: "", region: "",
  startDate: "", endDate: "",
  budget: "", description: "", objectives: "",
  beneficiariesTarget: "", manager: "",
  indicator1: "", indicator1Target: "", indicator1Unit: "",
};

export function NewProjectModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit() {
    // In production: POST to /api/projects
    alert(`✓ تم إنشاء المشروع: ${form.name}`);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(8,63,77,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        dir="rtl"
        className="w-full max-w-[36rem] bg-white rounded-card shadow-2xl
          overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-dk">
          <h2 className="font-display font-bold text-[1rem] text-foreground m-0">
            مشروع جديد
          </h2>
          <button onClick={onClose} className="text-muted hover:text-foreground text-[1.25rem] bg-transparent border-0 cursor-pointer leading-none">×</button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-0 px-6 py-3 border-b border-ivory-dk">
          {newProjectSteps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-0 flex-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center
                    text-[0.6875rem] font-bold flex-shrink-0"
                  style={{
                    background: step >= s.id ? "var(--c-teal)" : "var(--c-ivory-dk)",
                    color: step >= s.id ? "#fff" : "var(--c-muted)",
                  }}
                >
                  {step > s.id ? "✓" : s.id}
                </div>
                <span
                  className="text-[0.75rem] font-medium whitespace-nowrap"
                  style={{ color: step >= s.id ? "var(--c-teal)" : "var(--c-muted)" }}
                >
                  {s.label}
                </span>
              </div>
              {i < newProjectSteps.length - 1 && (
                <div className="flex-1 h-px mx-2" style={{ background: step > s.id ? "var(--c-teal)" : "var(--c-ivory-dk)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {step === 1 && (
            <>
              <Field label="اسم المشروع *">
                <input value={form.name} onChange={set("name")} placeholder="برنامج تمكين المرأة الريفية" className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="الكود المرجعي">
                  <input value={form.code} onChange={set("code")} placeholder="PROG-2026-001" className={inputCls} />
                </Field>
                <Field label="الجهة">
                  <input value={form.region} onChange={set("region")} placeholder="مراكش" className={inputCls} />
                </Field>
              </div>
              <Field label="الممول *">
                <select value={form.funder} onChange={set("funder")} className={inputCls}>
                  <option value="">اختر الممول</option>
                  {funders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="تاريخ البداية">
                  <input type="date" value={form.startDate} onChange={set("startDate")} className={inputCls} />
                </Field>
                <Field label="تاريخ النهاية">
                  <input type="date" value={form.endDate} onChange={set("endDate")} className={inputCls} />
                </Field>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Field label="الميزانية الإجمالية (درهم) *">
                <input type="number" value={form.budget} onChange={set("budget")} placeholder="450000" className={inputCls} />
              </Field>
              <Field label="وصف المشروع">
                <textarea value={form.description} onChange={set("description")} rows={3} placeholder="وصف مختصر لأهداف المشروع ونطاقه..." className={inputCls + " resize-none"} />
              </Field>
              <Field label="الأهداف (سطر لكل هدف)">
                <textarea value={form.objectives} onChange={set("objectives")} rows={3} placeholder={"تكوين 500 امرأة مهنياً\nإنشاء 20 تعاونية فلاحية"} className={inputCls + " resize-none"} />
              </Field>
              <Field label="المستفيدون المستهدفون">
                <input type="number" value={form.beneficiariesTarget} onChange={set("beneficiariesTarget")} placeholder="500" className={inputCls} />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <Field label="مدير المشروع">
                <input value={form.manager} onChange={set("manager")} placeholder="الاسم الكامل" className={inputCls} />
              </Field>
              <p className="text-[0.75rem] text-muted font-semibold uppercase tracking-wide m-0">المؤشر الرئيسي الأول</p>
              <Field label="اسم المؤشر">
                <input value={form.indicator1} onChange={set("indicator1")} placeholder="النساء المستفيدات" className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="القيمة المستهدفة">
                  <input type="number" value={form.indicator1Target} onChange={set("indicator1Target")} placeholder="500" className={inputCls} />
                </Field>
                <Field label="الوحدة">
                  <input value={form.indicator1Unit} onChange={set("indicator1Unit")} placeholder="شخص" className={inputCls} />
                </Field>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-ivory-dk">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 rounded-btn text-[0.875rem] font-semibold text-muted
              bg-ivory-dk border-0 cursor-pointer hover:bg-ivory-dk/70 transition-colors"
          >
            {step > 1 ? "← السابق" : "إلغاء"}
          </button>
          <div className="flex items-center gap-1.5">
            {newProjectSteps.map((s) => (
              <div key={s.id} className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                style={{ background: step === s.id ? "var(--c-teal)" : "var(--c-ivory-dk)" }} />
            ))}
          </div>
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-btn text-[0.875rem] font-semibold text-white
                border-0 cursor-pointer transition-colors duration-[150ms]"
              style={{ background: "var(--c-teal)" }}
            >
              التالي →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-btn text-[0.875rem] font-semibold text-white
                border-0 cursor-pointer transition-colors duration-[150ms]"
              style={{ background: "var(--c-gold)" }}
            >
              ✦ إنشاء المشروع
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = `w-full px-3 py-2.5 rounded-btn border border-ivory-dk bg-background
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
