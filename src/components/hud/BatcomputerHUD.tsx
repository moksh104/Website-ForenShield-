import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ChevronDown,
  ChevronUp,
  FileSearch,
  FolderLock,
  Radar,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";

/**
 * Persistent Batcomputer-style HUD overlay.
 * Renders on every route as a fixed bottom-right console.
 * - Mission status: derived from the current route
 * - Radar sweep (SVG)
 * - Live counters: evidence, cases, XP
 * - Ticker of latest alerts
 */
type RouteKey = "/" | "/app" | "/investigate" | "/academy" | "/simulate" | "other";

const MISSIONS: Record<RouteKey, { label: string; sub: string; tone: string }> = {
  "/": { label: "RECON", sub: "Product Overview", tone: "text-muted-foreground" },
  "/app": { label: "MISSION CONTROL", sub: "Agent Console", tone: "text-primary" },
  "/investigate": { label: "ACTIVE CASE", sub: "Forensic Lab", tone: "text-secondary" },
  "/academy": { label: "TRAINING", sub: "Cyber Academy", tone: "text-warning" },
  "/simulate": { label: "RED-TEAM SIM", sub: "Attack Surface", tone: "text-danger" },
  other: { label: "STANDBY", sub: "Uplink", tone: "text-muted-foreground" },
};

function routeKey(pathname: string): RouteKey {
  if (pathname === "/") return "/";
  if (pathname.startsWith("/app")) return "/app";
  if (pathname.startsWith("/investigate")) return "/investigate";
  if (pathname.startsWith("/academy")) return "/academy";
  if (pathname.startsWith("/simulate")) return "/simulate";
  return "other";
}

const ALERTS = [
  { code: "FS-001", text: "UPI fraud · new mule VPA observed" },
  { code: "FS-005", text: "Spoofed invoice · DKIM=fail flagged" },
  { code: "FS-003", text: "WhatsApp OTP impersonation +2" },
  { code: "FS-007", text: "Job-scam ring · KYC dump indexed" },
];

export function BatcomputerHUD() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const key = routeKey(pathname);
  const mission = MISSIONS[key];

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // rotate the alert ticker
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, []);

  const alert = useMemo(() => ALERTS[tick % ALERTS.length], [tick]);

  // hide entirely on /app splash/onboarding to avoid covering the phone frame —
  // we still show it on the mission control home (controlled below via inset on mobile)
  if (!mounted) return null;

  return (
    <div
      className="fixed z-[60] bottom-3 right-3 sm:bottom-4 sm:right-4 font-mono pointer-events-none"
      aria-live="polite"
    >
      <div
        className={[
          "pointer-events-auto rounded-2xl glass-strong shadow-elevated overflow-hidden backdrop-blur-xl",
          "border border-primary/20",
          open ? "w-[300px]" : "w-[210px]",
          "transition-[width] duration-300 ease-out flex flex-col",
          open ? "max-h-[400px]" : "max-h-auto"
        ].join(" ")}
      >
        {/* top scanline */}
        <div className="relative h-px w-full overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan" />
        </div>

        {/* Header bar */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full shrink-0 flex items-center gap-2.5 px-3 py-2 text-left hover:bg-white/[0.03] transition"
          aria-expanded={open}
          aria-label="Toggle HUD"
        >
          <RadarBadge tone={mission.tone} />
          <div className="min-w-0 flex-1">
            <div className={`text-[9px] tracking-[0.2em] ${mission.tone}`}>{mission.label}</div>
            <div className="text-[11px] text-foreground/90 truncate">{mission.sub}</div>
          </div>
          {open ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        {/* Counters strip (always visible) */}
        <div className="grid grid-cols-3 border-t border-white/5 shrink-0">
          <Counter icon={<FileSearch className="h-3 w-3" />} label="EVID" value="128" tone="text-primary" />
          <Counter icon={<FolderLock className="h-3 w-3" />} label="CASE" value="07" tone="text-secondary" />
          <Counter icon={<Sparkles className="h-3 w-3" />} label="XP" value="4.8K" tone="text-achievement" />
        </div>

        {/* Expanded body */}
        {open && (
          <div className="border-t border-white/5 p-3 space-y-3 animate-fade-up overflow-y-auto custom-scrollbar">
            {/* Alert ticker */}
            <div className="rounded-lg border border-danger/25 bg-danger/[0.06] p-2 shrink-0">
              <div className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-danger">
                <ShieldAlert className="h-3 w-3 animate-pulse-glow" /> ALERT FEED
              </div>
              <div key={alert.code} className="mt-1 text-[11px] text-foreground/90 animate-fade-up">
                <span className="text-danger">{alert.code}</span>
                <span className="text-muted-foreground"> · </span>
                {alert.text}
              </div>
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-2 gap-2 text-[10px] shrink-0">
              <Vital label="UPLINK" value="STABLE" tone="text-success" dot />
              <Vital label="THREAT" value="ELEVATED" tone="text-warning" dot />
              <Vital label="LATENCY" value="42ms" tone="text-primary" />
              <Vital label="SHIELD" value="100%" tone="text-success" />
            </div>

            {/* Quick jumps */}
            <div className="grid grid-cols-3 gap-1.5 shrink-0">
              <HudJump to="/app" icon={<Activity className="h-3 w-3" />} label="HQ" />
              <HudJump to="/investigate" icon={<FileSearch className="h-3 w-3" />} label="LAB" />
              <HudJump to="/simulate" icon={<Zap className="h-3 w-3" />} label="SIM" />
            </div>
          </div>
        )}

        {/* bottom scanline */}
        <div className="relative h-px w-full overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/60 to-transparent animate-scan" />
        </div>
      </div>
    </div>
  );
}

function RadarBadge({ tone }: { tone: string }) {
  return (
    <div className="relative h-8 w-8 shrink-0 rounded-lg bg-black/40 border border-white/10 overflow-hidden">
      <svg viewBox="0 0 40 40" className="absolute inset-0">
        <defs>
          <radialGradient id="hud-radar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className={tone}>
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeOpacity="0.25" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeOpacity="0.18" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeOpacity="0.18" />
          <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeOpacity="0.12" />
          <line x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeOpacity="0.12" />
        </g>
        <g className={`${tone} animate-radar`} style={{ transformOrigin: "20px 20px" }}>
          <path d="M20 20 L20 2 A18 18 0 0 1 38 20 Z" fill="url(#hud-radar)" />
          <line x1="20" y1="20" x2="20" y2="2" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1" />
        </g>
        {/* contact blips */}
        <circle cx="26" cy="13" r="1.1" className="fill-danger animate-blink" />
        <circle cx="13" cy="27" r="0.9" className="fill-primary animate-pulse-glow" />
      </svg>
      <Radar className="absolute inset-0 m-auto h-3 w-3 text-foreground/0" aria-hidden />
    </div>
  );
}

function Counter({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="px-2.5 py-1.5 border-r last:border-r-0 border-white/5">
      <div className="flex items-center gap-1 text-[8px] tracking-[0.2em] text-muted-foreground">
        <span className={tone}>{icon}</span>
        {label}
      </div>
      <div className={`text-[12px] font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function Vital({
  label,
  value,
  tone,
  dot,
}: {
  label: string;
  value: string;
  tone: string;
  dot?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white/[0.03] border border-white/5 px-2 py-1">
      <span className="tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className={`flex items-center gap-1 ${tone}`}>
        {dot && <span className="h-1 w-1 rounded-full bg-current animate-blink" />}
        {value}
      </span>
    </div>
  );
}

function HudJump({
  to,
  icon,
  label,
}: {
  to: "/app" | "/investigate" | "/simulate" | "/academy";
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center gap-1 h-7 rounded-md border border-white/10 bg-white/[0.03] text-[10px] tracking-[0.18em] text-foreground/80 hover:text-primary hover:border-primary/40 transition"
    >
      {icon}
      {label}
    </Link>
  );
}
