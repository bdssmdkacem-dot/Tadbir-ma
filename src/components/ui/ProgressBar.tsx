export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const color = value >= 80 ? "var(--c-gold)" : "var(--c-teal)";
  return (
    <div className={`w-full h-1.5 rounded-badge overflow-hidden bg-ivory-dk ${className}`}>
      <div
        className="h-full rounded-badge transition-all duration-500"
        style={{ width: `${Math.min(100, value)}%`, background: color }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
