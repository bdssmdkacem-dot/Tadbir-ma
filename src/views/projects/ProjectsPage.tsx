"use client";

import { useState, useMemo } from "react";
import { ProjectCard }      from "./ProjectCard";
import { ProjectFilters }   from "./ProjectFilters";
import { NewProjectModal }  from "./NewProjectModal";
import { ProjectDetail }    from "./ProjectDetail";
import { projects, type ProjectStatus } from "@/data/mocks/projects";

export function ProjectsPage() {
  const [search,       setSearch]       = useState("");
  const [region,       setRegion]       = useState("الكل");
  const [status,       setStatus]       = useState<"all" | ProjectStatus>("all");
  const [showModal,    setShowModal]    = useState(false);
  const [selectedId,   setSelectedId]   = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = !search || p.name.includes(search) || p.funder.name.includes(search);
      const matchRegion = region === "الكل" || p.region === region;
      const matchStatus = status === "all" || p.status === status;
      return matchSearch && matchRegion && matchStatus;
    });
  }, [search, region, status]);

  // Show detail view
  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div dir="rtl">
      <ProjectFilters
        search={search}       setSearch={setSearch}
        region={region}       setRegion={setRegion}
        status={status}       setStatus={setStatus}
        onNew={() => setShowModal(true)}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <span className="text-[2.5rem]">🔍</span>
          <p className="text-[0.9375rem] text-muted m-0">لا توجد مشاريع تطابق معايير البحث</p>
          <button
            onClick={() => { setSearch(""); setRegion("الكل"); setStatus("all"); }}
            className="text-[0.875rem] text-teal bg-transparent border-0 cursor-pointer
              hover:underline font-semibold"
          >
            مسح الفلاتر
          </button>
        </div>
      ) : (
        <>
          <p className="text-[0.75rem] text-muted mb-4 m-0">
            {filtered.length} مشروع
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                delay={i * 60}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </>
      )}

      {showModal && <NewProjectModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
