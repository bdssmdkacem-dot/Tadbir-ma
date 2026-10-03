import { ReactNode } from "react";
type V = "teal" | "gold" | "muted" | "white" | "success" | "danger";
const S: Record<V, string> = {
  teal:    "bg-teal-bg  text-teal     border border-teal/20",
  gold:    "bg-amber-50 text-gold     border border-gold/20",
  muted:   "bg-ivory-dk text-muted    border border-ivory-dk",
  white:   "bg-white/15 text-white    border border-white/20",
  success: "bg-success-bg text-success border border-success/20",
  danger:  "bg-danger-bg  text-danger  border border-danger/20",
};
export function Badge({ children, variant = "teal", className = "" }: { children: ReactNode; variant?: V; className?: string }) {
  return <span className={`inline-flex items-center rounded-badge px-[10px] py-[2px] text-[0.6875rem] font-semibold tracking-[0.3px] ${S[variant]} ${className}`}>{children}</span>;
}
