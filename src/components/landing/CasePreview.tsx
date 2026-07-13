import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  Mail,
  Users,
  CreditCard,
  Fingerprint,
  ShieldAlert,
  ArrowRight,
  Link2,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Server,
  Hash,
  Clock,
  MapPin,
  Eye,
  FileText,
  Smartphone,
  Wifi,
  Lock,
  Brain,
  Search,
} from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";
import { useLowPower } from "@/hooks/useLowPower";
import { CASES, type CaseId, type CaseMeta } from "./cases.data";

export { CASES };
export type { CaseId, CaseMeta };

// Context so every scene/panel can opt out of expensive animations
// without threading a prop through every component.
const LowPowerCtx = createContext(false);
const useLP = () => useContext(LowPowerCtx);

export default function CasePreview({
  open,
  onOpenChange,
  caseId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  caseId: CaseId | null;
}) {
  const c = CASES.find((x) => x.id === caseId);
  const lowPower = useLowPower();
  return (
    <LowPowerCtx.Provider value={lowPower}>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[70] w-[min(96vw,1080px)] max-h-[92vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl glass-strong shadow-elevated border border-white/10 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          >
            {c && <CaseScene c={c} />}
            <Dialog.Close
              aria-label="Close case preview"
              className="absolute top-4 right-4 z-30 h-9 w-9 rounded-lg glass-strong flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 transition"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LowPowerCtx.Provider>
  );
}

// Named export kept for any caller still importing { CasePreview }.
export { CasePreview };

/* ============================== SCENE SHELL ============================== */
function CaseScene({ c }: { c: CaseMeta }) {
  const Icon = ICONS[c.id];
  const lp = useLP();
  const sevColor =
    c.severity === "CRITICAL"
      ? "text-danger"
      : c.severity === "HIGH"
      ? "text-warning"
      : "text-primary";

  return (
    <div className="relative max-h-[92vh] overflow-y-auto">
      {/* Cinematic header */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.21_0.04_265),oklch(0.13_0.03_265))]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,oklch(0.86_0.16_210/0.22),transparent_60%)]" />
        {!lp && (
          <div
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan"
            aria-hidden
          />
        )}
        <Dialog.Title asChild>
          <div className="relative h-full flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl glass-strong flex items-center justify-center glow-cyan">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-primary">
                    {c.code}
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className={`font-mono text-[10px] flex items-center gap-1 ${sevColor}`}>
                    <span className={`h-1.5 w-1.5 rounded-full bg-current ${lp ? "" : "animate-blink"}`} />
                    {c.severity}
                  </span>

                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 text-muted-foreground bg-white/[0.02]">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-2xl sm:text-3xl tracking-tight truncate">
                  {c.title}
                </h3>
              </div>
            </div>
          </div>
        </Dialog.Title>
      </div>

      {/* Body grid */}
      <div className="p-6 sm:p-8 grid grid-cols-12 gap-4 sm:gap-5">
        {/* Briefing */}
        <div className="col-span-12 lg:col-span-8">
          <SceneStage c={c} />
        </div>

        {/* Side rail */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <BriefingPanel c={c} />
          <KillChainPanel c={c} />
        </div>

        {/* Evidence row */}
        <div className="col-span-12">
          <EvidenceRow c={c} />
        </div>

        {/* CTA bar */}
        <div className="col-span-12 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl glass p-4 sm:p-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg glass-strong flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                Ready to investigate?
              </div>
              <div className="text-xs text-muted-foreground truncate">
                Step into the live scenario inside ForenShield's lab.
              </div>
            </div>
          </div>
          <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold transition hover:shadow-[0_0_40px_oklch(0.86_0.16_210/0.5)]">
            Launch Investigation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== SCENE STAGES ============================== */
function SceneStage({ c }: { c: CaseMeta }) {
  return (
    <div className="relative h-[340px] sm:h-[400px] rounded-2xl glass overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(0.52_0.25_295/0.18),transparent_60%)]" />
      {c.id === "case-01" && <PhishingScene />}
      {c.id === "case-02" && <FakeJobScene />}
      {c.id === "case-03" && <UPIScene />}
      {c.id === "case-04" && <IdentityScene />}
    </div>
  );
}

/* ---- CASE 01: Phishing email being analyzed ---- */
function PhishingScene() {
  const lp = useLP();
  return (
    <div className="relative h-full w-full p-5 sm:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Email card */}
        <div className="relative rounded-xl glass-strong border border-white/10 overflow-hidden shadow-elevated">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[11px] font-mono text-muted-foreground">inbox / suspicious</span>
            <span className="ml-auto text-[10px] font-mono text-danger flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full bg-danger ${lp ? "" : "animate-blink"}`} /> FLAGGED
            </span>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-muted-foreground">From:</span>
              <span className="text-white truncate ml-2">
                billing@payp<span className="text-danger">aI</span>-secure.com
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-muted-foreground">Subject:</span>
              <span className="text-white truncate ml-2">Invoice #INV-90213 · Action required</span>
            </div>
            <div className="pt-3 mt-1 border-t border-white/5 text-sm text-white/80 leading-relaxed">
              <span className="text-muted-foreground">Dear customer, </span>
              your account is on hold. Please confirm your billing at{" "}
              <span className="text-danger underline decoration-dotted">
                hxxps://paypaI-billing.app/login
              </span>{" "}
              within 24 hours.
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-danger/10 border border-danger/20 px-2.5 py-1.5 text-[11px] text-danger font-mono">
              <AlertTriangle className="h-3 w-3" /> Lookalike domain · Capital I → lowercase L
            </div>
          </div>
        </div>

        {/* Annotation arrows */}
        <Annotation
          className="absolute -left-2 top-14 -translate-x-full hidden sm:flex"
          label="Spoofed sender"
          tone="danger"
        />
        <Annotation
          className="absolute -right-2 bottom-20 translate-x-full hidden sm:flex"
          label="Malicious URL"
          tone="warning"
        />

        {/* Scanner ring */}
        {!lp && (
          <div className="absolute -inset-6 rounded-2xl border border-primary/20 animate-pulse-glow pointer-events-none" />
        )}
      </div>
    </div>
  );
}

/* ---- CASE 02: Fake job scam — chat → offer → portal ---- */
function FakeJobScene() {
  return (
    <div className="relative h-full w-full p-5 sm:p-6">
      <div className="relative h-full grid grid-cols-3 gap-3">
        {/* Chat */}
        <div className="col-span-1 rounded-xl glass-strong border border-white/10 p-3 flex flex-col">
          <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
            DM · WHATSAPP
          </div>
          <div className="mt-3 space-y-2 flex-1">
            <Bubble side="left">Hi! We saw your CV — $9K/mo, remote.</Bubble>
            <Bubble side="right">Sounds great! Next step?</Bubble>
            <Bubble side="left" tone="danger">
              Pay $49 onboarding to activate offer
            </Bubble>
          </div>
          <div className="mt-2 text-[10px] font-mono text-danger flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Advance-fee pattern
          </div>
        </div>

        {/* Offer letter */}
        <div className="col-span-1 rounded-xl glass-strong border border-white/10 p-3 relative overflow-hidden">
          <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
            OFFER · PDF
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-2/3 rounded bg-white/15" />
            <div className="h-1.5 w-full rounded bg-white/10" />
            <div className="h-1.5 w-5/6 rounded bg-white/10" />
            <div className="h-1.5 w-3/4 rounded bg-white/10" />
            <div className="h-1.5 w-2/3 rounded bg-white/10" />
            <div className="mt-3 h-10 rounded bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/5" />
            <div className="h-1.5 w-1/2 rounded bg-white/5" />
          </div>
          <div className="absolute -top-6 -right-6 h-20 w-20 rotate-12 rounded-full bg-warning/15 border border-warning/30 flex items-center justify-center">
            <span className="text-[9px] font-mono text-warning rotate-12">SUSPECT</span>
          </div>
        </div>

        {/* Fake portal */}
        <div className="col-span-1 rounded-xl glass-strong border border-white/10 overflow-hidden flex flex-col">
          <div className="px-3 py-2 border-b border-white/5 bg-white/[0.02] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            <span className="h-1.5 w-1.5 rounded-full bg-warning" />
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="ml-2 text-[9px] font-mono text-danger truncate">
              hxxps://onboard-careers.top
            </span>
          </div>
          <div className="p-3 flex-1 flex flex-col justify-center gap-2">
            <div className="text-[10px] font-mono text-muted-foreground">Pay onboarding fee</div>
            <div className="h-7 rounded bg-white/5 border border-white/10" />
            <div className="h-7 rounded bg-white/5 border border-white/10" />
            <div className="h-7 rounded bg-gradient-to-r from-primary/40 to-secondary/40 flex items-center justify-center text-[10px] font-semibold text-white">
              Pay $49
            </div>
            <div className="mt-1 text-[9px] font-mono text-danger flex items-center gap-1">
              <Lock className="h-2.5 w-2.5" /> No TLS · Untrusted CA
            </div>
          </div>
        </div>

        {/* Flow arrows */}
        <FlowArrow className="absolute top-1/2 left-[33%] -translate-y-1/2 hidden sm:block" />
        <FlowArrow className="absolute top-1/2 left-[66%] -translate-y-1/2 hidden sm:block" />
      </div>
    </div>
  );
}

/* ---- CASE 03: UPI transaction trail map ---- */
function UPIScene() {
  const lp = useLP();
  return (
    <div className="relative h-full w-full p-5 sm:p-6">
      <svg
        viewBox="0 0 600 360"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <defs>
          <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M 80 280 C 180 200, 240 300, 320 200 S 480 80, 540 110"
          fill="none"
          stroke="url(#trail)"
          strokeWidth="2"
          className={lp ? "" : "animate-data-flow"}
        />
      </svg>


      {/* Nodes */}
      <UPINode
        className="absolute left-[6%] bottom-[18%]"
        icon={<Smartphone className="h-4 w-4 text-primary" />}
        label="Victim Wallet"
        sub="UPI · ****4310"
      />
      <UPINode
        className="absolute left-[40%] top-[40%]"
        icon={<Wifi className="h-4 w-4 text-warning" />}
        label="Relay Node"
        sub="Mule Account · MH"
      />
      <UPINode
        className="absolute right-[6%] top-[14%]"
        icon={<Server className="h-4 w-4 text-danger" />}
        label="Cash-out"
        sub="ATM · Unknown"
        tone="danger"
      />

      {/* Tx ticker */}
      <div className="absolute bottom-4 left-4 right-4 rounded-xl glass-strong border border-white/10 px-3 py-2 flex items-center gap-3 overflow-hidden">
        <CreditCard className="h-3.5 w-3.5 text-primary shrink-0" />
        <div
          className={`flex gap-6 text-[10px] font-mono whitespace-nowrap ${lp ? "" : "animate-scan"}`}
          style={lp ? undefined : { animation: "shimmer 18s linear infinite" }}
        >
          <span className="text-muted-foreground">
            04:21 <span className="text-danger">−₹9,999</span> → mule@ybl
          </span>
          <span className="text-muted-foreground">
            04:22 <span className="text-danger">−₹9,950</span> → mule@ybl
          </span>
          <span className="text-muted-foreground">
            04:24 <span className="text-danger">−₹9,800</span> → atm@okhdfc
          </span>
          <span className="text-muted-foreground">
            04:25 <span className="text-warning">flag</span> · velocity rule
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- CASE 04: Identity graph ---- */
function IdentityScene() {
  const lp = useLP();
  const flow = lp ? "" : "animate-data-flow";
  return (
    <div className="relative h-full w-full p-5 sm:p-6">
      <svg viewBox="0 0 600 360" className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="oklch(0.86 0.16 210 / 0.35)" strokeWidth="1.2" fill="none">
          <path d="M 300 180 L 120 90" className={flow} />
          <path d="M 300 180 L 130 280" className={flow} style={lp ? undefined : { animationDelay: "0.4s" }} />
          <path d="M 300 180 L 470 80" className={flow} style={lp ? undefined : { animationDelay: "0.8s" }} />
          <path d="M 300 180 L 490 290" className={flow} style={lp ? undefined : { animationDelay: "1.2s" }} />
        </g>
      </svg>


      {/* Center identity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-2xl glass-strong border border-primary/30 flex flex-col items-center justify-center glow-cyan">
        <Fingerprint className="h-6 w-6 text-primary" />
        <span className="mt-1 text-[9px] font-mono text-muted-foreground">SUBJECT</span>
      </div>

      <GraphNode
        className="absolute left-[14%] top-[18%]"
        icon={<Globe className="h-3.5 w-3.5 text-danger" />}
        label="Dark Forum Listing"
        sub="onion · 2024-11-08"
        tone="danger"
      />
      <GraphNode
        className="absolute left-[16%] bottom-[14%]"
        icon={<Hash className="h-3.5 w-3.5 text-warning" />}
        label="Credential Dump"
        sub="14,209 records"
        tone="warning"
      />
      <GraphNode
        className="absolute right-[12%] top-[14%]"
        icon={<MapPin className="h-3.5 w-3.5 text-primary" />}
        label="Anomalous Login"
        sub="IP · Lagos, NG"
      />
      <GraphNode
        className="absolute right-[10%] bottom-[18%]"
        icon={<Eye className="h-3.5 w-3.5 text-secondary" />}
        label="Account Takeover"
        sub="2FA bypass"
      />
    </div>
  );
}

/* ============================== SIDE PANELS ============================== */
function BriefingPanel({ c }: { c: CaseMeta }) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="text-[11px] font-mono uppercase tracking-widest text-primary flex items-center gap-2">
        <Search className="h-3 w-3" /> Briefing
      </div>
      <p className="mt-3 text-sm text-white/80 leading-relaxed">{c.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {BRIEFING_STATS[c.id].map((s) => (
          <div
            key={s.l}
            className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
          >
            <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
              {s.l}
            </div>
            <div className="mt-1 text-sm font-semibold text-white truncate">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KillChainPanel({ c }: { c: CaseMeta }) {
  const steps = KILL_CHAIN[c.id];
  return (
    <div className="rounded-2xl glass p-5">
      <div className="text-[11px] font-mono uppercase tracking-widest text-primary flex items-center gap-2">
        <ShieldAlert className="h-3 w-3" /> Kill Chain
      </div>
      <ol className="mt-3 space-y-2.5">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-3">
            <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary">
              {i + 1}
            </span>
            <span className="text-xs text-white/80 leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================== EVIDENCE ROW ============================== */
function EvidenceRow({ c }: { c: CaseMeta }) {
  const items = EVIDENCE[c.id];
  const lp = useLP();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <FileText className="h-3 w-3 text-primary" /> Key evidence artifacts
        </div>
        <div className="text-[10px] font-mono text-muted-foreground hidden sm:flex items-center gap-1">
          <Clock className="h-3 w-3" /> Updated · just now
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((e, i) => (
          <div
            key={e.label}
            className="group relative rounded-xl glass p-4 hover:border-primary/30 transition overflow-hidden"
            style={lp ? undefined : { animation: `fade-up 0.6s ease both`, animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,oklch(0.86_0.16_210/0.08),transparent_60%)]" />
            <div className="relative flex items-center justify-between">
              <div className="h-8 w-8 rounded-lg glass-strong flex items-center justify-center">
                <e.icon className="h-4 w-4 text-primary" />
              </div>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  e.weight === "high"
                    ? "bg-danger/15 text-danger"
                    : e.weight === "med"
                    ? "bg-warning/15 text-warning"
                    : "bg-primary/15 text-primary"
                }`}
              >
                {e.weight === "high" ? "STRONG" : e.weight === "med" ? "MED" : "INFO"}
              </span>
            </div>
            <div className="relative mt-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {e.label}
            </div>
            <div className="relative mt-1 text-sm font-semibold text-white font-mono truncate">
              {e.value}
            </div>
            <div className="relative mt-2 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              {e.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== HELPERS ============================== */
function Annotation({
  className = "",
  label,
  tone = "primary",
}: {
  className?: string;
  label: string;
  tone?: "primary" | "danger" | "warning";
}) {
  const toneCls =
    tone === "danger"
      ? "border-danger/40 text-danger"
      : tone === "warning"
      ? "border-warning/40 text-warning"
      : "border-primary/40 text-primary";
  const lp = useLP();
  return (
    <div
      className={`items-center gap-2 rounded-md glass-strong border px-2 py-1 text-[10px] font-mono ${toneCls} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${lp ? "" : "animate-blink"}`} />
      {label}
    </div>
  );
}

function Bubble({
  children,
  side,
  tone,
}: {
  children: ReactNode;
  side: "left" | "right";
  tone?: "danger";
}) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-[11px] leading-snug ${
          tone === "danger"
            ? "bg-danger/15 text-danger border border-danger/30"
            : side === "right"
            ? "bg-primary/20 text-white border border-primary/30"
            : "bg-white/5 text-white/80 border border-white/10"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FlowArrow({ className = "" }: { className?: string }) {
  const lp = useLP();
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`h-px w-6 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/60 ${lp ? "" : "animate-pulse-glow"}`} />
      <ArrowRight className="h-3 w-3 text-primary" />
    </div>
  );
}

function UPINode({
  className = "",
  icon,
  label,
  sub,
  tone = "primary",
}: {
  className?: string;
  icon: ReactNode;
  label: string;
  sub: string;
  tone?: "primary" | "danger";
}) {
  const lp = useLP();
  return (
    <div
      className={`flex items-center gap-2 rounded-xl glass-strong border ${
        tone === "danger" ? "border-danger/30" : "border-white/10"
      } px-3 py-2 ${className}`}
    >
      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">{icon}</div>
      <div className="leading-tight">
        <div className="text-[11px] font-semibold text-white">{label}</div>
        <div className="text-[9px] font-mono text-muted-foreground">{sub}</div>
      </div>
      {tone === "danger" && (
        <span className="relative ml-1 h-2 w-2 rounded-full bg-danger">
          {!lp && (
            <span className="absolute inset-0 inline-flex h-2 w-2 rounded-full bg-danger opacity-75 animate-ping" />
          )}
        </span>
      )}
    </div>
  );
}

function GraphNode({
  className = "",
  icon,
  label,
  sub,
  tone = "primary",
}: {
  className?: string;
  icon: ReactNode;
  label: string;
  sub: string;
  tone?: "primary" | "danger" | "warning";
}) {
  const ring =
    tone === "danger" ? "border-danger/30" : tone === "warning" ? "border-warning/30" : "border-white/10";
  return (
    <div className={`rounded-xl glass-strong border ${ring} px-3 py-2 max-w-[180px] ${className}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-semibold text-white truncate">{label}</span>
      </div>
      <div className="mt-0.5 text-[9px] font-mono text-muted-foreground truncate">{sub}</div>
    </div>
  );
}

/* ============================== DATA ============================== */
const ICONS: Record<CaseId, typeof Mail> = {
  "case-01": Mail,
  "case-02": Users,
  "case-03": CreditCard,
  "case-04": Fingerprint,
};

const BRIEFING_STATS: Record<CaseId, { l: string; v: string }[]> = {
  "case-01": [
    { l: "Duration", v: "~25 min" },
    { l: "Difficulty", v: "Intermediate" },
    { l: "Artifacts", v: "7" },
    { l: "Verdict", v: "Pending" },
  ],
  "case-02": [
    { l: "Duration", v: "~30 min" },
    { l: "Difficulty", v: "Beginner+" },
    { l: "Artifacts", v: "5" },
    { l: "Verdict", v: "Pending" },
  ],
  "case-03": [
    { l: "Duration", v: "~40 min" },
    { l: "Difficulty", v: "Advanced" },
    { l: "Artifacts", v: "9" },
    { l: "Verdict", v: "Pending" },
  ],
  "case-04": [
    { l: "Duration", v: "~35 min" },
    { l: "Difficulty", v: "Advanced" },
    { l: "Artifacts", v: "8" },
    { l: "Verdict", v: "Pending" },
  ],
};

const KILL_CHAIN: Record<CaseId, string[]> = {
  "case-01": [
    "Reconnaissance — vendor invoice template harvested",
    "Weaponization — lookalike domain & spoofed sender",
    "Delivery — email to finance distribution list",
    "Exploitation — credential capture on fake portal",
    "Action — fraudulent wire transfer attempt",
  ],
  "case-02": [
    "Lure — fake recruiter contact on social platform",
    "Trust building — polished offer letter & branded portal",
    "Demand — advance onboarding fee request",
    "Capture — banking & ID details exfiltrated",
    "Disappearance — domain rotated within 48h",
  ],
  "case-03": [
    "Pretext — SIM-swap social engineering on telco",
    "Access — OTP intercept + UPI re-enrolment",
    "Burst — micro-transactions to mule accounts",
    "Layering — fan-out across wallets & banks",
    "Cash-out — ATM withdrawal in different city",
  ],
  "case-04": [
    "Breach — third-party SaaS credential dump",
    "Exposure — credentials listed on dark forum",
    "Stuffing — automated logins from foreign IPs",
    "Takeover — 2FA bypass via recovery email",
    "Spread — lateral access to linked accounts",
  ],
};

type Evidence = {
  icon: typeof Mail;
  label: string;
  value: string;
  note: string;
  weight: "high" | "med" | "low";
};

const EVIDENCE: Record<CaseId, Evidence[]> = {
  "case-01": [
    {
      icon: Globe,
      label: "Lookalike Domain",
      value: "paypaI-secure.com",
      note: "Capital I substitutes lowercase L. Registered 6 days ago, privacy-protected WHOIS.",
      weight: "high",
    },
    {
      icon: Server,
      label: "SPF / DKIM",
      value: "FAIL · FAIL",
      note: "Both authentication checks failed. Sender IP not authorized for the claimed domain.",
      weight: "high",
    },
    {
      icon: Hash,
      label: "Attachment SHA-256",
      value: "a17f…be09",
      note: "Macro-enabled doc matches AsyncRAT loader family. 41/68 AV detections.",
      weight: "high",
    },
    {
      icon: Link2,
      label: "Reply-To Header",
      value: "noreply@mailer-stage.ru",
      note: "Reply-To diverges from From. Routing domain hosted on bulletproof infrastructure.",
      weight: "med",
    },
  ],
  "case-02": [
    {
      icon: Globe,
      label: "Portal Domain",
      value: "onboard-careers.top",
      note: ".top TLD, registered 3 days before first contact. No legitimate corporate footprint.",
      weight: "high",
    },
    {
      icon: FileText,
      label: "Offer Letter",
      value: "Offer-Letter_AcmeCorp.pdf",
      note: "Embedded fonts mismatch Acme brand kit. PDF metadata author: 'admin'.",
      weight: "med",
    },
    {
      icon: CreditCard,
      label: "Onboarding Fee",
      value: "$49 → wallet ****8821",
      note: "Wallet appears in 3 prior advance-fee fraud reports across two countries.",
      weight: "high",
    },
    {
      icon: Lock,
      label: "TLS Posture",
      value: "Self-signed cert",
      note: "Browser TLS warning suppressed via in-page banner. No HSTS, no CAA records.",
      weight: "med",
    },
  ],
  "case-03": [
    {
      icon: Smartphone,
      label: "SIM Swap Event",
      value: "+91 ****4310 · 04:18",
      note: "Telco port-out completed 3 minutes before first unauthorized UPI transaction.",
      weight: "high",
    },
    {
      icon: CreditCard,
      label: "Transaction Burst",
      value: "12 tx · 4 min · ₹1.18L",
      note: "All amounts under ₹10K to stay below velocity threshold. Classic structuring.",
      weight: "high",
    },
    {
      icon: Wifi,
      label: "Device Fingerprint",
      value: "Android 11 · root-detected",
      note: "Unrooted victim device suddenly reports root + emulator artifacts during burst.",
      weight: "med",
    },
    {
      icon: MapPin,
      label: "Cash-out Geo",
      value: "ATM · 1,420 km away",
      note: "Withdrawal physically impossible from victim's last known location 8 min earlier.",
      weight: "high",
    },
  ],
  "case-04": [
    {
      icon: Hash,
      label: "Credential Dump",
      value: "dump_q4_2024.tar.gz",
      note: "14,209 records including subject's primary email. SHA matches known SaaS breach.",
      weight: "high",
    },
    {
      icon: Globe,
      label: "Dark Forum Post",
      value: "BreachF · @vk0re_",
      note: "Listing offers 'pre-validated' credentials with 2FA recovery emails included.",
      weight: "high",
    },
    {
      icon: MapPin,
      label: "Anomalous Login",
      value: "203.0.***.41 · Lagos",
      note: "Successful login from unattributed ASN. No prior history for this geo or device.",
      weight: "med",
    },
    {
      icon: CheckCircle2,
      label: "2FA Recovery Used",
      value: "Backup email rotated",
      note: "Recovery email changed within 90 seconds of login. Classic account-takeover signature.",
      weight: "high",
    },
  ],
};
