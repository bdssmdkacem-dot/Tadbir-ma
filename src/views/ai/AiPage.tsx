"use client";

import { useState } from "react";
import { ZelligePattern } from "@/components/ui/ZelligePattern";
import { AiModePicker }   from "./AiModePicker";
import { AiPromptBox }    from "./AiPromptBox";
import { AiResultBox }    from "./AiResultBox";
import { AiHistoryPanel } from "./AiHistoryPanel";
import { aiModes, type AiMode } from "@/data/mocks/ai";

export function AiPage() {
  const [mode,    setMode]    = useState<AiMode>("proposal");
  const [prompt,  setPrompt]  = useState("");
  const [result,  setResult]  = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const currentMode = aiModes.find((m) => m.id === mode)!;

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res  = await fetch("/api/ai", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ mode, prompt }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.content ?? "");
    } catch {
      setError("حدث خطأ في الاتصال. تحقق من اتصالك بالإنترنت وحاول مجدداً.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="space-y-6">
      {/* ── Hero banner ── */}
      <div
        className="relative overflow-hidden rounded-card p-7 text-white"
        style={{
          background:
            "linear-gradient(135deg,var(--c-teal-dark) 0%,var(--c-teal) 60%,var(--c-teal-mid) 100%)",
        }}
      >
        <ZelligePattern opacity={0.09} />
        <div className="relative z-10">
          <div className="text-[1.5rem] mb-2">✦</div>
          <h2 className="font-display font-black text-[1.375rem] text-white m-0 mb-2">
            مساعد الذكاء الاصطناعي
          </h2>
          <p className="text-white/70 text-[0.875rem] m-0">
            أنشئ مقترحات المشاريع، التقارير، الـ Logframes ومحاضر الاجتماعات بالذكاء الاصطناعي في ثوانٍ
          </p>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_18rem] gap-6">
        {/* Left — generator */}
        <div className="space-y-5">
          {/* Mode picker */}
          <div>
            <p className="text-[0.75rem] font-semibold text-muted mb-3 uppercase tracking-wide">
              اختر نوع الوثيقة
            </p>
            <AiModePicker
              selected={mode}
              onSelect={(m) => { setMode(m); setResult(""); setError(""); }}
            />
          </div>

          {/* Prompt box */}
          <AiPromptBox
            mode={currentMode}
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            loading={loading}
          />

          {/* Error */}
          {error && (
            <div
              className="rounded-btn px-4 py-3 text-[0.875rem]"
              style={{ background: "var(--c-danger-bg)", color: "var(--c-danger)" }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <AiResultBox
              content={result}
              mode={mode}
              onClear={() => setResult("")}
            />
          )}

          {/* Loading skeleton */}
          {loading && !result && (
            <div className="bg-white rounded-card border border-ivory-dk p-6 space-y-3 animate-pulse">
              {[100, 90, 85, 70, 95].map((w, i) => (
                <div
                  key={i}
                  className="h-3 rounded-badge bg-ivory-dk"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — history */}
        <AiHistoryPanel />
      </div>
    </div>
  );
}
