export function PartnershipIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute w-[360px] h-[360px] rounded-full bg-primary-softer/70" />
      <svg viewBox="0 0 360 320" className="relative w-full h-auto" aria-hidden>
        <circle cx="180" cy="160" r="110" fill="oklch(0.93 0.07 145)" opacity="0.6" />
        <circle cx="180" cy="160" r="85" fill="oklch(0.62 0.18 145)" opacity="0.15" />
        <ellipse cx="180" cy="300" rx="100" ry="14" fill="oklch(0.62 0.18 145 / 0.1)" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 180 + Math.cos(rad) * 95;
          const y = 160 + Math.sin(rad) * 95;
          return (
            <g key={i}>
              <line x1="180" y1="160" x2={x} y2={y} stroke="oklch(0.62 0.18 145)" strokeWidth="1.5" opacity="0.35" />
              <circle cx={x} cy={y} r="14" fill="oklch(0.62 0.18 145)" opacity="0.85" />
              <circle cx={x} cy={y} r="6" fill="white" />
            </g>
          );
        })}
        <path d="M115 195 C115 170 145 155 180 155 C215 155 245 170 245 195" fill="#e8b88a" />
        <path d="M95 200 L115 195 L125 220 Z" fill="#d4a574" />
        <path d="M265 200 L245 195 L235 220 Z" fill="#d4a574" />
        <rect x="130" y="175" width="100" height="8" rx="4" fill="#c99562" />
        <circle cx="180" cy="145" r="55" fill="oklch(0.62 0.18 145)" opacity="0.25" />
        <path d="M140 120 Q180 90 220 120 Q210 150 180 155 Q150 150 140 120" fill="oklch(0.55 0.15 145)" opacity="0.5" />
      </svg>
    </div>
  );
}
