type FlipturnMarkProps = {
  className?: string;
  size?: number;
};

/**
 * Flipturn brand mark — wall, flip-turn arc, lane lines below.
 * Works as app icon, welcome hero, and header glyph.
 */
export function FlipturnMark({ className, size = 120 }: FlipturnMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="ft-bg" x1="16" y1="12" x2="104" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f4c5c" />
          <stop offset="1" stopColor="#1a7a8c" />
        </linearGradient>
        <linearGradient id="ft-water" x1="60" y1="62" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4aabb8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2d8a98" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect width="120" height="120" rx="28" fill="url(#ft-bg)" />

      <rect x="18" y="62" width="84" height="40" rx="6" fill="url(#ft-water)" />
      <line x1="36" y1="64" x2="36" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="52" y1="64" x2="52" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="68" y1="64" x2="68" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="84" y1="64" x2="84" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />

      {/* Deck + wall cap */}
      <rect x="18" y="52" width="84" height="12" rx="4" fill="#f7f5f1" />
      <rect x="54" y="44" width="12" height="68" rx="3" fill="#e8f4f6" />

      {/* Flip-turn path — in, curl at wall, out */}
      <path
        d="M 88 74 H 70 Q 60 48 50 74 H 32"
        stroke="#f7f5f1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="60" cy="52" r="5" fill="#e07a5f" />
    </svg>
  );
}
