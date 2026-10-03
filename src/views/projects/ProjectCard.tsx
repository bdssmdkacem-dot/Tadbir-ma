"use client";

import { Hover } from "@/components/animation/springs/hover";
import { Inview } from "@/components/animation/springs/in-view";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { statusLabel, statusVariant, type Project } from "@/data/mocks/projects";

export function ProjectCard({
  project,
  delay = 0,
  onSelect,
}: {
  project: Project;
  delay?: number;
  onSelect: (id: string) => void;
}) {
  const spent = Math.round((project.spent / project.budget) * 100);

  return (
    <Inview
      tag="article"
      from={{ opacity: 0, y: 28 }}
      to={{ opacity: 1, y: 0 }}
      mode="once"
      config={{ tension: 200, friction: 28 }}
      delayIn={delay}
    >
      <Hover
        tag="div"
        from={{ y: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
        to={{ y: -5, boxShadow: "0 14px 36px color-mix(in srgb,var(--c-teal) 10%,transparent)" }}
        config={{ tension: 260, friction: 22 }}
        className="bg-white rounded-card border border-ivory-dk overflow-hidden
          cursor-pointer h-full flex flex-col"
        onClick={() => onSelect(project.id)}
      >
        {/* Colour stripe */}
        <div
          className="h-1 w-full flex-shrink-0"
          style={{
            background:
              project.progress >= 80
                ? "linear-gradient(90deg,var(--c-gold),var(--c-gold-lt))"
                : "linear-gradient(90deg,var(--c-teal),var(--c-teal-mid))",
          }}
        />

        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <Badge variant={statusVariant[project.status]}>
              {statusLabel[project.status]}
            </Badge>
            <span className="text-[0.6875rem] text-muted bg-ivory-dk rounded-badge px-2 py-0.5">
              {project.region}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-[0.9375rem] text-foreground
            leading-snug m-0 flex-1">
            {project.name}
          </h3>

          {/* Code + funder */}
          <div className="text-[0.75rem] text-muted space-y-0.5">
            <p className="m-0">{project.code}</p>
            <p className="m-0">الممول: <span className="text-foreground font-medium">{project.funder.name}</span></p>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-[0.6875rem] text-muted">تقدم التنفيذ</span>
              <span
                className="text-[0.6875rem] font-bold"
                style={{ color: project.progress >= 80 ? "var(--c-gold)" : "var(--c-teal)" }}
              >
                {project.progress}%
              </span>
            </div>
            <ProgressBar value={project.progress} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-ivory-dk">
            <div>
              <p className="text-[0.6875rem] text-muted m-0">الميزانية</p>
              <p className="text-[0.875rem] font-bold text-teal-dark m-0">
                {project.budget.toLocaleString("ar-MA")} <span className="text-[0.6875rem] font-normal text-muted">درهم</span>
              </p>
            </div>
            <div className="text-left">
              <p className="text-[0.6875rem] text-muted m-0">المصروف</p>
              <p className="text-[0.875rem] font-bold text-muted m-0">{spent}%</p>
            </div>
          </div>
        </div>
      </Hover>
    </Inview>
  );
}
