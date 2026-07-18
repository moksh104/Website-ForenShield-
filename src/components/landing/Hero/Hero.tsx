import { ArrowRight, Github, User } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/common/MagneticButton";
import { LetterStagger } from "./LetterStagger";
import { MissionControlWidget } from "./MissionControlWidget";

export function Hero() {
  return (
    <section id="top" className="relative pt-36 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mt-2 mb-2 border border-white/5">
                <span className="tracking-[0.2em] uppercase text-muted-foreground">
                  Free Android app · v1.0.0 · APK direct download
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 
                className="mt-6 flex flex-col items-start font-display font-bold text-white"
                style={{
                  fontSize: "clamp(3.5rem, 10.5vw, 6rem)",
                  lineHeight: 0.95,
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
              <p className="mt-8 max-w-[42ch] text-[16px] md:text-[18px] lg:text-[19px] text-white/[0.72] leading-[1.6]">
                Master digital forensics and incident response by investigating real-world cyber threats directly on your Android device.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <MagneticButton href="#download" className="!px-7 !py-4 !h-[54px] !text-[16px] flex items-center gap-2" style={{ animation: "button-glow-shadow 3s ease-in-out infinite" }}>
                  Get ForenShield — Free
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <a
                  href="https://github.com/moksh104/Website-ForenShield-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 h-[54px] text-[15px] font-semibold text-white glass hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-300"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                  View on GitHub
                </a>
              </div>
              <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 opacity-70" /> No account required</span>
              </div>
            </Reveal>


          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <MissionControlWidget />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
