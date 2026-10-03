"use client";

import { useState, useMemo } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Badge } from "@/components/ui/Badge";
import { members, memberTypeLabel, memberTypeBadge, type MemberType } from "@/data/mocks/modules";

function AddMemberModal({ onClose }: { onClose: () => void }) {
  const [name,  setName]  = useState("");
  const [type,  setType]  = useState<MemberType>("employee");
  const [pos,   setPos]   = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{background:"rgba(8,63,77,0.6)",backdropFilter:"blur(4px)"}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div dir="rtl" className="w-full max-w-[26rem] bg-white rounded-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-dk">
          <h2 className="font-display font-bold text-[1rem] m-0">إضافة عضو</h2>
          <button onClick={onClose} className="text-muted text-[1.25rem] bg-transparent border-0 cursor-pointer">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {[
            {label:"الاسم الكامل *", el:<input value={name} onChange={e=>setName(e.target.value)} placeholder="فاطمة الزهراء" className={iCls}/>},
            {label:"المنصب",          el:<input value={pos}  onChange={e=>setPos(e.target.value)}  placeholder="مديرة المشاريع" className={iCls}/>},
            {label:"البريد الإلكتروني",el:<input value={email}onChange={e=>setEmail(e.target.value)}placeholder="example@org.ma" className={iCls}/>},
            {label:"النوع", el:(
              <select value={type} onChange={e=>setType(e.target.value as MemberType)} className={iCls}>
                {(Object.keys(memberTypeLabel) as MemberType[]).map(t=><option key={t} value={t}>{memberTypeLabel[t]}</option>)}
              </select>
            )},
          ].map(f=>(
            <div key={f.label} className="space-y-1.5">
              <label className="block text-[0.75rem] font-semibold text-foreground">{f.label}</label>
              {f.el}
            </div>
          ))}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-ivory-dk">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-btn text-[0.875rem] font-semibold text-muted bg-ivory-dk border-0 cursor-pointer">إلغاء</button>
          <button onClick={()=>{alert(`✓ تمت إضافة: ${name}`);onClose();}}
            className="flex-1 py-2.5 rounded-btn text-[0.875rem] font-semibold text-white border-0 cursor-pointer"
            style={{background:"var(--c-teal)"}}>✓ إضافة</button>
        </div>
      </div>
    </div>
  );
}

const iCls = "w-full px-3 py-2.5 rounded-btn border border-ivory-dk bg-background text-[0.875rem] text-foreground placeholder:text-muted outline-none focus:border-teal transition-colors duration-[150ms]";

export function HrPage() {
  const [typeF,     setTypeF]     = useState<"all"|MemberType>("all");
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(()=>members.filter(m=>{
    const mT = typeF==="all"||m.type===typeF;
    const mS = !search||m.name.includes(search)||m.position.includes(search);
    return mT&&mS;
  }),[typeF,search]);

  const counts: Record<string,number> = {
    all:      members.length,
    employee: members.filter(m=>m.type==="employee").length,
    volunteer:members.filter(m=>m.type==="volunteer").length,
    expert:   members.filter(m=>m.type==="expert").length,
    board:    members.filter(m=>m.type==="board").length,
  };

  return (
    <div dir="rtl" className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{key:"employee",label:"موظفون"},{key:"volunteer",label:"متطوعون"},{key:"expert",label:"خبراء"},{key:"board",label:"مجلس الإدارة"}].map((c,i)=>(
          <Inview key={c.key} tag="div" from={{opacity:0,y:16}} to={{opacity:1,y:0}} mode="once"
            config={{tension:220,friction:28}} delayIn={i*70}
            className="bg-white rounded-card border border-ivory-dk p-4 text-center cursor-pointer hover:border-teal transition-colors duration-[150ms]"
            onClick={()=>setTypeF(c.key as MemberType)}>
            <p className="font-display font-black text-[1.75rem] text-teal-dark m-0 leading-none">{counts[c.key]}</p>
            <p className="text-[0.75rem] text-muted m-0 mt-1">{c.label}</p>
          </Inview>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 بحث..."
          className="flex-1 min-w-[12rem] px-3 py-2.5 rounded-btn border border-ivory-dk bg-white text-[0.875rem] outline-none focus:border-teal transition-colors"/>
        <div className="flex gap-2">
          {(["all","employee","volunteer","expert","board"] as const).map(t=>(
            <button key={t} onClick={()=>setTypeF(t)}
              className="px-3 py-1.5 rounded-badge text-[0.75rem] font-semibold border cursor-pointer transition-all duration-[150ms]"
              style={{ background:typeF===t?"var(--c-teal)":"transparent", color:typeF===t?"#fff":"var(--c-muted)", borderColor:typeF===t?"var(--c-teal)":"var(--c-ivory-dk)" }}>
              {t==="all"?"الكل":memberTypeLabel[t as MemberType]}
            </button>
          ))}
        </div>
        <button onClick={()=>setShowModal(true)}
          className="mr-auto px-5 py-2.5 rounded-btn text-[0.875rem] font-semibold text-white border-0 cursor-pointer"
          style={{background:"linear-gradient(135deg,var(--c-teal),var(--c-teal-mid))"}}>
          + إضافة عضو
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-ivory-dk overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right">
            <thead>
              <tr className="bg-ivory">
                {["العضو","المنصب","النوع","المشروع","تاريخ الانضمام","الحالة",""].map(h=>(
                  <th key={h} className="px-4 py-2.5 text-[0.6875rem] font-semibold text-muted whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m,i)=>(
                <Inview key={m.id} tag="tr" from={{opacity:0}} to={{opacity:1}} mode="once"
                  config={{tension:220,friction:32}} delayIn={i*40}
                  className="border-t border-ivory-dk hover:bg-ivory transition-colors duration-[150ms]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[0.875rem] flex-shrink-0"
                        style={{background:"var(--c-teal-bg)",color:"var(--c-teal)"}}>
                        {m.initial}
                      </div>
                      <div>
                        <p className="text-[0.8125rem] font-semibold text-foreground m-0" style={{color:m.status==="inactive"?"var(--c-muted)":undefined}}>{m.name}</p>
                        <p className="text-[0.6875rem] text-muted m-0">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[0.8125rem] text-muted">{m.position}</td>
                  <td className="px-4 py-3"><Badge variant={memberTypeBadge[m.type]}>{memberTypeLabel[m.type]}</Badge></td>
                  <td className="px-4 py-3 text-[0.8125rem] text-muted whitespace-nowrap">{m.project}</td>
                  <td className="px-4 py-3 text-[0.8125rem] text-muted whitespace-nowrap">{m.startDate}</td>
                  <td className="px-4 py-3">
                    <Badge variant={m.status==="active"?"success":"muted"}>{m.status==="active"?"نشط":"غير نشط"}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[0.75rem] text-teal bg-transparent border-0 cursor-pointer hover:underline">تفاصيل</button>
                  </td>
                </Inview>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <AddMemberModal onClose={()=>setShowModal(false)}/>}
    </div>
  );
}
