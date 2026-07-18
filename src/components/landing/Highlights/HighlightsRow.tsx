import { Layers, Target, Zap, Smartphone } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { motion } from "framer-motion";
import { CountUp } from "@/components/landing/CountUp";

/* =============================================================
   HIGHLIGHTS ROW
   ============================================================= */
export function HighlightsRow() {
  const highlights = [
    { number: "01", icon: Layers, value: 5, suffix: "", title: "Core Modules", desc: "Mission Control, Cyber Academy, Investigation Lab, Simulation Lab, and Reports working together as one platform.", tone: "primary" },
    { number: "02", icon: Target, value: 20, suffix: "+", title: "Planned Investigations", desc: "Real-world cybersecurity scenarios covering phishing, malware, ransomware, digital forensics, and incident response.", tone: "success" },
    { number: "03", icon: Zap, title: "Interactive Learning", desc: "Hands-on simulations, guided investigations, and practical cybersecurity exercises instead of theory-only learning.", tone: "warning" },
    { number: "04", icon: Smartphone, title: "Cross-Platform Architecture", desc: "Designed for Flutter Mobile, Web Dashboard, REST API, PostgreSQL, Unity simulations, and Cloud-based services.", tone: "secondary" },
  ] as const;

  return (
    <section className="relative px-4 sm:px-8 pb-4">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 h-px w-full bg-gradient-to-r from-primary via-primary/20 to-transparent origin-left"
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((h, i) => (
            <Reveal key={i} delay={i * 80} className="flex h-full w-full">
              <HighlightCard {...h} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  icon: Icon,
  number,
  value,
  suffix,
  title,
  desc,
  tone,
}: {
  icon: any;
  number: string;
  value?: number;
  suffix?: string;
  title: string;
  desc: string;
  tone: string;
}) {
  const toneCls: Record<string, string> = {
    primary: "text-primary group-hover:border-primary/50",
    success: "text-success group-hover:border-success/50",
    warning: "text-warning group-hover:border-warning/50",
    secondary: "text-secondary group-hover:border-secondary/50",
  };

  const accentColor = toneCls[tone].split(" ")[0];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${toneCls[tone]} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_oklch(0.55_0.22_260/0.4)] will-change-transform p-6 sm:p-8 cursor-default flex flex-col w-full h-full`}
    >
      <div className="flex items-center justify-between">
        <span className={`h-10 w-10 rounded-xl bg-current/10 border border-current/20 flex items-center justify-center ${accentColor} transition-all duration-500 group-hover:shadow-[0_0_20px_currentColor]`}>
          <Icon className="h-5 w-5 group-hover:animate-pulse" />
        </span>
        <span className="font-mono text-[11px] font-semibold tracking-widest text-white/20 group-hover:text-white/40 transition-colors duration-300">
          {number}
        </span>
      </div>
      <div className="mt-8 flex flex-col flex-grow justify-start">
        <div className="flex flex-wrap items-baseline gap-1.5 font-display font-bold text-white tracking-tight">
          {value !== undefined && (
            <div className="flex items-baseline gap-0.5 text-3xl sm:text-4xl">
              <CountUp end={value} duration={1.5} />
              <span className={accentColor}>{suffix}</span>
            </div>
          )}
          <span className={value === undefined ? "text-xl sm:text-2xl" : "text-lg sm:text-xl text-white/90"}>{title}</span>
        </div>
        <div className="mt-3 text-[14px] leading-relaxed text-muted-foreground group-hover:text-white/70 transition-colors duration-300">
          {desc}
        </div>
      </div>
      <span className="pointer-events-none absolute -inset-x-8 -top-16 h-32 opacity-0 group-hover:opacity-100 blur-2xl bg-current/10 transition-opacity duration-500 will-change-opacity" />
    </div>
  );
}
