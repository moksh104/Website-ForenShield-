import { useState } from "react";
import { GraduationCap, BookOpen, Zap, ShieldCheck, Wifi, Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { CurriculumModal } from "./CurriculumModal";

export function AcademyCard() {
  const [modalOpen, setModalOpen] = useState(false);
  
  /* NOTE: Amber/gold accents in this card are a deliberate exception to the site's blue-only palette. Do not "correct" to primary blue. */
  const courses = [
    { icon: Wifi, name: "Networking Basics", progress: 75, xp: 1240, tone: "primary" },
    { icon: Shield, name: "Web Security", progress: 60, xp: 980, tone: "success" },
    { icon: AlertTriangle, name: "Linux Essentials", progress: 40, xp: 620, tone: "warning" },
  ];

  return (
    <>
      <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[oklch(0.16_0.03_260)] to-[oklch(0.10_0.02_260)] p-8 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center gap-2">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <GraduationCap className="h-5 w-5 text-primary relative z-10" />
            <span className="text-white font-display font-bold text-lg relative z-10">Cyber Academy</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-achievement/15 border border-achievement/30 px-2 py-0.5 text-[10px] font-mono text-achievement">
            <BookOpen className="h-2.5 w-2.5" /> 8 MODULES
          </span>
        </div>

        {/* XP + certificate row */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-primary/25 bg-primary/8 p-2">
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <Zap className="h-3 w-3 text-primary" /> AVG XP EARNED
            </div>
            <div className="mt-0.5 font-display font-bold text-lg text-white leading-none">2,840</div>
            <div className="text-[9px] font-mono text-primary/80 mt-0.5">per learner</div>
          </div>
          <div className="rounded-lg border border-achievement/25 bg-achievement/8 p-2">
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-achievement" /> CERTIFICATES
            </div>
            <div className="mt-0.5 font-display font-bold text-lg text-white leading-none">8 Available</div>
            <div className="text-[9px] font-mono text-achievement/80 mt-0.5">Industry-recognized</div>
          </div>
        </div>

        <div className="mt-3 space-y-2 flex-1">
          {courses.map((c, i) => {
            const Icon = c.icon;
            const toneCls: Record<string, string> = {
              primary: "text-primary bg-primary/15 border-primary/30",
              success: "text-success bg-success/15 border-success/30",
              warning: "text-warning bg-warning/15 border-warning/30",
            };
            const barCls: Record<string, string> = {
              primary: "from-primary to-secondary",
              success: "from-success to-primary",
              warning: "from-warning to-danger",
            };
            return (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 hover:bg-white/[0.04] transition-colors cursor-default group"
                style={{ animation: `fade-up 0.6s ${i * 120}ms both` }}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-8 w-8 rounded-lg border flex items-center justify-center ${toneCls[c.tone]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] text-white font-medium truncate group-hover:text-white">{c.name}</div>
                      <span className="text-[9px] font-mono text-achievement">+{c.xp} XP</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between text-[9px] text-muted-foreground font-mono">
                      <span>8 Modules</span>
                      <span className="text-white/80">{c.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${barCls[c.tone]}`}
                    style={{
                      width: `${c.progress}%`,
                      animation: "shimmer 3s linear infinite",
                      backgroundSize: "200% 100%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill tree mini */}
        <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
            <span>Skill Tree</span>
            <span className="text-primary">7 unlocked</span>
          </div>
          <svg viewBox="0 0 200 40" className="w-full h-8 mt-1">
            {[
              { x: 15, y: 20, u: true }, { x: 45, y: 10, u: true }, { x: 45, y: 30, u: true },
              { x: 80, y: 20, u: true }, { x: 115, y: 10, u: true }, { x: 115, y: 30, u: true },
              { x: 150, y: 20, u: true }, { x: 185, y: 20, u: false },
            ].map((n, i, arr) => {
              const prev = arr[i - 1];
              return (
                <g key={i}>
                  {prev && <line x1={prev.x} y1={prev.y} x2={n.x} y2={n.y} stroke={n.u ? "#3B82F6" : "oklch(1 0 0 / 0.15)"} strokeWidth="0.8" strokeDasharray={n.u ? "0" : "2 2"} />}
                  <circle cx={n.x} cy={n.y} r="3.5" fill={n.u ? "#3B82F6" : "oklch(0.20 0.03 260)"} stroke={n.u ? "#22D3EE" : "oklch(1 0 0 / 0.2)"} strokeWidth="0.8" className={n.u ? "drop-shadow-[0_0_4px_rgba(59,130,246,0.5)] animate-pulse-glow" : ""} style={{ animationDelay: `${i * 0.15}s` }} />
                </g>
              );
            })}
          </svg>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all outline-none"
        >
          View Curriculum <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <CurriculumModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
