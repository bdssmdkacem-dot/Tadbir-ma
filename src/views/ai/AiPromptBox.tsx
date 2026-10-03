"use client";

import { type AiModeConfig } from "@/data/mocks/ai";

export function AiPromptBox({
  mode,
  prompt,
  setPrompt,
  onGenerate,
  loading,
}: {
  mode: AiModeConfig;
  prompt: string;
  setPrompt: (v: string) => void;
  onGenerate: () => void;
  loading: boolean;
}) {
  return (
    <div className="bg-white rounded-card border border-ivory-dk p-5 space-y-4">
      <label className="block text-[0.8125rem] font-semibold text-foreground">
        صف طلبك بالتفصيل:
      </label>

      <textarea
        dir="rtl"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={mode.placeholder}
        rows={5}
        className="w-full px-4 py-3 rounded-btn border border-ivory-dk bg-ivory
          text-[0.875rem] text-foreground placeholder:text-muted resize-none
          outline-none focus:border-teal transition-colors duration-[150ms]"
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] text-muted m-0">
          {prompt.length} حرف — كلما زاد التفصيل، كان الناتج أدق
        </p>

        <button
          onClick={onGenerate}
          disabled={loading || !prompt.trim()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-btn
            font-semibold text-[0.875rem] text-white border-0 cursor-pointer
            transition-all duration-[150ms] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading
              ? "var(--c-muted)"
              : "linear-gradient(135deg,var(--c-teal),var(--c-teal-mid))",
          }}
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin">◌</span>
              جارٍ التوليد...
            </>
          ) : (
            <>✦ توليد بالذكاء الاصطناعي</>
          )}
        </button>
      </div>
    </div>
  );
}
