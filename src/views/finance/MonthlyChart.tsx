"use client";

import { Inview } from "@/components/animation/springs/in-view";
import { monthlyData } from "@/data/mocks/finance";

const W = 560;   // viewBox width
const H = 180;   // viewBox height (chart area)
const PAD_L = 60;
const PAD_B = 32;
const PAD_T = 12;
const BAR_GAP = 6;

export function MonthlyChart() {
  const chartW = W - PAD_L;
  const chartH = H - PAD_B - PAD_T;
  const maxVal = Math.max(...monthlyData.flatMap((d) => [d.income, d.expense]));
  const colW   = chartW / monthlyData.length;
  const barW   = (colW - BAR_GAP * 3) / 2;

  const toY = (v: number) => PAD_T + chartH - (v / maxVal) * chartH;

  return (
    <Inview
      tag="div"
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      mode="once"
      config={{ tension: 200, friction: 28 }}
      delayIn={100}
      dir="rtl"
      className="bg-white rounded-card border border-ivory-dk p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-[0.9375rem] text-foreground m-0">
          المداخيل مقابل المصاريف الشهرية
        </h3>
        <div className="flex items-center gap-4 text-[0.6875rem]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--c-teal)" }} />
            مداخيل
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--c-gold)" }} />
            مصاريف
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: "320px" }}>
          {/* Y grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = PAD_T + chartH * (1 - t);
            return (
              <g key={t}>
                <line x1={PAD_L} x2={W} y1={y} y2={y} stroke="var(--c-ivory-dk)" strokeWidth="1" />
                <text x={PAD_L - 6} y={y + 4} textAnchor="end" fontSize="9" fill="var(--c-muted)">
                  {Math.round(maxVal * t / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {monthlyData.map((d, i) => {
            const x = PAD_L + i * colW;
            const incomeH = (d.income  / maxVal) * chartH;
            const expenseH = (d.expense / maxVal) * chartH;

            return (
              <g key={d.month}>
                {/* Income bar */}
                <rect
                  x={x + BAR_GAP}
                  y={toY(d.income)}
                  width={barW}
                  height={incomeH}
                  fill="var(--c-teal)"
                  rx="3"
                />
                {/* Expense bar */}
                <rect
                  x={x + BAR_GAP * 2 + barW}
                  y={toY(d.expense)}
                  width={barW}
                  height={expenseH}
                  fill="var(--c-gold)"
                  rx="3"
                />
                {/* Month label */}
                <text
                  x={x + colW / 2}
                  y={H - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--c-muted)"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Inview>
  );
}
