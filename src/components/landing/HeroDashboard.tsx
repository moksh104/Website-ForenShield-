import type { ReactNode } from "react";
import {
  Shield,
  Activity,
  Radar,
  Lock,
  Fingerprint,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  ScanLine,
  FileSearch,
} from "lucide-react";

/**
 * Hero Visual — a faux cyber operations dashboard.
 * Pure SVG + DOM, no external libs. Built to feel like a real SOC console.
 */
export function HeroDashboard() {
  return (
    <div className="relative aspect-[4/3] w-full max-w-[640px] mx-auto">
      {/* Outer glow */}
      <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.16_210/0.18),transparent_70%)] blur-2xl" />

      {/* Main panel */}
      <div className="relative h-full w-full glass-strong rounded-2xl shadow-elevated overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-danger" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning" />
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
            <span className="ml-3 font-mono text-[11px] text-muted-foreground tracking-wider">
              forenshield://ops/console
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            LIVE · 04:21:08
          </div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-12 gap-3 p-4 h-[calc(100%-44px)]">
          {/* Threat radar */}
          <div className="col-span-5 row-span-2 glass rounded-xl p-3 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
                THREAT RADAR
              </div>
              <Radar className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="relative aspect-square w-full">
              {/* concentric rings */}
              {[0.95, 0.7, 0.45, 0.22].map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 m-auto rounded-full border border-primary/20"
                  style={{ transform: `scale(${s})` }}
                />
              ))}
              {/* sweep */}
              <div className="absolute inset-0 animate-radar">
                <div
                  className="absolute top-1/2 left-1/2 h-1/2 w-1/2 origin-top-left"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, oklch(0.86 0.16 210 / 0.35) 30deg, transparent 90deg)",
                  }}
                />
              </div>
              {/* threat dots */}
              <span className="absolute top-[20%] left-[60%] h-2 w-2 rounded-full bg-danger shadow-[0_0_12px_#EF4444]">
                <span className="absolute inset-0 rounded-full bg-danger animate-pulse-ring" />
              </span>
              <span className="absolute top-[55%] left-[30%] h-2 w-2 rounded-full bg-warning shadow-[0_0_10px_#F59E0B]" />
              <span className="absolute top-[72%] left-[68%] h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#00E5FF]" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary glow-cyan" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-[9px] font-mono">
              <div className="text-danger">CRIT · 3</div>
              <div className="text-warning">WARN · 12</div>
              <div className="text-success">OK · 248</div>
            </div>
          </div>

          {/* Live alerts */}
          <div className="col-span-7 glass rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
                LIVE ALERTS
              </div>
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
            </div>
            <ul className="space-y-1.5">
              {[
                { c: "text-danger", b: "bg-danger/15", t: "Phishing payload detected", m: "mail-gateway-02", k: "CRIT" },
                { c: "text-warning", b: "bg-warning/15", t: "Anomalous OTP request burst", m: "auth-svc", k: "WARN" },
                { c: "text-primary", b: "bg-primary/15", t: "Evidence hash verified", m: "case #4127", k: "INFO" },
              ].map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 bg-white/[0.02] border border-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${a.b} ${a.c}`}>
                      {a.k}
                    </span>
                    <span className="text-[11px] text-white truncate">{a.t}</span>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground hidden sm:inline">
                    {a.m}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence */}
          <div className="col-span-7 glass rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
                EVIDENCE STREAM
              </div>
              <FileSearch className="h-3.5 w-3.5 text-secondary" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { i: Fingerprint, l: "PRINT", v: "a17f…b9" },
                { i: Lock, l: "HASH", v: "SHA-256" },
                { i: Terminal, l: "LOG", v: "/var/auth" },
              ].map(({ i: Ico, l, v }, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-white/5 bg-white/[0.02] p-2 flex flex-col gap-1"
                >
                  <Ico className="h-3.5 w-3.5 text-primary" />
                  <div className="text-[9px] font-mono text-muted-foreground">{l}</div>
                  <div className="text-[10px] font-mono text-white truncate">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status pill */}
          <div className="col-span-5 glass rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
                DEFENSE
              </div>
              <Shield className="h-3.5 w-3.5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">98.7%</div>
              <div className="text-[10px] text-muted-foreground">posture score</div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-secondary animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Scan line */}
        <div
          className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan"
          style={{ top: 0 }}
        />
      </div>

      {/* Floating chips */}
      <FloatingChip
        className="-left-6 top-12 hidden md:flex animate-float"
        icon={<ScanLine className="h-3.5 w-3.5 text-primary" />}
        label="Packet inspected"
        value="2,481 / s"
      />
      <FloatingChip
        className="-right-4 top-1/3 hidden md:flex animate-float-slow"
        icon={<CheckCircle2 className="h-3.5 w-3.5 text-success" />}
        label="Case solved"
        value="UPI-0421"
      />
      <FloatingChip
        className="-left-4 -bottom-4 hidden md:flex animate-float"
        icon={<Activity className="h-3.5 w-3.5 text-secondary" />}
        label="Investigation"
        value="LIVE"
      />
    </div>
  );
}

function FloatingChip({
  icon,
  label,
  value,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute glass-strong rounded-xl px-3 py-2 flex items-center gap-2 shadow-elevated ${className}`}
    >
      <div className="h-7 w-7 rounded-md bg-white/5 flex items-center justify-center">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-[11px] font-semibold text-white">{value}</span>
      </div>
    </div>
  );
}

function ReactNamespacePlaceholder() {
  return null;
}
void ReactNamespacePlaceholder;
