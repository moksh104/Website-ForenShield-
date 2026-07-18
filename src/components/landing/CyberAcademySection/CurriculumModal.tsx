import { MouseEvent } from "react";
import { X, GraduationCap, BookOpen, Wifi, Shield, AlertTriangle, Lock, Mail, Bug, Zap, Globe } from "lucide-react";

export const ALL_COURSES = [
  { icon: Wifi, name: "Networking Basics", progress: 75, xp: 1240, tone: "primary", modules: 8 },
  { icon: Shield, name: "Web Security", progress: 60, xp: 980, tone: "success", modules: 6 },
  { icon: AlertTriangle, name: "Linux Essentials", progress: 40, xp: 620, tone: "warning", modules: 5 },
  { icon: Lock, name: "Cryptography Basics", progress: 0, xp: 850, tone: "primary", modules: 4 },
  { icon: Mail, name: "Social Engineering & Phishing", progress: 0, xp: 750, tone: "warning", modules: 5 },
  { icon: Bug, name: "Malware Analysis Fundamentals", progress: 0, xp: 1100, tone: "danger", modules: 7 },
  { icon: Zap, name: "Incident Response", progress: 0, xp: 920, tone: "primary", modules: 6 },
  { icon: Globe, name: "Cloud Security Basics", progress: 0, xp: 1050, tone: "success", modules: 5 },
];

export interface CurriculumModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function CurriculumModal({ open, onOpenChange }: CurriculumModalProps) {
  if (!open) return null;

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    const target = document.querySelector("#download");
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
        style={{ animation: "fade-up 0.3s ease" }}
      />
      {/* Modal */}
      <div
        className="relative w-[min(96vw,560px)] max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 shadow-elevated flex flex-col"
        style={{
          background: "rgba(11,18,32,0.95)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold text-white text-2xl tracking-tight">
              Cyber Academy Curriculum
            </h3>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-achievement/15 border border-achievement/30 px-2 py-0.5 text-[10px] font-mono text-achievement">
              <BookOpen className="h-2.5 w-2.5" /> 8 MODULES
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
            Master the fundamentals of Cyber Defense. Below is the complete learning path required to unlock advanced simulations.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto max-h-[50vh] custom-scrollbar p-6 space-y-3">
          {ALL_COURSES.map((c, i) => {
            const Icon = c.icon;
            const toneCls: Record<string, string> = {
              primary: "text-primary bg-primary/15 border-primary/30",
              success: "text-success bg-success/15 border-success/30",
              warning: "text-warning bg-warning/15 border-warning/30",
              danger: "text-danger bg-danger/15 border-danger/30",
            };
            const barCls: Record<string, string> = {
              primary: "from-primary to-secondary",
              success: "from-success to-primary",
              warning: "from-warning to-danger",
              danger: "from-danger to-warning",
            };
            return (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-colors cursor-default group"
                style={{ animation: `fade-up 0.4s ${i * 50}ms both` }}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-10 w-10 shrink-0 rounded-lg border flex items-center justify-center ${toneCls[c.tone]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] text-white font-medium truncate group-hover:text-white">{c.name}</div>
                      <span className="text-[10px] font-mono text-achievement">+{c.xp} XP</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                      <span>{c.modules} Modules</span>
                      <span className="text-white/80">{c.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${barCls[c.tone]}`}
                    style={{
                      width: `${c.progress}%`,
                      animation: c.progress > 0 ? "shimmer 3s linear infinite" : "none",
                      backgroundSize: "200% 100%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] shrink-0">
          <button
            onClick={handleDownload}
            className="w-full relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 will-change-transform hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <span className="relative inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Start Learning
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
