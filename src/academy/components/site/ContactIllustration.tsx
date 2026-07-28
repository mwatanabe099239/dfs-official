export function ContactIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[320px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute w-[280px] h-[280px] rounded-full bg-primary-softer/80" />
      <svg viewBox="0 0 280 220" className="relative w-full h-auto" aria-hidden>
        <ellipse cx="140" cy="200" rx="90" ry="12" fill="oklch(0.62 0.18 145 / 0.12)" />
        <path d="M60 80 Q40 120 55 155 L140 175 L225 155 Q240 120 220 80 Z" fill="white" stroke="oklch(0.92 0.005 250)" strokeWidth="2" />
        <path d="M60 80 L140 105 L220 80" fill="none" stroke="oklch(0.92 0.005 250)" strokeWidth="2" />
        <rect x="95" y="45" width="90" height="58" rx="10" fill="oklch(0.35 0.12 145)" />
        <circle cx="115" cy="72" r="5" fill="white" />
        <circle cx="140" cy="72" r="5" fill="white" />
        <circle cx="165" cy="72" r="5" fill="white" />
        <path d="M200 55 Q235 45 245 75 Q250 95 230 100 Q215 85 200 90 Z" fill="oklch(0.93 0.07 145)" />
        <path d="M45 130 Q25 145 35 165 Q50 175 65 160" fill="none" stroke="oklch(0.62 0.18 145)" strokeWidth="3" strokeLinecap="round" />
        <path d="M235 130 Q255 145 245 165 Q230 175 215 160" fill="none" stroke="oklch(0.62 0.18 145)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
