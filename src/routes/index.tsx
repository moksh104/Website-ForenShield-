import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  Shield,
  ShieldCheck,
  Radar,
  Fingerprint,
  Mail,
  Globe,
  Bug,
  FileText,
  FileSearch,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Search,
  BarChart3,
  Bell,
  FolderOpen,
  Sliders,
  Play,
  GraduationCap,
  Wifi,
  AlertTriangle,
  Rocket,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Trophy,
  X,
  Download,
  Smartphone,
  Eye,
  Target,
  Lock,
  Layers,
  CheckCircle2,
  Star,
  User,
  ChevronDown,
  ChevronUp,
  QrCode,
  ShoppingCart,
  Award,
  Flame,
  Terminal,
} from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import {
  IllusHacker,
  IllusNetwork,
  IllusDashboard,
  IllusPlay,
  IllusReports,
} from "@/components/landing/illustrations";
import logo from "@/assets/logo.png";
import {
  MissionControlScreen,
  CaseDetailsScreen,
  EvidenceBoardScreen,
  TimelineScreen,
  AcademyScreen,
  ReportsScreen,
  ProfileScreen,
} from "@/components/app-mockups";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ForenShield — Learn. Investigate. Defend." },
      {
        name: "description",
        content:
          "Interactive cybersecurity training and digital investigation platform. Solve real-world cyber incidents through hands-on forensics, simulations, and evidence analysis.",
      },
      { property: "og:title", content: "ForenShield — Learn. Investigate. Defend." },
      {
        property: "og:description",
        content:
          "Train like a defender. Think like an investigator. Master cybersecurity through immersive, hands-on cases.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased relative overflow-x-clip">
      <CursorGlow />
      <AmbientBackdrop />
      <Nav />
      <main>
        <Hero />
        <StatsRow />
        <HowItWorks />
        <PlatformModules />
        <CyberAcademySection />
        <SimulationLabSection />
        <DeviceShowcase />
        <WorkflowStory />
        <MissionControlSection />
        <SpotlightRow />
        <TrustCredibility />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* =============================================================
   AMBIENT + CURSOR
   ============================================================= */
function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let scale = 1, targetScale = 1;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onDown = () => {
      targetScale = 0.85;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onUp = () => {
      targetScale = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      scale += (targetScale - scale) * 0.2;
      el.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0) scale(${scale})`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 || Math.abs(targetScale - scale) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[400px] w-[400px] rounded-full opacity-40 mix-blend-screen hidden md:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.55 0.22 260 / 0.35) 0%, transparent 60%)",
      }}
    />
  );
}

function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.22 260 / 0.20), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 40%, oklch(0.55 0.22 260 / 0.12), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      {/* Wireframe terrain bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[40vh] opacity-20"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="terrain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
            <stop offset="1" stopColor="oklch(0.55 0.22 260)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => {
          const y = 60 + i * 24;
          const amp = 6 + i * 2;
          const path = Array.from({ length: 40 }).map((_, j) => {
            const x = (j / 39) * 1440;
            const dy = Math.sin(j * 0.6 + i * 0.9) * amp + Math.cos(j * 0.3) * amp * 0.5;
            return `${j === 0 ? "M" : "L"}${x},${y + dy}`;
          }).join(" ");
          return (
            <path
              key={i}
              d={path}
              fill="none"
              stroke="url(#terrain)"
              strokeWidth="0.6"
              opacity={0.3 + i * 0.05}
            />
          );
        })}
      </svg>
      {/* Floating particles */}
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/60 animate-float"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            animationDuration: `${6 + (i % 6)}s`,
            animationDelay: `${(i % 5) * 0.5}s`,
            boxShadow: "0 0 8px currentColor",
          }}
        />
      ))}
    </div>
  );
}

/* =============================================================
   NAV
   ============================================================= */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll-spy: highlight active nav item based on visible section
  useEffect(() => {
    const sectionIds = ["features", "platform", "download", "about"];
    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, boolean>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleMap.set(id, entry.isIntersecting);
          // Pick the first visible section in DOM order
          for (const sid of sectionIds) {
            if (visibleMap.get(sid)) {
              setActiveSection(sid);
              return;
            }
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Platform", href: "#platform" },
    { label: "Download", href: "#download" },
    { label: "About", href: "#about" },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // account for fixed nav
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div
          className={`flex items-center justify-between gap-6 rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "border border-white/10 shadow-elevated"
              : "border border-transparent"
          }`}
          style={
            scrolled
              ? {
                  background: "rgba(11,18,32,0.85)",
                  backdropFilter: "blur(18px) saturate(140%)",
                  WebkitBackdropFilter: "blur(18px) saturate(140%)",
                  borderColor: "rgba(255,255,255,0.08)",
                }
              : undefined
          }
        >
          <a href="#top" className="flex items-center gap-[14px] group">
            <Logo />
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span className="font-display font-bold tracking-tight text-white text-[17px] leading-none">
                ForenShield
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {navLinks.map((l) => {
              const isActive = `#${activeSection}` === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`relative px-4 py-2 transition-all duration-300 hover:text-glow-cyan active:scale-95 ${
                    isActive ? "text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px bg-primary transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex flex-col items-center justify-center h-9 w-9 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-4 bg-white rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block h-0.5 w-4 bg-white rounded mt-1 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[2px]" : ""}`} />
            </button>
            <MagneticButton href="#download" onClick={(e: MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "#download")}>
              Get ForenShield
              <ArrowRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ${
            mobileOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <nav className="flex flex-col gap-1 rounded-2xl backdrop-blur-xl bg-background/80 border border-white/[0.06] p-3">
            {navLinks.map((l) => {
              const isActive = `#${activeSection}` === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`px-4 py-2.5 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "text-white bg-white/[0.06]"
                      : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative flex items-center justify-center h-[34px] w-[34px] sm:h-[38px] sm:w-[38px] lg:h-[42px] lg:w-[42px] group">
      <img
        src={logo}
        alt="ForenShield Logo"
        width={84}
        height={84}
        className="relative z-10 h-full w-full object-contain transition-[transform,filter] duration-[250ms] ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_oklch(0.55_0.22_260/0.55)]"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}

function MagneticButton({
  to,
  href,
  children,
  className = "",
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionProperty = "translate";
    el.style.transitionDuration = "0s";
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.translate = `${x * 0.25}px ${y * 0.35}px`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionProperty = "translate";
    el.style.transitionDuration = "0.4s";
    el.style.transitionTimingFunction = "cubic-bezier(0.16,1,0.3,1)";
    el.style.translate = "0px 0px";
  };
  const sharedClass = `relative inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-primary active:scale-95 transition-all duration-300 will-change-transform hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)] ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  // If href is provided, render a plain <a> (for anchor links)
  if (href) {
    return (
      <a
        href={href}
        ref={ref}
        onClick={onClick}
        onMouseMove={onMove as any}
        onMouseLeave={onLeave}
        className={sharedClass}
      >
        {inner}
      </a>
    );
  }

  // Otherwise render a router Link
  return (
    <Link
      to={to || "/"}
      ref={ref as any}
      onClick={onClick as any}
      onMouseMove={onMove as any}
      onMouseLeave={onLeave}
      className={sharedClass}
    >
      {inner}
    </Link>
  );
}

/* =============================================================
   HERO
   ============================================================= */
function Hero() {
  return (
    <section id="top" className="relative pt-36 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mt-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                <span className="tracking-[0.24em] uppercase text-success">
                  Interactive Investigation Demo
                </span>
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 
                className="mt-8 flex flex-col items-start font-display font-bold text-white"
                style={{
                  fontSize: "clamp(2.75rem, 8vw, 4.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.05em",
                  maxWidth: "620px",
                }}
              >
                <span className="whitespace-nowrap"><LetterStagger>Learn.</LetterStagger></span>
                <span className="whitespace-nowrap"><LetterStagger delay={180}>Investigate.</LetterStagger></span>
                <span className="text-primary text-glow-cyan whitespace-nowrap flex items-baseline">
                  <LetterStagger delay={480}>Defend.</LetterStagger>
                  <span className="inline-block w-[4px] h-[0.68em] bg-primary ml-2 animate-blink rounded-sm self-baseline" style={{ transform: "translateY(0.02em)" }} />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-10 max-w-[42ch] text-[16px] md:text-[18px] lg:text-[19px] text-white/[0.72] leading-[1.6]">
                Learn cyber defense through interactive lessons, practice with live attack simulations, and investigate real digital forensics cases.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton href="#download" className="!px-7 !py-4 !h-[54px] !text-[16px] flex items-center gap-2">
                  Get ForenShield
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <a
                  href="#platform"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 h-[54px] text-[16px] font-semibold text-white glass hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/50">
                    <Play className="h-3.5 w-3.5 text-primary ml-0.5" />
                    <span className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-ring" />
                  </span>
                  View Platform
                </a>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[
                    "from-primary to-secondary",
                    "from-success to-primary",
                    "from-warning to-danger",
                    "from-secondary to-primary",
                  ].map((g, i) => (
                    <span
                      key={i}
                      className={`h-9 w-9 rounded-full ring-2 ring-background bg-gradient-to-br ${g} flex items-center justify-center text-[10px] font-bold text-white`}
                    >
                      {"AZKM"[i]}
                    </span>
                  ))}
                </div>
                <div className="text-[15px] text-white/80">
                  <span className="text-white font-bold tracking-wide">10K+ learners</span>{" "}
                  are already solving cases{" "}
                  <span className="text-success font-semibold ml-1">↗</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <MissionControl />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function LetterStagger({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) {
  return (
    <>
      {children.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block opacity-0"
          style={{
            animation: `fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards`,
            animationDelay: `${delay + i * 24}ms`,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </>
  );
}

/* =============================================================
   MISSION CONTROL (live interactive)
   ============================================================= */
function MissionControl() {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [startAnim, setStartAnim] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mql && mql.matches) {
      setStartAnim(true);
      setProgress(67);
      setFiles(12);
      setTimelineVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStartAnim(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!startAnim) return;
    const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mql && mql.matches) return;
    
    // Slight delay after hero text reveal (hero text delays are up to ~500ms)
    const timeout = setTimeout(() => {
      const start = performance.now();
      const dur = 800;
      const tick = (t: number) => {
        let p = (t - start) / dur;
        if (p > 1) p = 1;
        // ease-out cubic
        const ease = 1 - Math.pow(1 - p, 3);
        setProgress(Math.round(67 * ease));
        setFiles(Math.round(12 * ease));
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          // Trigger timeline bar
          setTimelineVisible(true);
        }
      };
      requestAnimationFrame(tick);
    }, 500);

    return () => clearTimeout(timeout);
  }, [startAnim]);

  const evidence = [
    { icon: Mail, label: "Email Header", count: "3 files", ok: true, tone: "primary" as const },
    { icon: Globe, label: "IP Address Logs", count: "2 files", ok: true, tone: "primary" as const },
    { icon: Bug, label: "Malware Sample", count: "1 file", ok: false, tone: "danger" as const },
    { icon: FileText, label: "Browser History", count: "4 files", ok: true, tone: "primary" as const },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* Frame */}
      <div className="relative rounded-[26px] p-[1px] bg-gradient-to-br from-primary/40 via-white/5 to-primary/20 shadow-elevated">
        <div className="relative rounded-[25px] overflow-hidden bg-[oklch(0.16_0.03_260)]/95 backdrop-blur-xl">
          {/* HUD Corners */}
          <Corners />
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.22em]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/20 text-primary">
                <Radar className="h-3 w-3" />
              </span>
              <span className="text-white">INVESTIGATION LAB PREVIEW</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 border border-success/30 px-2 py-0.5 text-success text-[9px]">
                <span className="h-1 w-1 rounded-full bg-success animate-blink" />
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="text-muted-foreground">CASE</span>
              <span className="text-white">#0421</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-danger/40 bg-danger/10 px-1.5 py-0.5 text-danger text-[9px]">
                <AlertTriangle className="h-2.5 w-2.5" />
                CRITICAL
              </span>
            </div>
          </div>

          {/* Body grid */}
          <div className="grid grid-cols-12 gap-3 p-4">
            {/* Evidence column */}
            <div className="col-span-5 space-y-2.5">
              <div className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground">
                EVIDENCE COLLECTED
              </div>
              {evidence.map((e, i) => {
                const Icon = e.icon;
                return (
                  <div
                    key={i}
                    className="group relative rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all px-2.5 py-2 flex items-center gap-2.5"
                    style={{
                      opacity: startAnim ? 1 : 0,
                      transform: startAnim ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      transitionDelay: `${600 + i * 60}ms`,
                    }}
                  >
                    <span
                      className={`h-8 w-8 shrink-0 rounded-md flex items-center justify-center border ${
                        e.tone === "danger"
                          ? "bg-danger/10 border-danger/30 text-danger"
                          : "bg-primary/10 border-primary/30 text-primary"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] text-white font-medium truncate">
                        {e.label}
                      </div>
                      <div className="text-[9px] text-muted-foreground font-mono">
                        {e.count}
                      </div>
                    </div>
                    {e.ok ? (
                      <span className="h-4 w-4 rounded-full bg-success/20 border border-success/40 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      </span>
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-danger animate-pulse-glow" />
                    )}
                  </div>
                );
              })}
              <button className="w-full rounded-lg border border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/[0.04] transition text-[10px] font-mono tracking-[0.2em] text-muted-foreground hover:text-primary py-2">
                EVIDENCE PREVIEW
              </button>
            </div>

            {/* Radar */}
            <div className="col-span-4 flex flex-col">
              <div className="relative flex-1 rounded-xl border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center min-h-[220px]">
                <RadarScope />
              </div>
            </div>

            {/* Status column */}
            <div className="col-span-3 space-y-2">
              <StatusTile label="CASE STATUS" value="Active" tone="success" />
              <StatusTile
                label="THREAT LEVEL"
                value={
                  <div className="flex items-end gap-0.5 h-4">
                    {[3, 5, 4, 7, 6, 9, 8, 10, 7].map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] bg-danger rounded-sm"
                        style={{
                          height: `${h * 8}%`,
                          animation: `pulse-glow 1.4s ease-in-out ${i * 0.1}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                }
                tone="danger"
              />
              <StatusTile label="EVIDENCE" value={<span className="text-white font-bold text-lg">{files} <span className="text-[10px] text-muted-foreground font-normal">Files</span></span>} />
              <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2">
                <div className="font-mono text-[8px] tracking-[0.22em] text-muted-foreground">
                  PROGRESS
                </div>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-white text-lg font-bold">{progress}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-100"
                    style={{
                      width: `${progress}%`,
                      boxShadow: "0 0 12px oklch(0.55 0.22 260 / 0.8)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 pb-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.22em] text-muted-foreground">
                <span>TIMELINE PREVIEW</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>11:22</span>
                  <span className="text-white">13:00</span>
                </div>
              </div>
              <div className="relative mt-2.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full origin-left transition-transform duration-[800ms] ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.22 260) 0%, oklch(0.80 0.17 75) 55%, oklch(0.65 0.24 25) 100%)",
                    transform: timelineVisible ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white border-2 border-primary shadow-[0_0_16px_oklch(0.55_0.22_260/0.9)] transition-opacity duration-300"
                  style={{ 
                    left: `calc(100% - 7px)`,
                    opacity: timelineVisible ? 1 : 0,
                    transitionDelay: timelineVisible ? "800ms" : "0ms"
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                <span className="text-primary">● PHISH DELIVERED</span>
                <span className="text-warning">● PAYLOAD EXECUTED</span>
                <span className="text-danger">● DATA EXFILTRATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating orbits behind */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] opacity-40 blur-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse-glow" />
    </div>
  );
}

function Corners() {
  const corner = "absolute h-4 w-4 border-primary/70";
  return (
    <>
      <span className={`${corner} border-l border-t top-2 left-2`} />
      <span className={`${corner} border-r border-t top-2 right-2`} />
      <span className={`${corner} border-l border-b bottom-2 left-2`} />
      <span className={`${corner} border-r border-b bottom-2 right-2`} />
    </>
  );
}

function StatusTile({
  label,
  value,
  tone = "primary",
}: {
  label: string;
  value: ReactNode;
  tone?: "primary" | "success" | "danger";
}) {
  const dot =
    tone === "success"
      ? "bg-success"
      : tone === "danger"
      ? "bg-danger"
      : "bg-primary";
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2">
      <div className="font-mono text-[8px] tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[13px] text-white font-medium">
        {tone !== "primary" && (
          <span className={`h-1.5 w-1.5 rounded-full ${dot} animate-blink`} />
        )}
        {value}
      </div>
    </div>
  );
}

function RadarScope() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="rad-sweep" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
          <stop offset="70%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rad-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#rad-bg)" />
      {[80, 60, 40, 20].map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="oklch(0.55 0.22 260)"
          strokeOpacity="0.18"
          strokeDasharray="2 4"
        />
      ))}
      <line x1="10" y1="100" x2="190" y2="100" stroke="oklch(0.55 0.22 260 / 0.18)" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="oklch(0.55 0.22 260 / 0.18)" />
      {/* Sweep */}
      <g className="animate-radar" style={{ transformOrigin: "100px 100px" }}>
        <path d="M100 100 L100 10 A90 90 0 0 1 190 100 Z" fill="url(#rad-sweep)" />
        <line x1="100" y1="100" x2="100" y2="10" stroke="oklch(0.55 0.22 260)" strokeWidth="1.2" strokeOpacity="0.9" />
      </g>
      {/* Center fingerprint */}
      <g transform="translate(85 85)">
        <circle cx="15" cy="15" r="14" fill="oklch(0.55 0.22 260 / 0.15)" stroke="oklch(0.55 0.22 260)" strokeOpacity="0.5" />
        <Fingerprint x="4" y="4" width="22" height="22" color="oklch(0.55 0.22 260)" />
      </g>
      {/* Contact blips */}
      {[
        { cx: 60, cy: 50, tone: "primary" },
        { cx: 148, cy: 68, tone: "primary" },
        { cx: 155, cy: 140, tone: "danger" },
        { cx: 74, cy: 154, tone: "warning" },
        { cx: 135, cy: 108, tone: "primary" },
      ].map((b, i) => (
        <g key={i}>
          <circle
            cx={b.cx}
            cy={b.cy}
            r="8"
            fill="none"
            stroke={
              b.tone === "danger"
                ? "oklch(0.65 0.24 25)"
                : b.tone === "warning"
                ? "oklch(0.80 0.17 75)"
                : "oklch(0.55 0.22 260)"
            }
            strokeOpacity="0.6"
            className="animate-ping-soft"
            style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${b.cx}px ${b.cy}px` }}
          />
          <circle
            cx={b.cx}
            cy={b.cy}
            r="2.4"
            fill={
              b.tone === "danger"
                ? "oklch(0.65 0.24 25)"
                : b.tone === "warning"
                ? "oklch(0.80 0.17 75)"
                : "oklch(0.55 0.22 260)"
            }
          />
        </g>
      ))}
    </svg>
  );
}

/* =============================================================
   STATS ROW
   ============================================================= */
function StatsRow() {
  const stats = [
    { icon: BookOpen, value: "10,000", suffix: "+", label: "Lessons Completed", tone: "primary" },
    { icon: Search, value: "500", suffix: "+", label: "Practice Investigations", tone: "success" },
    { icon: FlaskConical, value: "100", suffix: "+", label: "Interactive Labs", tone: "warning" },
    { icon: BarChart3, value: "95", suffix: "%", label: "Completion Satisfaction", tone: "secondary" },
  ] as const;
  return (
    <section className="relative px-4 sm:px-8 pb-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <StatCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  tone,
}: {
  icon: any;
  value: string;
  suffix: string;
  label: string;
  tone: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseInt(value.replace(/,/g, ""), 10);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const n = Math.round(target * eased);
          setDisplay(n.toLocaleString());
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  const toneCls: Record<string, string> = {
    primary: "text-primary group-hover:border-primary/50",
    success: "text-success group-hover:border-success/50",
    warning: "text-warning group-hover:border-warning/50",
    secondary: "text-secondary group-hover:border-secondary/50",
  };

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${toneCls[tone]} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-[250ms] ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.1)] will-change-transform p-6 sm:p-8 cursor-default`}
    >
      <div className="flex items-start justify-between">
        <span className={`h-10 w-10 rounded-xl bg-current/10 border border-current/20 flex items-center justify-center ${toneCls[tone].split(" ")[0]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <MiniSpark tone={tone} />
      </div>
      <div className="mt-4">
        <div className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
          {display}
          <span className={toneCls[tone].split(" ")[0]}>{suffix}</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
      <span className="pointer-events-none absolute -inset-x-8 -top-16 h-32 opacity-0 group-hover:opacity-100 blur-2xl bg-current/20 transition-opacity duration-500 will-change-opacity" />
    </div>
  );
}

function MiniSpark({ tone }: { tone: string }) {
  const color =
    tone === "success"
      ? "oklch(0.78 0.18 155)"
      : tone === "warning"
      ? "oklch(0.80 0.17 75)"
      : tone === "secondary"
      ? "oklch(0.82 0.14 210)"
      : "oklch(0.55 0.22 260)";
  return (
    <svg viewBox="0 0 60 24" className="h-6 w-16 opacity-80">
      <path
        d="M0 18 L10 12 L18 16 L26 8 L34 14 L42 6 L50 10 L60 2"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =============================================================
   HOW IT WORKS
   ============================================================= */
function HowItWorks() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mql && mql.matches) {
      setTick(999);
      return;
    }

    const timer = setInterval(() => {
      setTick((t) => {
        if (t >= 52) return -4; // Reset and wait 4 ticks (400ms) for fadeout before restarting
        return t + 1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: GraduationCap, title: "Learn Concepts", desc: "Master cyber defense in Academy" },
    { icon: Play, title: "Practice Live", desc: "Face real-world simulations" },
    { icon: Search, title: "Investigate Cases", desc: "Analyze digital forensics evidence" },
    { icon: FileText, title: "Generate Reports", desc: "File verdicts and export findings" },
    { icon: Trophy, title: "Earn Rank & XP", desc: "Level up your mission control" },
  ];
  return (
    <section id="features" className="relative px-4 sm:px-8 py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
          <Reveal>
            <h2 className="relative font-display font-bold tracking-tight text-white text-2xl sm:text-3xl text-center">
              HOW <span className="text-primary">FORENSHIELD</span> WORKS
            </h2>
          </Reveal>

          <div className="relative mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const nodeActivateTick = i === 0 ? 0 : (i - 1) * 8 + 6;
              const isNodeActive = tick >= nodeActivateTick || tick === 999;
              const isLineFilling = tick >= i * 8 || tick === 999;

              return (
                <Reveal key={i} delay={i * 120}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* CONNECTOR LINE (HIDDEN ON MOBILE) */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-9 left-[50%] w-full h-[2px] bg-primary/20 z-0">
                        <div 
                          className="h-full w-full bg-primary origin-left transition-transform duration-[600ms] ease-in-out"
                          style={{ transform: isLineFilling ? 'scaleX(1)' : 'scaleX(0)' }}
                        />
                      </div>
                    )}
                    
                    {/* NODE */}
                    <div className="relative h-18 w-18 z-10 flex items-center justify-center">
                      {isNodeActive && tick < nodeActivateTick + 15 && tick !== 999 && (
                        <span className="absolute inset-0 rounded-full border border-primary animate-radar-ring pointer-events-none" />
                      )}
                      <div 
                        className={`absolute inset-0 rounded-full border transition-all duration-400 ${
                          isNodeActive 
                            ? `border-primary bg-primary/10 ${tick !== 999 ? 'animate-node-pulse' : ''}`
                            : 'border-white/10 bg-white/[0.02]'
                        }`}
                        style={isNodeActive && tick === 999 ? { boxShadow: '0 0 4px var(--primary)' } : undefined}
                      />
                      <div className="relative z-10 h-full w-full rounded-full flex items-center justify-center overflow-hidden">
                        <Icon className={`h-7 w-7 transition-opacity duration-400 ${isNodeActive ? 'text-primary opacity-100' : 'text-primary opacity-30'}`} />
                      </div>
                    </div>
                    
                    {/* BADGE AND TEXT */}
                    <div className="mt-6 flex items-center justify-center gap-2 relative z-10">
                      <span className={`h-5 w-5 rounded-full transition-all duration-400 flex items-center justify-center font-mono text-[10px] font-bold ${
                        isNodeActive ? 'bg-primary/20 text-primary scale-100 opacity-100' : 'bg-white/5 text-white/40 scale-95 opacity-50'
                      }`}>
                        0{i + 1}
                      </span>
                      <span className={`text-base font-semibold transition-colors duration-400 ${isNodeActive ? 'text-white' : 'text-white/50'}`}>
                        {s.title}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground max-w-[12rem] mx-auto relative z-10">
                      {s.desc}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   PLATFORM MODULES (carousel)
   ============================================================= */
const MODULE_DETAILS: Record<string, { overview: string; features: string[]; skills: string[] }> = {
  "Cyber Academy": {
    overview: "Master the fundamentals of cyber defense through interactive, scenario-based learning modules. Build your foundational knowledge before facing live attacks.",
    features: [
      "Interactive learning modules",
      "Scenario-based knowledge checks",
      "Networking & Web Security basics",
      "Command-line fundamentals",
      "Progress tracking and certification",
    ],
    skills: ["Networking Basics", "Web Security", "Linux Essentials", "Cryptography"],
  },
  "Simulation Lab": {
    overview: "Face real-world attack scenarios in a gamified environment. Make critical decisions under pressure, execute commands in a live console, and earn XP based on your response effectiveness.",
    features: [
      "Live attack simulations",
      "Decision-based gameplay with consequences",
      "Real-time terminal console",
      "Objective tracking and scoring",
      "XP rewards and leaderboard",
    ],
    skills: ["Incident Response", "Decision Making", "Command Line", "Threat Containment"],
  },
  "Investigation Lab": {
    overview: "A professional-grade digital forensics workspace. Analyze disk images, memory dumps, network captures, and email artifacts with hex inspection, hash verification, and chain of custody tracking.",
    features: [
      "Hex editor with pattern highlighting",
      "SHA-256 hash verification",
      "Chain of custody tracking",
      "Artifact correlation engine",
      "Evidence board with drag-and-drop",
    ],
    skills: ["Digital Forensics", "Evidence Analysis", "Hash Verification", "Incident Response"],
  },
  "Timeline View": {
    overview: "Reconstruct the full attack narrative with an interactive timeline. Filter by event type, zoom into specific time ranges, and correlate network, endpoint, and authentication events.",
    features: [
      "Multi-layer event correlation",
      "Time-range selection and zoom",
      "Filter by Network, Endpoint, Auth, Files",
      "Visual attack progression",
      "Event detail inspection",
    ],
    skills: ["Attack Reconstruction", "Log Analysis", "Event Correlation", "Threat Hunting"],
  },
  "Mission Control": {
    overview: "Track your career progression as a cyber defender. View your rank, manage your current streak, and show off the badges you've earned across all academy lessons and investigations.",
    features: [
      "Global leaderboard rankings",
      "XP and level progression",
      "Daily activity streaks",
      "Achievement badge showcase",
      "Performance analytics",
    ],
    skills: ["Continuous Learning", "Threat Intelligence", "Leadership", "Team Defense"],
  },
};

function PlatformModules() {
  const [previewModule, setPreviewModule] = useState<string | null>(null);

  const modules = [
    {
      title: "Cyber Academy",
      desc: "Learn cyber defense fundamentals",
      icon: GraduationCap,
      art: <IllusNetwork />,
    },
    {
      title: "Simulation Lab",
      desc: "Practice with live attack scenarios",
      icon: Play,
      art: <IllusPlay />,
    },
    {
      title: "Investigation Lab",
      desc: "Analyze evidence in a professional lab",
      icon: FlaskConical,
      art: <IllusHacker />,
    },
    {
      title: "Timeline View",
      desc: "Reconstruct every step of the attack",
      icon: Clock,
      art: <IllusDashboard />,
    },
    {
      title: "Mission Control",
      desc: "Track XP, Rank, and Achievements",
      icon: Trophy,
      art: <IllusReports />,
    },
  ];

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);
  const scroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Keyboard nav
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":hover") && document.activeElement !== el) return;
      if (e.key === "ArrowRight") { e.preventDefault(); scroll(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); scroll(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-advance, pauses on hover
  useEffect(() => {
    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el || hoverRef.current) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.5, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Mouse-drag
  const dragState = useRef<{ x: number; scroll: number; active: boolean }>({ x: 0, scroll: 0, active: false });
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { x: e.clientX, scroll: el.scrollLeft, active: true };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };
  const onMoveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    const el = scrollerRef.current;
    if (!s.active || !el) return;
    el.scrollLeft = s.scroll - (e.clientX - s.x);
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current.active = false;
    const el = scrollerRef.current;
    if (el) el.style.cursor = "";
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <section id="platform" className="relative px-4 sm:px-8 py-8 sm:py-12 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="tracking-[0.24em] uppercase text-primary">
                Platform Capabilities
              </span>
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-bold tracking-tight text-white text-2xl sm:text-3xl text-center">
              Explore <span className="text-primary">ForenShield</span> Platform
            </h2>
          </Reveal>
        </div>

        <div
          className="relative mt-8"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full glass-strong hover:bg-primary/20 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-[150ms] flex items-center justify-center text-white active:scale-90"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full glass-strong hover:bg-primary/20 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-[150ms] flex items-center justify-center text-white active:scale-90"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            ref={scrollerRef}
            tabIndex={0}
            onPointerDown={onDown}
            onPointerMove={onMoveDrag}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide cursor-grab select-none outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl"
            style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
          >
            {modules.map((m, i) => (
              <Reveal key={i} delay={i * 100} className="snap-start shrink-0 flex">
                <ModuleCard {...m} onPreview={() => setPreviewModule(m.title)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <ModulePreviewModal
        open={previewModule !== null}
        onOpenChange={(v) => { if (!v) setPreviewModule(null); }}
        title={previewModule || ""}
        icon={modules.find((m) => m.title === previewModule)?.icon || FlaskConical}
        desc={modules.find((m) => m.title === previewModule)?.desc || ""}
        art={modules.find((m) => m.title === previewModule)?.art}
        details={MODULE_DETAILS[previewModule || ""] || { overview: "", features: [], skills: [] }}
      />
    </section>
  );
}

function ModuleCard({
  title,
  desc,
  icon: Icon,
  art,
  onPreview,
}: {
  title: string;
  desc: string;
  icon: any;
  art: ReactNode;
  onPreview: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${-y * 3}deg`);
    el.style.setProperty("--ry", `${x * 4}deg`);
    el.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div
      ref={ref}
      onClick={onPreview}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative snap-start shrink-0 w-[340px] sm:w-[400px] rounded-[20px] overflow-hidden border border-primary/15 bg-white/[0.02] shadow-[inset_0_1px_0_oklch(1_0_0/0.04)] cursor-pointer transition-all duration-[250ms] ease-out will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.3),inset_0_1px_0_oklch(1_0_0/0.06)]"
      style={{
        transform:
          "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      }}
    >

      {/* Cursor glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(300px circle at var(--glow-x,50%) var(--glow-y,50%), oklch(0.55 0.22 260 / 0.18), transparent 60%)",
        }}
      />
      {/* Art */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.03_260)] via-[oklch(0.18_0.04_260)] to-[oklch(0.12_0.03_260)] border-b border-white/5">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">{art}</div>
        <span className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="p-4">
        <div className="text-white font-display font-semibold text-lg">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      </div>
      {/* Animated border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(120deg, transparent, oklch(0.55 0.22 260 / 0.5), transparent) border-box",
          WebkitMask:
            "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
    </div>
  );
}

/* =============================================================
   MODULE PREVIEW MODAL — Feature preview for platform cards
   ============================================================= */
function ModulePreviewModal({
  open,
  onOpenChange,
  title,
  icon: Icon,
  desc,
  art,
  details,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  icon: any;
  desc: string;
  art?: ReactNode;
  details: { overview: string; features: string[]; skills: string[] };
}) {
  if (!open) return null;

  const handleDownload = (e: MouseEvent<HTMLAnchorElement>) => {
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
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
        style={{ animation: "fade-up 0.3s ease" }}
      />
      <div
        className="relative w-[min(96vw,640px)] max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 shadow-elevated"
        style={{
          background: "rgba(11,18,32,0.95)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto max-h-[92vh]">
          {/* Art preview */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.03_260)] via-[oklch(0.18_0.04_260)] to-[oklch(0.12_0.03_260)] border-b border-white/5">
            {art && <div className="absolute inset-0">{art}</div>}
            <span className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Icon className="h-5 w-5" />
            </span>
          </div>

          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-white/5">
            <h3 className="font-display font-bold text-white text-2xl tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            {/* Overview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <Layers className="h-3.5 w-3.5 text-primary" /> Module Overview
              </div>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">{details.overview}</p>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <Target className="h-3.5 w-3.5 text-primary" /> Key Features
              </div>
              <ul className="mt-2 space-y-1.5">
                {details.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-primary mt-0.5 shrink-0">→</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <GraduationCap className="h-3.5 w-3.5 text-primary" /> Skills You'll Learn
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {details.skills.map((s, i) => (
                  <span key={i} className="rounded-md bg-primary/10 border border-primary/25 px-2.5 py-1 text-[11px] font-medium text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6 pt-2 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              Access {title} and all platform modules in the ForenShield app.
            </p>
            <a
              href="#download"
              onClick={handleDownload}
              className="relative mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <span className="relative inline-flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                Get ForenShield
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   REALISTIC PRODUCT MOCKUPS — original app screens
   ============================================================= */

/* Shared window chrome for every mockup */
function MockChrome({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-2 rounded-lg overflow-hidden border border-white/10 bg-[oklch(0.12_0.025_260)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] flex flex-col">
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[oklch(0.16_0.03_260)] border-b border-white/5">
        <span className="h-2 w-2 rounded-full bg-[#EF4444]/70" />
        <span className="h-2 w-2 rounded-full bg-[#F59E0B]/70" />
        <span className="h-2 w-2 rounded-full bg-[#22C55E]/70" />
        <div className="ml-2 flex-1 truncate text-[9px] font-mono text-muted-foreground">
          {title}
        </div>
        {meta && (
          <span className="text-[8px] font-mono text-primary/80 uppercase tracking-wider">
            {meta}
          </span>
        )}
      </div>
      <div className="relative flex-1 min-h-0">{children}</div>
    </div>
  );
}

/* Investigation Lab — evidence board + inspector + chain of custody */
function ArtLab() {
  return (
    <MockChrome title="forenshield://lab/case-2047" meta="● LIVE">
      <div className="absolute inset-0 grid grid-cols-[38%_1fr_28%] text-[8px]">
        {/* Evidence board */}
        <div className="border-r border-white/5 p-1.5 space-y-1 overflow-hidden">
          <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest">Evidence</div>
          {[
            { n: "E-001", t: "disk.img", s: "2.4G", tone: "primary" },
            { n: "E-002", t: "memory.raw", s: "512M", tone: "secondary" },
            { n: "E-003", t: "traffic.pcap", s: "88M", tone: "warning" },
            { n: "E-004", t: "phish.eml", s: "12K", tone: "danger" },
          ].map((e, i) => (
            <div
              key={i}
              className={`rounded border px-1.5 py-1 flex items-center gap-1.5 ${
                i === 1
                  ? "border-primary/50 bg-primary/10"
                  : "border-white/8 bg-white/[0.02]"
              }`}
            >
              <span className="font-mono text-[7px] text-primary/80">{e.n}</span>
              <span className="text-white/90 truncate flex-1 text-[8px]">{e.t}</span>
              <span className="text-muted-foreground font-mono text-[7px]">{e.s}</span>
            </div>
          ))}
        </div>
        {/* Inspector */}
        <div className="p-1.5 flex flex-col gap-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest">Inspector · memory.raw</div>
            <div className="flex gap-0.5">
              {["HEX", "STR", "META"].map((t, i) => (
                <span
                  key={t}
                  className={`px-1 py-[1px] rounded text-[7px] font-mono ${
                    i === 0 ? "bg-primary/25 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded bg-[oklch(0.08_0.02_260)] border border-white/5 p-1 font-mono text-[7px] leading-[1.35] text-[#22D3EE]/80 flex-1 min-h-0 overflow-hidden">
            {[
              "0000  4d 5a 90 00  03 00 00 00  04 00 00 00  ff ff 00 00",
              "0010  b8 00 00 00  00 00 00 00  40 00 00 00  00 00 00 00",
              "0020  00 00 00 00  00 00 00 00  00 00 00 00  00 00 00 00",
              "0030  00 00 00 00  00 00 00 00  00 00 00 00  e8 00 00 00",
              "0040  0e 1f ba 0e  00 b4 09 cd  21 b8 01 4c  cd 21 54 68",
              "0050  69 73 20 70  72 6f 67 72  61 6d 20 63  61 6e 6e 6f",
            ].map((r, i) => (
              <div
                key={i}
                className={i === 3 ? "bg-warning/15 text-warning" : ""}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="rounded bg-white/[0.02] border border-white/5 p-1 text-[7px] font-mono">
            <div className="flex justify-between"><span className="text-muted-foreground">SHA-256</span><span className="text-white/80">a4f2..91c</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Signed</span><span className="text-success">✓ verified</span></div>
          </div>
        </div>
        {/* Chain of custody */}
        <div className="border-l border-white/5 p-1.5 overflow-hidden">
          <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Chain of Custody</div>
          <div className="relative pl-2 space-y-1.5 before:absolute before:left-[3px] before:top-1 before:bottom-1 before:w-px before:bg-white/10">
            {[
              { t: "14:02", a: "Seized", by: "Off. Ray" },
              { t: "14:18", a: "Hashed", by: "system" },
              { t: "15:44", a: "Analyzed", by: "You", live: true },
            ].map((c, i) => (
              <div key={i} className="relative">
                <span
                  className={`absolute -left-[7px] top-1 h-1.5 w-1.5 rounded-full ${
                    c.live ? "bg-primary animate-pulse-glow" : "bg-white/40"
                  }`}
                />
                <div className="text-[7px] font-mono text-muted-foreground">{c.t}</div>
                <div className="text-[8px] text-white/90">{c.a}</div>
                <div className="text-[7px] text-muted-foreground">by {c.by}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockChrome>
  );
}

/* Timeline View — attack reconstruction with zoom + filters */
function ArtTimeline() {
  const events = [
    { x: 8, label: "Phish delivered", tone: "warning" },
    { x: 22, label: "Link clicked", tone: "warning" },
    { x: 35, label: "Payload dropped", tone: "danger" },
    { x: 48, label: "PowerShell exec", tone: "danger" },
    { x: 62, label: "Lateral SMB", tone: "danger" },
    { x: 76, label: "C2 beacon", tone: "primary" },
    { x: 90, label: "Exfil 4.2 GB", tone: "danger" },
  ];
  const tone: Record<string, string> = {
    warning: "#F59E0B",
    danger: "#EF4444",
    primary: "#3B82F6",
  };
  return (
    <MockChrome title="forenshield://timeline/case-2047" meta="T+00:47:12">
      <div className="absolute inset-0 p-2 flex flex-col text-[8px]">
        {/* Filter chips + zoom */}
        <div className="flex items-center gap-1 justify-between">
          <div className="flex gap-0.5">
            {["ALL", "Network", "Endpoint", "Auth", "Files"].map((f, i) => (
              <span
                key={f}
                className={`px-1.5 py-[2px] rounded-full text-[7px] font-mono border ${
                  i === 0
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-white/8 text-muted-foreground"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-0.5 font-mono text-[7px] text-muted-foreground">
            <span className="px-1 rounded bg-white/5 border border-white/8">−</span>
            <span className="text-white/80">100%</span>
            <span className="px-1 rounded bg-white/5 border border-white/8">+</span>
          </div>
        </div>

        {/* Track */}
        <div className="relative flex-1 mt-2">
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {/* Hour grid */}
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={i} x1={i * (100 / 12)} y1="0" x2={i * (100 / 12)} y2="60" stroke="oklch(1 0 0 / 0.05)" strokeWidth="0.15" />
            ))}
            {/* Selection band */}
            <rect x="30" y="0" width="35" height="60" fill="oklch(0.55 0.22 260 / 0.08)" stroke="oklch(0.55 0.22 260 / 0.35)" strokeWidth="0.15" strokeDasharray="1 1" />
            {/* Baseline */}
            <line x1="0" y1="32" x2="100" y2="32" stroke="oklch(1 0 0 / 0.15)" strokeWidth="0.2" />
            {/* Event connectors */}
            {events.map((e, i) => (
              <line key={i} x1={e.x} y1="32" x2={e.x} y2={i % 2 === 0 ? 14 : 50} stroke={tone[e.tone]} strokeOpacity="0.5" strokeWidth="0.2" />
            ))}
            {/* Event dots */}
            {events.map((e, i) => (
              <g key={i}>
                <circle cx={e.x} cy="32" r="1.8" fill={tone[e.tone]} opacity="0.25" className="animate-ping-soft" style={{ transformOrigin: `${e.x}px 32px`, animationDelay: `${i * 0.2}s` }} />
                <circle cx={e.x} cy="32" r="0.9" fill={tone[e.tone]} />
              </g>
            ))}
          </svg>

          {/* Event labels */}
          {events.map((e, i) => (
            <div
              key={i}
              className="absolute text-[6.5px] font-mono px-1 py-[1px] rounded border whitespace-nowrap"
              style={{
                left: `${e.x}%`,
                top: i % 2 === 0 ? "5%" : "78%",
                transform: "translateX(-50%)",
                color: tone[e.tone],
                borderColor: tone[e.tone] + "60",
                background: "oklch(0.10 0.02 260 / 0.9)",
              }}
            >
              {e.label}
            </div>
          ))}
        </div>

        {/* Hour axis */}
        <div className="flex justify-between font-mono text-[6.5px] text-muted-foreground mt-1">
          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
    </MockChrome>
  );
}

/* Analyze Artifacts — relationship graph with side panel */
function ArtGraph() {
  const nodes = [
    { id: "s", x: 30, y: 42, label: "Suspect", sub: "J. Doe", type: "suspect", r: 6 },
    { id: "ip1", x: 62, y: 22, label: "45.33.104.7", sub: "C2 server", type: "ip", r: 5 },
    { id: "em", x: 68, y: 52, label: "phish@acme.io", sub: "sender", type: "email", r: 5 },
    { id: "dom", x: 88, y: 30, label: "acme-secure.io", sub: "domain", type: "domain", r: 4.5 },
    { id: "hash", x: 82, y: 62, label: "a4f2..91c", sub: "malware", type: "hash", r: 4.5 },
    { id: "vic", x: 14, y: 20, label: "Victim-01", sub: "workstation", type: "host", r: 5 },
  ];
  const edges: [string, string, string][] = [
    ["s", "em", "sent"],
    ["em", "vic", "delivered"],
    ["vic", "ip1", "beacon"],
    ["ip1", "dom", "resolves"],
    ["ip1", "hash", "hosts"],
    ["s", "ip1", "owns"],
  ];
  const typeColor: Record<string, string> = {
    suspect: "#EF4444",
    ip: "#3B82F6",
    email: "#F59E0B",
    domain: "#22D3EE",
    hash: "#FBBF24",
    host: "#22C55E",
  };
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <MockChrome title="forenshield://graph/case-2047" meta="6 nodes · 6 edges">
      <div className="absolute inset-0 grid grid-cols-[1fr_32%] text-[8px]">
        <div className="relative">
          <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full">
            <defs>
              <pattern id="gridg" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M6 0H0V6" stroke="oklch(1 0 0 / 0.04)" strokeWidth="0.15" fill="none" />
              </pattern>
            </defs>
            <rect width="100" height="80" fill="url(#gridg)" />
            {edges.map(([a, b, label], i) => {
              const na = find(a);
              const nb = find(b);
              const mx = (na.x + nb.x) / 2;
              const my = (na.y + nb.y) / 2;
              return (
                <g key={i}>
                  <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="oklch(0.55 0.22 260 / 0.55)" strokeWidth="0.25" strokeDasharray="1 1" className="animate-data-flow" />
                  <text x={mx} y={my - 0.5} fill="oklch(0.85 0.03 240)" fontSize="2" fontFamily="monospace" textAnchor="middle" opacity="0.75">{label}</text>
                </g>
              );
            })}
            {nodes.map((n, i) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={n.r + 2} fill={typeColor[n.type]} opacity="0.12" className="animate-pulse-glow" style={{ animationDelay: `${i * 0.15}s` }} />
                <circle cx={n.x} cy={n.y} r={n.r} fill="oklch(0.12 0.025 260)" stroke={typeColor[n.type]} strokeWidth="0.4" />
                <circle cx={n.x} cy={n.y} r={n.r * 0.4} fill={typeColor[n.type]} />
                <text x={n.x} y={n.y + n.r + 2.5} fill="white" fontSize="2.2" fontFamily="monospace" textAnchor="middle" fontWeight="600">{n.label}</text>
                <text x={n.x} y={n.y + n.r + 4.8} fill="oklch(0.7 0.03 240)" fontSize="1.8" fontFamily="monospace" textAnchor="middle">{n.sub}</text>
              </g>
            ))}
            {/* Selection ring on suspect */}
            <circle cx={nodes[0].x} cy={nodes[0].y} r={nodes[0].r + 3} fill="none" stroke="#3B82F6" strokeWidth="0.25" strokeDasharray="1 0.6" />
          </svg>
        </div>
        <div className="border-l border-white/5 p-1.5 space-y-1 overflow-hidden">
          <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest">Selected</div>
          <div className="rounded border border-danger/40 bg-danger/10 p-1.5">
            <div className="text-danger font-semibold text-[9px]">Suspect · J. Doe</div>
            <div className="text-[7px] font-mono text-muted-foreground mt-0.5">Threat score</div>
            <div className="mt-0.5 h-1 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full w-[86%] bg-gradient-to-r from-warning to-danger" />
            </div>
            <div className="text-[7px] font-mono text-white/70 mt-0.5">86 / 100</div>
          </div>
          <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest pt-1">Attributes</div>
          {[
            ["Owns IP", "45.33.104.7"],
            ["Emails", "3 phish"],
            ["Files", "1 malware"],
            ["Country", "RU"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between font-mono text-[7px] py-[1px] border-b border-white/5">
              <span className="text-muted-foreground">{k}</span>
              <span className="text-white/85">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </MockChrome>
  );
}

/* Simulation Runner — mission briefing + decision + console */
function ArtSim() {
  return (
    <MockChrome title="forenshield://simulate/mission-07" meta="● RUNNING">
      <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] text-[8px]">
        {/* Briefing */}
        <div className="px-2 py-1.5 bg-gradient-to-r from-danger/15 to-transparent border-b border-white/5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-danger animate-blink" />
          <div className="min-w-0 flex-1">
            <div className="text-[7px] font-mono text-danger uppercase tracking-widest">Mission Brief</div>
            <div className="text-white text-[9px] font-semibold truncate">Ransomware detected on FIN-DB-02 — contain and eradicate.</div>
          </div>
          <div className="text-right font-mono text-[7px]">
            <div className="text-muted-foreground">HP</div>
            <div className="w-14 h-1 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-success to-warning" />
            </div>
          </div>
        </div>

        {/* Body: console + decisions */}
        <div className="grid grid-cols-[1fr_38%] min-h-0">
          <div className="p-1.5 font-mono text-[7px] leading-[1.5] bg-[oklch(0.06_0.02_260)] overflow-hidden">
            <div className="text-success">$ nmap -sV 10.0.4.22</div>
            <div className="text-muted-foreground">  Host up · 3 ports open</div>
            <div className="text-success">$ isolate --host FIN-DB-02</div>
            <div className="text-warning">  [!] blast radius: 4 hosts</div>
            <div className="text-success">$ ioc-scan --sig ransomware</div>
            <div className="text-danger">  [x] LockBit v3.1 detected</div>
            <div className="text-success">$ snapshot --vol /db</div>
            <div className="text-white/70">  snapshot: db-1547.img (ok)</div>
            <div className="text-secondary">$ awaiting operator...<span className="animate-blink">▊</span></div>
          </div>
          <div className="border-l border-white/5 p-1.5 space-y-1 bg-[oklch(0.10_0.025_260)]">
            <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest">Decision</div>
            {[
              { l: "Isolate host now", r: "+30 XP", tone: "success" },
              { l: "Negotiate w/ actor", r: "risky", tone: "warning" },
              { l: "Wipe & restore", r: "−data", tone: "danger" },
            ].map((d, i) => (
              <div
                key={i}
                className={`rounded border px-1.5 py-1 flex items-center justify-between ${
                  i === 0
                    ? "border-success/50 bg-success/10"
                    : "border-white/8 bg-white/[0.02]"
                }`}
              >
                <span className="text-white text-[8px]">{d.l}</span>
                <span
                  className={`text-[6.5px] font-mono ${
                    d.tone === "success"
                      ? "text-success"
                      : d.tone === "warning"
                      ? "text-warning"
                      : "text-danger"
                  }`}
                >
                  {d.r}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Objective bar */}
        <div className="px-2 py-1 border-t border-white/5 flex items-center gap-2 font-mono text-[7px]">
          <span className="text-muted-foreground">Objectives</span>
          <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full w-[60%] bg-gradient-to-r from-primary to-secondary" style={{ animation: "shimmer 3s linear infinite", backgroundSize: "200% 100%" }} />
          </div>
          <span className="text-white/80">3 / 5</span>
        </div>
      </div>
    </MockChrome>
  );
}

/* Case Reports — professional investigation doc */
function ArtReport() {
  return (
    <MockChrome title="forenshield://report/case-2047.pdf" meta="CONFIDENTIAL">
      <div className="absolute inset-0 grid grid-cols-[28%_1fr] text-[8px]">
        {/* TOC */}
        <div className="border-r border-white/5 p-1.5 bg-[oklch(0.10_0.02_260)] space-y-1">
          <div className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest">Contents</div>
          {[
            "1. Executive Summary",
            "2. Timeline",
            "3. Evidence Appendix",
            "4. Findings",
            "5. Recommendations",
          ].map((t, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 text-[7.5px] py-0.5 ${
                i === 0 ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="truncate">{t}</span>
            </div>
          ))}
          <div className="pt-1 mt-1 border-t border-white/5">
            <div className="text-[6.5px] font-mono text-muted-foreground">Prepared by</div>
            <div className="text-[7.5px] text-white/85">Agent 042</div>
            <div className="text-[6.5px] font-mono text-muted-foreground mt-0.5">Case</div>
            <div className="text-[7.5px] text-primary font-mono">#2047</div>
          </div>
        </div>
        {/* Page */}
        <div className="p-2 bg-[oklch(0.14_0.028_260)] overflow-hidden relative">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/8 pb-1">
            <div>
              <div className="text-[9px] font-display font-bold text-white">Incident Report</div>
              <div className="text-[6.5px] font-mono text-muted-foreground">Case #2047 · 2026-07-06</div>
            </div>
            <div className="h-4 w-4 rounded border border-primary/50 bg-primary/15 flex items-center justify-center">
              <ShieldCheck className="h-2.5 w-2.5 text-primary" />
            </div>
          </div>
          {/* Section heading */}
          <div className="mt-1.5 text-[8px] font-semibold text-primary">1. Executive Summary</div>
          <div className="mt-1 space-y-[2px]">
            {[95, 88, 92, 70, 84, 60].map((w, i) => (
              <div key={i} className="h-[2px] rounded-full bg-white/15" style={{ width: `${w}%` }} />
            ))}
          </div>
          {/* Chart card */}
          <div className="mt-1.5 rounded border border-white/8 bg-white/[0.02] p-1">
            <div className="flex justify-between text-[6.5px] font-mono text-muted-foreground">
              <span>Impact by asset</span>
              <span className="text-danger">HIGH</span>
            </div>
            <svg viewBox="0 0 100 22" className="w-full mt-0.5">
              {[14, 20, 12, 18, 8, 16, 10].map((h, i) => (
                <rect key={i} x={i * 14 + 2} y={22 - h} width="10" height={h} rx="1" fill={i === 1 ? "#EF4444" : "#3B82F6"} opacity={0.4 + i * 0.08} />
              ))}
            </svg>
          </div>
          {/* Signature */}
          <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-end">
            <div>
              <div className="text-[6.5px] font-mono text-muted-foreground">Signature</div>
              <svg viewBox="0 0 60 12" className="w-14 h-3 text-primary">
                <path d="M2 8 Q 10 -2 18 8 T 34 8 T 58 6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[6.5px] font-mono text-muted-foreground">page 1 / 12</span>
          </div>
        </div>
      </div>
    </MockChrome>
  );
}

/* =============================================================
   SPOTLIGHT ROW — Case of the Day / Threat Map / Academy
   ============================================================= */
function SpotlightRow() {
  return (
    <section id="about" className="relative px-4 sm:px-8 py-10 sm:py-16 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-4 sm:gap-6">
        <Reveal delay={0} className="lg:col-span-4">
          <CaseOfTheDay />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-8">
          <ThreatMap />
        </Reveal>
      </div>
    </section>
  );
}

function CaseOfTheDay() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className="relative h-full rounded-[20px] overflow-hidden border border-primary/15 group transition-all duration-[250ms] ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.3)]">
      {/* Moody hero */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Base moody gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 100%, #3B0A0A 0%, #1A0510 35%, #0A0E1A 70%, #05070F 100%)",
          }}
        />
        {/* Red glow behind figure */}
        <div
          className="absolute inset-0 motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 55%, oklch(0.65 0.24 25 / 0.45), transparent 65%)",
          }}
        />
        {/* Grain / noise texture (SVG fractal, tiled) */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            backgroundSize: "160px 160px",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 45%, #000 130%)",
          }}
        />
        {/* Hooded silhouette */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
            {/* Body */}
            <path
              d="M100 38 Q66 40 60 82 L52 150 L148 150 L140 82 Q134 40 100 38 Z"
              fill="#000"
              opacity="0.92"
            />
            {/* Inner hood shadow */}
            <path
              d="M78 68 Q100 52 122 68 L120 96 Q100 104 80 96 Z"
              fill="#000"
            />
            {/* Face rim highlight */}
            <path
              d="M76 68 Q100 50 124 68"
              fill="none"
              stroke="oklch(0.55 0.22 25 / 0.7)"
              strokeWidth="1"
            />
            {/* Glowing eyes */}
            <ellipse cx="90" cy="82" rx="3" ry="1.6" fill="#EF4444">
              <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="110" cy="82" rx="3" ry="1.6" fill="#EF4444">
              <animate attributeName="opacity" values="0.35;1;0.35" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
            {/* Shoulder edge highlight */}
            <path d="M60 100 Q60 130 68 150" fill="none" stroke="oklch(0.55 0.22 25 / 0.5)" strokeWidth="1" />
            <path d="M140 100 Q140 130 132 150" fill="none" stroke="oklch(0.55 0.22 25 / 0.5)" strokeWidth="1" />
          </svg>
        </div>
        {/* Scanline sweep */}
        <div
          aria-hidden
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-danger/60 to-transparent motion-safe:animate-scan"
          style={{ top: 0 }}
        />
        {/* Bottom fade for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[oklch(0.10_0.02_260)]/95 via-[oklch(0.10_0.02_260)]/75 to-transparent" />
        {/* Badge */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/10 border border-white/20 px-2 py-0.5 text-[10px] font-mono tracking-wider text-white backdrop-blur">
          <Eye className="h-3 w-3" /> FEATURED INVESTIGATION
        </span>
        {/* Animated warning indicator */}
        <div className="absolute top-3 right-3 h-8 w-8" aria-label="Warning">
          <span className="absolute inset-0 rounded-full bg-danger/30 motion-safe:animate-[ping-soft_2s_ease-in-out_infinite]" />
          <div className="relative h-8 w-8 rounded-full bg-danger/20 border border-danger/50 flex items-center justify-center shadow-[0_0_16px_oklch(0.65_0.24_25/0.5)] motion-safe:animate-[pulse-glow_2s_ease-in-out_infinite]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path d="M12 3L22 20H2L12 3Z" fill="var(--color-danger)" />
              <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="18" r="1.5" fill="white" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-[oklch(0.16_0.03_260)] to-[oklch(0.10_0.02_260)]">
        <div className="text-white font-display font-bold text-lg leading-tight">
          UPI Fraud Investigation
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          A user lost ₹25,000 in a UPI scam. Trace the transaction trail,
          identify the mule account, and recover lost funds.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">
            Medium
          </span>
          <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-medium text-primary">
            4 Evidence
          </span>
          <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">
            +250 XP
          </span>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="relative w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 will-change-transform hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <span className="relative inline-flex items-center gap-2">
            View Sample Case
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </div>
    <CasePreviewModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

/* =============================================================
   CASE PREVIEW MODAL — Premium demo-style preview
   ============================================================= */
function CasePreviewModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!open) return null;

  const handleDownload = (e: MouseEvent<HTMLAnchorElement>) => {
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
        className="relative w-[min(96vw,680px)] max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 shadow-elevated"
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

        <div className="overflow-y-auto max-h-[92vh] custom-scrollbar">
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em]">
              <span className="inline-flex items-center gap-1 rounded-full bg-danger/15 border border-danger/30 px-2 py-0.5 text-danger">
                <Eye className="h-2.5 w-2.5" /> FEATURED INVESTIGATION
              </span>
              {/* TODO: Consider adding a distinct 'muted red' token if a 3-tier severity scale is reintroduced. For now, using standard danger red. */}
              <span className="inline-flex items-center gap-1 rounded-md border border-danger/40 bg-danger/10 px-1.5 py-0.5 text-danger">
                <AlertTriangle className="h-2.5 w-2.5" /> MEDIUM
              </span>
            </div>
            <h3 className="mt-3 font-display font-bold text-white text-2xl tracking-tight">
              UPI Fraud Investigation
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
              A user lost ₹25,000 in a UPI scam. Trace the transaction trail,
              identify the mule account, and recover lost funds.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-medium text-primary">Financial Forensics</span>
              <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-medium text-primary">4 Evidence Files</span>
              <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">+250 XP</span>
            </div>
          </div>

          {/* Content sections */}
          <div className="px-6 py-5 space-y-5">
            {/* Investigation Overview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <FileSearch className="h-3.5 w-3.5 text-primary" /> Investigation Overview
              </div>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Investigate a real-world UPI payment fraud case. You'll analyze transaction metadata,
                trace the flow of funds across multiple wallets, identify mule accounts used for
                laundering, and build a forensic report for law enforcement.
              </p>
            </div>

            {/* Evidence Preview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <FolderOpen className="h-3.5 w-3.5 text-primary" /> Evidence Preview
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { name: "Transaction Logs", count: "4 files", icon: FileText },
                  { name: "UPI Payment Metadata", count: "2 files", icon: Search },
                  { name: "KYC Verification Records", count: "1 file", icon: Shield },
                  { name: "Communication Logs", count: "3 files", icon: Mail },
                ].map((e, i) => {
                  const EIcon = e.icon;
                  return (
                    <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 flex items-center gap-2.5">
                      <span className="h-7 w-7 shrink-0 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                        <EIcon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] text-white font-medium truncate">{e.name}</div>
                        <div className="text-[9px] text-muted-foreground font-mono">{e.count}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Preview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <Clock className="h-3.5 w-3.5 text-primary" /> Timeline Preview
              </div>
              <div className="mt-2 relative pl-4 space-y-3 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-warning/50 before:to-danger/50">
                {[
                  { time: "Day 1", label: "Initial Report Filed", tone: "text-primary" },
                  { time: "Day 1–2", label: "Evidence Collection & Preservation", tone: "text-primary" },
                  { time: "Day 2–3", label: "Transaction Analysis & Tracing", tone: "text-danger" },
                  { time: "Day 3–4", label: "Suspect Identification & Reporting", tone: "text-danger" },
                ].map((t, i) => (
                  <div key={i} className="relative">
                    <span className={`absolute -left-[13px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background ${
                      i >= 2 ? "bg-danger" : "bg-primary"
                    }`} />
                    <div className="text-[9px] font-mono text-muted-foreground">{t.time}</div>
                    <div className={`text-[12px] font-medium ${t.tone}`}>{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Summary */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <AlertTriangle className="h-3.5 w-3.5 text-danger" /> Threat Summary
              </div>
              <div className="mt-2 rounded-lg border border-danger/20 bg-danger/[0.04] px-4 py-3">
                <div className="text-sm text-white/90 font-medium">Financial fraud via UPI credential theft</div>
                <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-mono text-muted-foreground">
                  <span>Severity: <span className="text-danger">Medium</span></span>
                  <span>Category: <span className="text-white/80">Financial Crime</span></span>
                  <span>Vector: <span className="text-white/80">Social Engineering</span></span>
                </div>
              </div>
            </div>

            {/* Expected Outcome */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Expected Outcome
              </div>
              <div className="mt-2 rounded-lg border border-success/20 bg-success/[0.04] px-4 py-3">
                <ul className="space-y-1 text-sm text-white/80">
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Identify the mule account used for fund transfer</li>
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Trace the complete transaction trail</li>
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Recover digital evidence for prosecution</li>
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Generate a forensic investigation report</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Blur overlay + Download CTA */}
          <div className="relative">
            {/* Blurred faux-content */}
            <div className="h-16 overflow-hidden" style={{ filter: "blur(8px)", opacity: 0.3 }}>
              <div className="px-6 space-y-2">
                <div className="h-3 rounded bg-white/10 w-3/4" />
                <div className="h-3 rounded bg-white/10 w-1/2" />
                <div className="h-3 rounded bg-white/10 w-2/3" />
              </div>
            </div>
            {/* CTA section */}
            <div className="relative px-6 pt-2 pb-8 text-center border-t border-white/5 bg-gradient-to-t from-[oklch(0.10_0.02_260)] to-transparent">
              <p className="text-sm text-white/90 font-medium">
                This is a preview.
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Download ForenShield to access the complete investigation,
                interactive evidence analysis, and professional case reports.
              </p>
              <a
                href="#download"
                onClick={handleDownload}
                className="relative mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative inline-flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Get ForenShield
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   CURRICULUM MODAL
   ============================================================= */
function CurriculumModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
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

  const ALL_COURSES = [
    { icon: Wifi, name: "Networking Basics", progress: 75, xp: 1240, tone: "primary", modules: 8 },
    { icon: Shield, name: "Web Security", progress: 60, xp: 980, tone: "success", modules: 6 },
    { icon: AlertTriangle, name: "Linux Essentials", progress: 40, xp: 620, tone: "warning", modules: 5 },
    { icon: Lock, name: "Cryptography Basics", progress: 0, xp: 850, tone: "primary", modules: 4 },
    { icon: Mail, name: "Social Engineering & Phishing", progress: 0, xp: 750, tone: "warning", modules: 5 },
    { icon: Bug, name: "Malware Analysis Fundamentals", progress: 0, xp: 1100, tone: "danger", modules: 7 },
    { icon: Zap, name: "Incident Response", progress: 0, xp: 920, tone: "primary", modules: 6 },
    { icon: Globe, name: "Cloud Security Basics", progress: 0, xp: 1050, tone: "success", modules: 5 },
  ];

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

/* World topojson served from unpkg CDN */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type ThreatMarker = {
  name: string;
  coords: [number, number]; // [lon, lat]
  category: "malware" | "phishing" | "breach" | "ransomware";
};

const THREAT_MARKERS: ThreatMarker[] = [
  { name: "New York",  coords: [-74.0,  40.7], category: "malware" },
  { name: "São Paulo", coords: [-46.6, -23.5], category: "phishing" },
  { name: "London",    coords: [ -0.1,  51.5], category: "breach" },
  { name: "Lagos",     coords: [  3.4,   6.5], category: "ransomware" },
  { name: "Moscow",    coords: [ 37.6,  55.7], category: "ransomware" },
  { name: "Mumbai",    coords: [ 72.8,  19.0], category: "phishing" },
  { name: "Beijing",   coords: [116.4,  39.9], category: "malware" },
  { name: "Sydney",    coords: [151.2, -33.8], category: "breach" },
];

const CATEGORY: Record<ThreatMarker["category"], { color: string; label: string }> = {
  malware:    { color: "#EF4444", label: "Malware" },
  phishing:   { color: "#F59E0B", label: "Phishing" },
  breach:     { color: "#3B82F6", label: "Data Breach" },
  ransomware: { color: "#A855F7", label: "Ransomware" },
};

function ThreatMap() {
  // Lazy-load react-simple-maps to keep this route's initial bundle lean.
  const [Maps, setMaps] = useState<null | typeof import("react-simple-maps")>(null);
  useEffect(() => {
    let cancelled = false;
    import("react-simple-maps").then((m) => {
      if (!cancelled) setMaps(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[oklch(0.14_0.03_260)] to-[oklch(0.08_0.02_260)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-white font-semibold text-sm tracking-wide">
            LIVE THREAT MAP
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 border border-success/30 px-2 py-0.5 text-[10px] font-mono text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-success/70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          <span className="animate-pulse-glow">LIVE</span>
        </span>
      </div>

      <div className="relative aspect-[16/9] bg-[radial-gradient(ellipse_at_center,oklch(0.20_0.05_260/0.5),transparent_70%)]">
        {Maps ? (
          <Maps.ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 155 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Maps.Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Maps.Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="map-region focus:outline-none"
                  />
                ))
              }
            </Maps.Geographies>

            {THREAT_MARKERS.map((m, i) => {
              const c = CATEGORY[m.category].color;
              return (
                <Maps.Marker key={m.name} coordinates={m.coords}>
                  {/* outer ping ring */}
                  <circle
                    r={9}
                    fill={c}
                    fillOpacity={0.18}
                    stroke={c}
                    strokeOpacity={0.5}
                    strokeWidth={0.7}
                  >
                    <animate attributeName="r" from="4" to="14" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  {/* mid halo */}
                  <circle r={4.5} fill={c} fillOpacity={0.25} />
                  {/* core dot */}
                  <circle
                    r={2.4}
                    fill={c}
                    style={{ filter: `drop-shadow(0 0 4px ${c}) drop-shadow(0 0 8px ${c})` }}
                  >
                    <animate attributeName="opacity" values="1;0.55;1" dur="1.8s" repeatCount="indefinite" />
                    <title>{`${m.name} · ${CATEGORY[m.category].label}`}</title>
                  </circle>
                </Maps.Marker>
              );
            })}
          </Maps.ComposableMap>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[10px] font-mono text-muted-foreground">
            loading map…
          </div>
        )}

        {/* Attack counters overlay */}
        <div className="absolute top-3 right-3 flex gap-2 font-mono pointer-events-none">
          {[
            { c: "#EF4444", label: "ATK", n: "1,284" },
            { c: "#F59E0B", label: "PHS", n: "842" },
            { c: "#3B82F6", label: "BRC", n: "37" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-white/10 bg-black/50 backdrop-blur px-2 py-1 text-[9px]">
              <div className="flex items-center gap-1 text-muted-foreground tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full animate-blink" style={{ background: s.c, boxShadow: `0 0 6px ${s.c}` }} />
                {s.label}
              </div>
              <div className="text-white font-semibold text-[11px] leading-none mt-0.5">{s.n}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
          {(Object.keys(CATEGORY) as ThreatMarker["category"][]).map((k) => {
            const { color, label } = CATEGORY[k];
            return (
              <span key={k} className="inline-flex items-center gap-1.5 text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full animate-pulse-glow"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                />
                {label}
              </span>
            );
          })}
        </div>
        <div className="text-[10px] text-muted-foreground font-mono tracking-wider">
          Live Threat Intelligence Visualization
        </div>
      </div>
    </div>
  );
}

function AcademyCard() {
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

/* =============================================================
   NEW SECTIONS
   ============================================================= */
function CyberAcademySection() {
  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24 bg-surface/30">
      <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Text Left */}
        <div className="flex-1 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-2">
              <span className="tracking-[0.24em] uppercase text-primary">Cyber Academy</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Master the fundamentals <br/>
              of <span className="text-primary text-glow-cyan">Cyber Defense</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              Before you face live attacks, build your foundational knowledge through interactive, scenario-based learning modules. Learn networking basics, web security, cryptography, and linux essentials.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-3 mt-6">
              {[
                "Interactive learning modules with knowledge checks",
                "Progress tracking and certifications",
                "Hands-on command line fundamentals",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-white font-medium">10,000+</span> learners already started
            </div>

            <div className="mt-8">
              <MagneticButton href="#download" className="!px-6 !py-3">
                <GraduationCap className="h-4 w-4" /> Start Learning
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        
        {/* Visual Right (Reusing AcademyCard) */}
        <div className="flex-1 w-full lg:max-w-[500px]">
          <Reveal delay={200}>
            <AcademyCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SimulationLabSection() {
  const sims = [
    { title: "Phishing Analysis", desc: "Spot fake emails and domains before they compromise the network.", icon: Mail, tone: "primary", xp: "+100 XP" },
    { title: "QR Code Scams", desc: "Analyze malicious QR codes used in modern physical-to-digital attacks.", icon: QrCode, tone: "danger", xp: "+150 XP" },
    { title: "OTP Fraud", desc: "Intercept and identify account takeover attempts via SMS spoofing.", icon: Smartphone, tone: "primary", xp: "+200 XP" },
    { title: "Fake Shopping", desc: "Investigate fraudulent e-commerce domains stealing credentials.", icon: ShoppingCart, tone: "danger", xp: "+250 XP" },
  ];
  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-4">
              <span className="tracking-[0.24em] uppercase text-danger">Simulation Lab</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Practice in <span className="text-danger">Live Attack Scenarios</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              Face real-world threats in a safe, gamified environment. Make critical decisions under pressure and see the consequences of your actions.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sims.map((sim, i) => {
            const Icon = sim.icon;
            
            // Map the accent tones for the outer card border & hover shadow
            const cardToneCls: Record<string, string> = {
              primary: "border-primary/20 hover:border-primary/50 hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.35)]",
              danger: "border-danger/20 hover:border-danger/50 hover:shadow-[0_12px_30px_-10px_oklch(0.65_0.24_25/0.35)]",
            };

            // Map the accent tones for the inner icon badge
            const badgeCls: Record<string, string> = {
              primary: "text-primary border-primary/30 bg-primary/10 shadow-[0_0_15px_oklch(0.55_0.22_260/0.35)] group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_oklch(0.55_0.22_260/0.6)]",
              danger: "text-danger border-danger/30 bg-danger/10 shadow-[0_0_15px_oklch(0.65_0.24_25/0.35)] group-hover:border-danger/50 group-hover:bg-danger/20 group-hover:shadow-[0_0_25px_oklch(0.65_0.24_25/0.6)]",
            };

            return (
              <Reveal key={i} delay={i * 100}>
                <div className={`p-6 rounded-2xl border bg-white/[0.02] bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 ease-out hover:-translate-y-2 h-full flex flex-col group cursor-default ${cardToneCls[sim.tone]}`}>
                  <div className={`h-14 w-14 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite] ${badgeCls[sim.tone]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{sim.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1">{sim.desc}</p>
                  
                  {/* Gamification bottom anchor */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Reward</span>
                    <span className="rounded-md bg-achievement/15 border border-achievement/30 px-2 py-0.5 text-[10px] font-medium text-achievement">
                      {sim.xp}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MissionControlSection() {
  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24 bg-surface/30">
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
        {/* Text Right */}
        <div className="flex-1 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-2">
              <span className="tracking-[0.24em] uppercase text-primary">Mission Control</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Level up your <br/>
              <span className="text-primary text-glow-cyan">Cyber Career</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              Every lesson, simulation, and case you solve earns XP. Level up your rank, maintain your daily streak, and unlock exclusive achievement badges as you master cyber defense.
            </p>
          </Reveal>
        </div>
        
        {/* Visual Left */}
        <div className="flex-1 w-full lg:max-w-[450px]">
          <Reveal delay={200}>
            <div className="relative p-8 rounded-3xl border border-white/10 bg-[oklch(0.12_0.025_260)] shadow-elevated overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <div className="relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center relative z-10">
                    <Trophy className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-50" />
                </div>
                <h3 className="text-white font-bold text-xl mt-4">Senior Analyst</h3>
                <div className="text-sm text-muted-foreground font-mono mt-1">Level 42</div>
                
                <div className="w-full mt-8">
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2">
                    <span>12,400 XP</span>
                    <span>15,000 XP to Level 43</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[82%] bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>
                </div>
                
                <div className="w-full mt-8 pt-6 border-t border-white/5">
                  <div className="text-[10px] font-mono text-muted-foreground text-left mb-3">RECENT BADGES</div>
                  <div className="flex items-center gap-2">
                    {[Award, Shield, Terminal, Zap].map((BIcon, i) => (
                      <div key={i} className="h-12 w-12 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary/80 hover:bg-primary/15 hover:border-primary/40 hover:text-primary hover:scale-105 hover:shadow-[0_0_12px_oklch(0.55_0.22_260/0.4)] transition-all cursor-default">
                        <BIcon className="h-5 w-5" />
                      </div>
                    ))}
                    <div className="ml-1 text-[10px] text-muted-foreground font-mono tracking-wider">+12 more</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   DEVICE SHOWCASE
   ============================================================= */
function DeviceShowcase() {
  const screens = [
    { id: "dashboard", component: <MissionControlScreen /> },
    { id: "investigation", component: <CaseDetailsScreen /> },
    { id: "evidence", component: <EvidenceBoardScreen /> },
    { id: "timeline", component: <TimelineScreen /> },
    { id: "report", component: <ReportsScreen /> },
    { id: "learning", component: <AcademyScreen /> },
    { id: "profile", component: <ProfileScreen /> },
    { id: "dashboard_dup", component: <MissionControlScreen /> }
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              Experience the <span className="text-primary text-glow-cyan">Platform</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A comprehensive toolkit for modern digital forensics.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto w-[320px] h-[650px] sm:w-[360px] sm:h-[720px] rounded-[44px] border-[12px] border-black bg-black shadow-[0_30px_80px_-20px_oklch(0.55_0.22_260/0.4)] overflow-hidden group">
          {/* Dynamic Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-black rounded-b-2xl z-20" />
          
          {/* Scroll Container */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-[360px] h-[800%] flex flex-col animate-phone-scroll group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] origin-top-left scale-[0.835] sm:scale-100 transition-transform">
              {screens.map((screen, i) => (
                <div key={`${screen.id}-${i}`} className="w-full h-[12.5%] relative overflow-hidden">
                  {screen.component}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowStory() {
  const steps = [
    { id: 1, title: "Incident Received", desc: "A new suspicious activity alert triggers an investigation protocol. Review the initial threat intelligence and scope the incident.", component: <MissionControlScreen /> },
    { id: 2, title: "Evidence Collected", desc: "Gather critical artifacts from the simulated environment, including network logs, memory dumps, and file system snapshots.", component: <EvidenceBoardScreen /> },
    { id: 3, title: "Analysis in Progress", desc: "Correlate collected data points. Identify the attack vector and trace the adversary's lateral movement.", component: <CaseDetailsScreen /> },
    { id: 4, title: "Timeline Built", desc: "Construct a chronological sequence of events. Map findings directly to MITRE ATT&CK tactics and techniques.", component: <TimelineScreen /> },
    { id: 5, title: "Report Generated", desc: "Compile findings into a professional-grade forensic report, complete with executive summaries and technical details.", component: <ReportsScreen /> },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl">
              From Alert to <span className="text-primary text-glow-cyan">Resolution</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Follow a concrete investigation workflow end-to-end.
            </p>
          </div>
        </Reveal>

        <div className="space-y-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
                {/* Image / Mockup */}
                <div className="flex-1 w-full">
                  <Reveal delay={100}>
                    <div className="relative aspect-[4/3] rounded-2xl glass flex flex-col items-center justify-center p-8 overflow-hidden group hover:border-primary transition-all duration-[250ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.3)] hover:scale-[1.02]">
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      
                      {/* Scaled Mockup Render */}
                      <div className="w-[360px] h-[780px] origin-center scale-[0.4] sm:scale-[0.45] md:scale-[0.4] lg:scale-[0.5] shadow-2xl rounded-[40px] pointer-events-none group-hover:pointer-events-auto">
                        {step.component}
                      </div>
                    </div>
                  </Reveal>
                </div>
                {/* Text */}
                <div className="flex-1 w-full space-y-4">
                  <Reveal delay={200}>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary font-mono text-xs font-bold border border-primary/40 shadow-[0_0_12px_oklch(0.55_0.22_260/0.4)]">
                      0{step.id}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-4 text-lg">{step.desc}</p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustCredibility() {
  return (
    <>
      <Testimonials />
      <Faq />
    </>
  );
}

function FeaturesComparison() {
  const rows = [
    { feature: "Simulated Environments", us: "Hands-on, Real Tools", them: "Abstract Theory" },
    { feature: "Case Data", us: "Real-world Artifacts", them: "Sanitized Examples" },
    { feature: "Progress Tracking", us: "Granular Skill Trees", them: "Completion Certificates" },
    { feature: "Community Support", us: "Active Discord & Mentors", them: "Static Forums" },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-20">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl">
              Why <span className="text-primary text-glow-cyan">ForenShield?</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          {/* Header Row (Desktop Only) */}
          <div className="hidden sm:grid sm:grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 pb-4 font-mono text-[10px] sm:text-xs tracking-wider text-muted-foreground/70 uppercase">
            <div>Capability</div>
            <div>ForenShield</div>
            <div>Traditional Training</div>
          </div>
          
          {/* Row Cards */}
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div 
                key={i} 
                className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-3 sm:gap-4 p-5 sm:px-6 sm:py-4 rounded-2xl glass border border-white/5 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_25px_-10px_oklch(0.55_0.22_260/0.25)] transition-all duration-[200ms] ease-out items-start sm:items-center group"
              >
                {/* Capability */}
                <div>
                  <div className="sm:hidden font-mono text-[10px] tracking-wider text-muted-foreground/70 uppercase mb-1.5">Capability</div>
                  <div className="text-white font-bold text-sm sm:text-base">{r.feature}</div>
                </div>
                
                {/* ForenShield */}
                <div>
                  <div className="sm:hidden font-mono text-[10px] tracking-wider text-muted-foreground/70 uppercase mb-2 mt-4">ForenShield</div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs sm:text-sm group-hover:bg-primary/15 transition-colors">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> {r.us}
                  </div>
                </div>
                
                {/* Traditional */}
                <div>
                  <div className="sm:hidden font-mono text-[10px] tracking-wider text-muted-foreground/70 uppercase mb-2 mt-4">Traditional Training</div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground/50 font-medium text-xs sm:text-sm">
                    <X className="h-4 w-4 shrink-0 opacity-40" /> {r.them}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Roadmap() {
  const items = [
    { status: "live", q: "Q1 2026", title: "Core Platform Launch", desc: "Initial release of investigation dashboard and 3 core cases." },
    { status: "live", q: "Q2 2026", title: "Mobile App Beta", desc: "Android APK available for mobile learning and on-the-go analysis." },
    { status: "planned", q: "Q3 2026", title: "Advanced Simulations", desc: "Multi-player incident response scenarios." },
    { status: "planned", q: "Q4 2026", title: "iOS Release & Web Platform", desc: "Full cross-platform availability." },
  ];
  return (
    <section className="relative px-4 sm:px-8 py-24 bg-surface/30">
      <div className="mx-auto max-w-[800px]">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl">Platform Roadmap</h2>
          </div>
        </Reveal>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[oklch(0.14_0.028_260)] bg-surface md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_1px_oklch(1_0_0/0.1)] relative z-10 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'live' ? 'bg-primary animate-pulse-glow shadow-[0_0_8px_oklch(0.55_0.22_260)]' : 'bg-white/20'}`} />
                </div>
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl glass hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.3)] transition-all duration-[250ms] ease-out">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase">{item.q}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase ${item.status === 'live' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-muted-foreground border border-white/10'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative px-4 sm:px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl">Community Trust</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="p-8 rounded-2xl glass flex flex-col h-full hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary hover:shadow-[0_12px_30px_-10px_oklch(0.55_0.22_260/0.3)] transition-all duration-[250ms] ease-out">
                <div className="flex gap-1 mb-6 text-primary">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed flex-1 italic">
                  "Placeholder testimonial — replace with real user quote once community feedback is collected. This slot is reserved for social proof."
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-sm truncate">Placeholder Name</div>
                    <div className="text-muted-foreground text-xs truncate">Security Analyst Role</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    { q: "What is ForenShield?", a: "ForenShield is an interactive cybersecurity training platform focused on digital forensics and incident response. It provides hands-on cases with real-world simulated evidence." },
    { q: "Is the platform free?", a: "The core platform and initial cases are free. Premium modules and advanced enterprise features may require a subscription in the future." },
    { q: "What skill level is required?", a: "Cases range from beginner to advanced. We recommend basic networking and IT knowledge, but our learning modules guide you through complex forensic concepts." },
    { q: "Are the certificates valid for CPE credits?", a: "Our certificates prove completion of rigorous, practical challenges. We are working on official CPE accreditation with major security organizations." },
    { q: "Can I use the app offline?", a: "Certain learning modules and static evidence files can be cached offline, but full investigation simulations require an active connection." },
  ];

  return (
    <section className="relative px-4 sm:px-8 py-24 bg-surface/30">
      <div className="mx-auto max-w-[800px]">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display font-bold tracking-tight text-white text-3xl">Frequently Asked Questions</h2>
          </div>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 50}>
      <div className="rounded-2xl glass border border-white/10 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none focus-visible:bg-white/5"
          aria-expanded={open}
        >
          <span className="text-white font-medium pr-4">{question}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-[250ms] ease-out ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`accordion-content ${open ? "accordion-content-open" : ""}`}>
          <div className="accordion-inner">
            <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-white/5 pt-4 mx-2">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* =============================================================
   FINAL CTA
   ============================================================= */
function FinalCTA() {
  return (
    <section id="download" className="relative px-4 sm:px-8 py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-[radial-gradient(ellipse_at_top_right,oklch(0.20_0.06_260),oklch(0.10_0.03_260))] p-8 sm:p-12">
            <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
            <div
              className="absolute -inset-x-20 -top-32 h-64 opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.55 0.22 260 / 0.6), transparent 70%)",
              }}
            />
            {/* particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary animate-drift-twinkle"
                style={{
                  top: `${(i * 41) % 100}%`,
                  left: `${(i * 29) % 100}%`,
                  boxShadow: "0 0 10px currentColor",
                  animationDuration: `${4 + (i % 3)}s`,
                  animationDelay: `${(i % 5) * 0.8}s`,
                }}
              />
            ))}
            <div className="relative grid md:grid-cols-2 items-center gap-8">
              <div>
                <h2 className="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                  Ready to master <br />
                  <span className="text-white">cyber </span>
                  <span className="text-primary text-glow-cyan">defense?</span>
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Join thousands of learners building real skills for a safer digital world.
                </p>
              </div>
              <div className="flex flex-col md:items-end md:justify-center gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-muted-foreground font-medium mb-3">
                  <div>Platform: <span className="text-white">Android APK</span></div>
                  <div>Version: <span className="text-white">v1.0.0</span></div>
                  <div>Size: <span className="text-white">48 MB</span></div>
                  <div>Requires: <span className="text-white">Android 8.0+</span></div>
                  <div>Price: <span className="text-white">Free</span></div>
                </div>

                <MagneticButton
                  href="#download"
                  className="!px-8 !py-4 !text-base shadow-[0_0_60px_oklch(0.55_0.22_260/0.6)]"
                >
                  <Rocket className="h-5 w-5" />
                  Get ForenShield
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================
   FOOTER
   ============================================================= */
function Footer() {
  const cols = [
    { title: "Product", links: [
      { label: "Features", href: "#features" },
      { label: "Platform", href: "#platform" },
      { label: "Screenshots", href: "#platform" },
      { label: "Download", href: "#download" },
    ] },
    { title: "Resources", links: [
      { label: "Documentation", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "#" },
    ] },
  ];
  return (
    <footer className="relative border-t border-white/[0.06] bg-background/50 px-4 sm:px-8 py-10">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-16">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-[14px]">
            <Logo />
            <div>
              <div className="text-white font-display font-bold text-lg leading-none">
                ForenShield
              </div>
              <div className="text-[12px] font-medium tracking-[0.18em] mt-1.5 leading-none" style={{ color: "rgba(255,255,255,0.65)" }}>
                Learn. Investigate. Defend.
              </div>
            </div>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-white font-semibold text-sm">{c.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="text-white font-semibold text-sm">Social</div>
          <div className="mt-3 flex items-center gap-2">
            {[Twitter, Linkedin, Github, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                className="h-8 w-8 rounded-lg border border-white/10 hover:border-primary/40 hover:text-primary hover:-translate-y-1 text-muted-foreground flex items-center justify-center transition-all"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] mt-10 pt-6 border-t border-white/5 flex flex-col gap-4 text-xs text-muted-foreground">
        <div className="text-center sm:text-left font-mono text-[10px] tracking-wider text-muted-foreground/60">
          Built with: Flutter · Next.js · PostgreSQL · Prisma · Unity · Firebase · Cloudinary
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/40">© {new Date().getFullYear()} ForenShield. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5">
            Made with <Heart className="h-3 w-3 text-danger fill-danger" /> for Cyber Security Learners
          </span>
        </div>
      </div>
    </footer>
  );
}
