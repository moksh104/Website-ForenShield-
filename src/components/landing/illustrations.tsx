/**
 * unDraw-style flat SVG illustrations for the ForenShield landing.
 * Palette: Signal Blue #2563EB, Cyan #22D3EE, Amber accent #F59E0B.
 * All illustrations sit on a transparent background so the parent card
 * chrome (dark navy gradient) shows through.
 */

const BLUE = "#2563EB";
const BLUE_D = "#1E3A8A";
const CYAN = "#22D3EE";
const AMBER = "#F59E0B";
const LIGHT = "#DBEAFE";
const SKIN = "#F1F5F9";

function Frame({ children, viewBox = "0 0 400 300" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/* Investigation Lab — hooded hacker at a laptop */
export function IllusHacker() {
  return (
    <Frame>
      <defs>
        <linearGradient id="hg-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.18" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* floor glow */}
      <ellipse cx="200" cy="250" rx="150" ry="18" fill="url(#hg-floor)" />
      {/* desk */}
      <rect x="70" y="215" width="260" height="8" rx="2" fill={BLUE_D} />
      <rect x="90" y="223" width="6" height="30" fill={BLUE_D} />
      <rect x="304" y="223" width="6" height="30" fill={BLUE_D} />
      {/* laptop base */}
      <rect x="150" y="200" width="100" height="16" rx="3" fill="#0F172A" stroke={BLUE} strokeWidth="1.2" />
      {/* laptop screen */}
      <rect x="158" y="150" width="84" height="52" rx="3" fill="#0B1224" stroke={CYAN} strokeWidth="1.2" />
      <rect x="164" y="156" width="72" height="4" rx="1" fill={CYAN} opacity="0.7" />
      <rect x="164" y="164" width="50" height="3" rx="1" fill={BLUE} opacity="0.7" />
      <rect x="164" y="171" width="60" height="3" rx="1" fill={BLUE} opacity="0.6" />
      <rect x="164" y="178" width="40" height="3" rx="1" fill={AMBER} opacity="0.9" />
      <rect x="164" y="185" width="55" height="3" rx="1" fill={BLUE} opacity="0.5" />
      {/* hooded figure */}
      <g>
        {/* torso / hood */}
        <path
          d="M120 210 Q120 130 200 120 Q280 130 280 210 Z"
          fill="#0F172A"
          stroke={BLUE}
          strokeWidth="1.5"
        />
        {/* hood inner shadow */}
        <path
          d="M155 175 Q200 145 245 175 L245 200 Q200 210 155 200 Z"
          fill="#050914"
        />
        {/* face shadow */}
        <ellipse cx="200" cy="180" rx="30" ry="16" fill="#050914" />
        {/* eyes glow */}
        <circle cx="188" cy="180" r="2.6" fill={CYAN}>
          <animate attributeName="opacity" values="1;0.4;1" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="212" cy="180" r="2.6" fill={CYAN}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
        </circle>
        {/* hood highlight */}
        <path d="M140 200 Q150 150 200 130" fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.6" />
      </g>
      {/* hands */}
      <ellipse cx="170" cy="210" rx="10" ry="4" fill={SKIN} opacity="0.9" />
      <ellipse cx="230" cy="210" rx="10" ry="4" fill={SKIN} opacity="0.9" />
      {/* floating code particles */}
      <g fill={CYAN} opacity="0.7">
        <rect x="90" y="90" width="18" height="3" rx="1">
          <animate attributeName="opacity" values="0;0.9;0" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="300" y="70" width="24" height="3" rx="1">
          <animate attributeName="opacity" values="0.9;0;0.9" dur="3.4s" repeatCount="indefinite" />
        </rect>
        <rect x="330" y="110" width="14" height="3" rx="1" fill={AMBER}>
          <animate attributeName="opacity" values="0;1;0" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <rect x="60" y="140" width="10" height="3" rx="1">
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.8s" repeatCount="indefinite" />
        </rect>
      </g>
    </Frame>
  );
}

/* Timeline View — network / graph visualization */
export function IllusNetwork() {
  const nodes = [
    { x: 80, y: 90, r: 10, c: BLUE },
    { x: 160, y: 60, r: 8, c: CYAN },
    { x: 230, y: 110, r: 12, c: AMBER },
    { x: 320, y: 70, r: 8, c: BLUE },
    { x: 120, y: 180, r: 8, c: CYAN },
    { x: 210, y: 220, r: 14, c: BLUE },
    { x: 300, y: 190, r: 9, c: AMBER },
    { x: 350, y: 240, r: 7, c: CYAN },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [2, 5], [5, 6], [3, 6], [6, 7], [1, 4],
  ];
  return (
    <Frame>
      {/* soft grid */}
      <g opacity="0.15" stroke={BLUE}>
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} strokeWidth="0.5" />
        ))}
      </g>
      {/* edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={BLUE}
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.6"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.5s" repeatCount="indefinite" />
        </line>
      ))}
      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 4} fill={n.c} opacity="0.15" />
          <circle cx={n.x} cy={n.y} r={n.r} fill="#0B1224" stroke={n.c} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r={n.r - 4} fill={n.c} opacity="0.9">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* traveling pulse */}
      <circle r="3" fill={AMBER}>
        <animateMotion dur="4s" repeatCount="indefinite" path="M80 90 L160 60 L230 110 L210 220 L300 190 L350 240" />
      </circle>
    </Frame>
  );
}

/* Analyze Artifacts — dashboard UI mockup */
export function IllusDashboard() {
  return (
    <Frame>
      {/* browser window */}
      <rect x="40" y="40" width="320" height="220" rx="8" fill="#0B1224" stroke={BLUE} strokeWidth="1.5" />
      <rect x="40" y="40" width="320" height="22" rx="8" fill="#111832" />
      <circle cx="52" cy="51" r="3" fill="#EF4444" />
      <circle cx="62" cy="51" r="3" fill={AMBER} />
      <circle cx="72" cy="51" r="3" fill="#22C55E" />
      {/* sidebar */}
      <rect x="46" y="68" width="60" height="186" rx="3" fill="#0F172A" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="52" y={78 + i * 20} width="48" height="10" rx="2" fill={i === 1 ? BLUE : "#1E293B"} />
      ))}
      {/* KPI cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={116 + i * 80} y="72" width="72" height="42" rx="4" fill="#0F172A" stroke={BLUE} strokeWidth="0.8" opacity="0.9" />
          <rect x={122 + i * 80} y="80" width="30" height="4" rx="1" fill={LIGHT} opacity="0.5" />
          <rect x={122 + i * 80} y="90" width="44" height="10" rx="1" fill={i === 1 ? AMBER : CYAN} />
          <rect x={122 + i * 80} y="104" width="20" height="3" rx="1" fill="#22C55E" opacity="0.8" />
        </g>
      ))}
      {/* chart area */}
      <rect x="116" y="124" width="232" height="128" rx="4" fill="#0F172A" stroke={BLUE} strokeWidth="0.8" />
      {/* bars */}
      {[40, 65, 55, 80, 70, 95, 60, 85, 100, 75].map((h, i) => (
        <rect
          key={i}
          x={124 + i * 22}
          y={244 - h}
          width="14"
          height={h}
          rx="2"
          fill={i === 5 || i === 8 ? AMBER : BLUE}
          opacity={i === 5 || i === 8 ? 1 : 0.75}
        >
          <animate attributeName="height" values={`${h * 0.6};${h};${h * 0.6}`} dur={`${2.4 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${244 - h * 0.6};${244 - h};${244 - h * 0.6}`} dur={`${2.4 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* trend line */}
      <polyline
        points="124,220 146,205 168,210 190,190 212,195 234,175 256,180 278,160 300,170 322,150"
        fill="none"
        stroke={CYAN}
        strokeWidth="1.5"
        strokeDasharray="60 200"
      >
        <animate attributeName="stroke-dashoffset" from="260" to="0" dur="3s" repeatCount="indefinite" />
      </polyline>
    </Frame>
  );
}

/* Simulation Runner — big play button with signal rings */
export function IllusPlay() {
  return (
    <Frame>
      {/* rings */}
      {[70, 100, 130].map((r, i) => (
        <circle key={i} cx="200" cy="150" r={r} fill="none" stroke={BLUE} strokeWidth="1.2" opacity={0.4 - i * 0.1}>
          <animate attributeName="r" values={`${r};${r + 10};${r}`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${0.5 - i * 0.1};${0.15};${0.5 - i * 0.1}`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* outer glow disk */}
      <circle cx="200" cy="150" r="60" fill={BLUE} opacity="0.15" />
      {/* main disk */}
      <circle cx="200" cy="150" r="48" fill="#0B1224" stroke={CYAN} strokeWidth="2" />
      {/* triangle */}
      <polygon points="188,128 188,172 226,150" fill={CYAN} />
      <polygon points="188,128 188,172 226,150" fill={AMBER} opacity="0.3" />
      {/* orbiters */}
      <g>
        <circle cx="330" cy="150" r="4" fill={AMBER}>
          <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="150" r="3" fill={CYAN}>
          <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="-360 200 150" dur="8s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* corner ticks */}
      <g stroke={BLUE} strokeWidth="1.2" opacity="0.5">
        <line x1="40" y1="60" x2="60" y2="60" /><line x1="40" y1="60" x2="40" y2="80" />
        <line x1="360" y1="60" x2="340" y2="60" /><line x1="360" y1="60" x2="360" y2="80" />
        <line x1="40" y1="240" x2="60" y2="240" /><line x1="40" y1="240" x2="40" y2="220" />
        <line x1="360" y1="240" x2="340" y2="240" /><line x1="360" y1="240" x2="360" y2="220" />
      </g>
    </Frame>
  );
}

/* Case Reports — stack of document pages */
export function IllusReports() {
  return (
    <Frame>
      {/* back page */}
      <g transform="translate(70 60) rotate(-6 130 90)">
        <rect width="180" height="200" rx="6" fill="#0F172A" stroke={BLUE} strokeWidth="1.2" />
        <rect x="14" y="18" width="80" height="8" rx="2" fill={BLUE} opacity="0.6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="14" y={40 + i * 14} width={i % 2 ? 140 : 120} height="4" rx="1" fill={LIGHT} opacity="0.25" />
        ))}
      </g>
      {/* middle page */}
      <g transform="translate(110 50) rotate(2 130 90)">
        <rect width="180" height="200" rx="6" fill="#111832" stroke={CYAN} strokeWidth="1.2" />
        <rect x="14" y="18" width="100" height="8" rx="2" fill={CYAN} opacity="0.6" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="14" y={40 + i * 12} width={i === 1 ? 150 : 130} height="4" rx="1" fill={LIGHT} opacity="0.3" />
        ))}
        <rect x="14" y="90" width="152" height="60" rx="3" fill="#0B1224" stroke={BLUE} strokeWidth="0.8" />
        {/* mini bars */}
        {[24, 40, 32, 50, 44, 36].map((h, i) => (
          <rect key={i} x={22 + i * 24} y={144 - h} width="14" height={h} rx="1" fill={i === 3 ? AMBER : BLUE} opacity="0.9" />
        ))}
        <rect x="14" y="160" width="120" height="4" rx="1" fill={LIGHT} opacity="0.3" />
        <rect x="14" y="170" width="90" height="4" rx="1" fill={LIGHT} opacity="0.3" />
      </g>
      {/* front page */}
      <g transform="translate(150 70)">
        <rect width="180" height="200" rx="6" fill="#F8FAFC" />
        <rect y="0" width="180" height="34" rx="6" fill={BLUE} />
        <rect x="14" y="12" width="90" height="6" rx="2" fill="#F8FAFC" />
        <rect x="14" y="22" width="60" height="4" rx="1" fill="#DBEAFE" opacity="0.8" />
        {/* shield seal */}
        <g transform="translate(140 6)">
          <path d="M14 2 L26 6 L26 16 Q26 24 14 30 Q2 24 2 16 L2 6 Z" fill={AMBER} />
          <path d="M9 15 L13 19 L20 11" stroke="#0B1224" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="14" y={50 + i * 10} width={i % 2 ? 150 : 130} height="4" rx="1" fill="#94A3B8" />
        ))}
        <rect x="14" y="100" width="152" height="46" rx="3" fill="#EFF6FF" stroke={BLUE} strokeWidth="0.8" />
        <polyline points="20,140 40,120 60,128 80,110 100,118 120,100 140,108 160,90" fill="none" stroke={BLUE} strokeWidth="1.6" />
        <circle cx="160" cy="90" r="3" fill={AMBER} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="14" y={158 + i * 10} width={i === 1 ? 140 : 110} height="4" rx="1" fill="#94A3B8" />
        ))}
      </g>
      {/* stamp */}
      <g transform="translate(280 190) rotate(-14)">
        <rect x="-30" y="-14" width="60" height="28" rx="3" fill="none" stroke={AMBER} strokeWidth="2" opacity="0.9" />
        <text x="0" y="4" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill={AMBER}>VERIFIED</text>
      </g>
    </Frame>
  );
}
