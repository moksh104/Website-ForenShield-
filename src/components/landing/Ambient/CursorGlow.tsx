import { useEffect, useRef } from "react";

export function CursorGlow() {
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
