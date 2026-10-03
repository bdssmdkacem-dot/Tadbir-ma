/**
 * Public Transparency Portal — /public/[slug]
 * No authentication required. Publicly accessible.
 */
import { ZelligePattern } from "@/components/ui/ZelligePattern";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { projects } from "@/data/mocks/projects";
import { statusLabel, statusVariant } from "@/data/mocks/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جمعية التنمية المستدامة — تدبير.ma",
  description: "مشاريع وتقارير جمعية التنمية المستدامة بمراكش",
};

// In production: fetch org data from DB using slug
const ORG = {
  name:    "جمعية التنمية المستدامة",
  region:  "مراكش",
  type:    "جمعية تنموية",
  founded: "2018",
  mission: "نعمل على تعزيز التنمية المستدامة في المجتمعات الريفية بالمغرب من خلال برامج تمكين المرأة والشباب وحماية البيئة.",
};

// Only show 3 published projects in public view
const PUBLIC_PROJECTS = projects.filter(p => ["p1", "p3", "p5"].includes(p.id));

export default function PublicPortalPage({ params }: { params: { slug: string } }) {
  return (
    <div dir="rtl" className="min-h-screen" style={{ background: "var(--c-ivory)" }}>
      {/* ── Nav ── */}
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-8
        border-b border-ivory-dk" style={{ background: "var(--c-teal-dark)" }}>
        <a href="/" className="flex items-baseline gap-0.5 select-none">
          <span className="font-display font-black text-[1.125rem] text-white">تدبير</span>
          <span className="font-display font-black text-[1.125rem] text-gold">.ma</span>
        </a>
        <span className="text-[0.75rem] text-white/40">بوابة الشفافية</span>
      </header>

      {/* ── Org Hero ── */}
      <section className="relative overflow-hidden py-14 px-8 text-center"
        style={{ background: "linear-gradient(135deg,var(--c-teal-dark),var(--c-teal))" }}>
        <ZelligePattern opacity={0.08} />
        <div className="relative z-10 max-w-[40rem] mx-auto">
          <div className="w-16 h-16 rounded-card border-2 border-white/20 flex items-center
            justify-center text-[2rem] mx-auto mb-4" style={{ background: "rgba(255,255,255,0.1)" }}>
            🏛
          </div>
          <h1 className="font-display font-black text-[1.75rem] text-white m-0 mb-2">{ORG.name}</h1>
          <p className="text-white/60 text-[0.875rem] m-0 mb-4">
            {ORG.region} · {ORG.type} · منذ {ORG.founded}
          </p>
          <p className="text-white/75 text-[0.9375rem] leading-[1.75] m-0">{ORG.mission}</p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-b border-ivory-dk py-8 px-8"
        style={{ background: "var(--c-ivory-dk)" }}>
        <ul className="list-none p-0 m-0 max-w-[48rem] mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: PUBLIC_PROJECTS.length.toString(), label: "مشاريع منشورة" },
            { value: "1,847",                           label: "مستفيد مباشر"  },
            { value: "1.2M درهم",                       label: "حجم التمويل"   },
          ].map(s => (
            <li key={s.label}>
              <p className="font-display font-black text-[2rem] text-teal-dark m-0 leading-none">{s.value}</p>
              <p className="text-[0.8125rem] text-muted m-0 mt-1">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Projects ── */}
      <section className="py-12 px-8 max-w-[60rem] mx-auto">
        <h2 className="font-display font-black text-[1.375rem] text-teal-dark m-0 mb-8">
          المشاريع الجارية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PUBLIC_PROJECTS.map(p => (
            <article key={p.id}
              className="bg-white rounded-card border border-ivory-dk overflow-hidden">
              {/* Stripe */}
              <div className="h-1" style={{
                background: p.progress >= 80
                  ? "linear-gradient(90deg,var(--c-gold),var(--c-gold-lt))"
                  : "linear-gradient(90deg,var(--c-teal),var(--c-teal-mid))",
              }} />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
                  <span className="text-[0.6875rem] text-muted bg-ivory-dk rounded-badge px-2 py-0.5 flex-shrink-0">
                    {p.region}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[0.9375rem] text-foreground m-0 leading-snug">
                  {p.name}
                </h3>
                <p className="text-[0.75rem] text-muted m-0 leading-[1.6] line-clamp-3">
                  {p.description}
                </p>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[0.6875rem] text-muted">التقدم</span>
                    <span className="text-[0.6875rem] font-bold"
                      style={{ color: p.progress >= 80 ? "var(--c-gold)" : "var(--c-teal)" }}>
                      {p.progress}%
                    </span>
                  </div>
                  <ProgressBar value={p.progress} />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-ivory-dk text-[0.75rem]">
                  <span className="text-muted">الممول: <strong className="text-foreground">{p.funder.name}</strong></span>
                  <span className="text-muted">{p.budget.toLocaleString("ar-MA")} درهم</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Objectives ── */}
      <section className="py-12 px-8 max-w-[60rem] mx-auto">
        <h2 className="font-display font-black text-[1.375rem] text-teal-dark m-0 mb-6">
          الأهداف الرئيسية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "👩‍🌾", title: "تمكين المرأة",   desc: "500 امرأة ريفية مستفيدة من التكوين المهني والدعم الاقتصادي" },
            { icon: "☀️",  title: "الطاقة النظيفة", desc: "15 مدرسة قروية مجهزة بالطاقة الشمسية تخدم 2000 تلميذ" },
            { icon: "🌳",  title: "البيئة",          desc: "تشجير 500 هكتار وتوعية 5000 مواطن بأهمية الحفاظ على البيئة" },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-card border border-ivory-dk p-5 text-center">
              <span className="text-[2.5rem] block mb-3">{item.icon}</span>
              <h3 className="font-display font-bold text-[0.9375rem] text-foreground m-0 mb-2">{item.title}</h3>
              <p className="text-[0.8125rem] text-muted leading-[1.7] m-0">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-ivory-dk py-6 px-8 text-center"
        style={{ background: "var(--c-teal-dark)" }}>
        <p className="text-[0.75rem] text-white/40 m-0">
          نشر بواسطة{" "}
          <a href="/" className="text-gold hover:underline">تدبير.ma</a>
          {" "}· منصة شفافية الجمعيات والتعاونيات المغربية
        </p>
      </footer>
    </div>
  );
}
