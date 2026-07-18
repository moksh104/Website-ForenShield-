export function AmbientBackdrop() {
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
