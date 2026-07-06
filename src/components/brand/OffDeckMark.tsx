type OffDeckMarkProps = {
  className?: string;
  size?: number;
};

/**
 * Off Deck brand mark — deck edge, lane lines below, step off upward.
 * Works as app icon, welcome hero, and header glyph.
 */
export function OffDeckMark({ className, size = 120 }: OffDeckMarkProps) {
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
        <linearGradient id="od-bg" x1="16" y1="12" x2="104" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f4c5c" />
          <stop offset="1" stopColor="#1a7a8c" />
        </linearGradient>
        <linearGradient id="od-water" x1="60" y1="58" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4aabb8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2d8a98" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* App-icon tile */}
      <rect width="120" height="120" rx="28" fill="url(#od-bg)" />

      {/* Pool — lanes stop at the deck */}
      <rect x="18" y="58" width="84" height="44" rx="6" fill="url(#od-water)" />
      <line x1="36" y1="60" x2="36" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="52" y1="60" x2="52" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="68" y1="60" x2="68" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="84" y1="60" x2="84" y2="98" stroke="#f7f5f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />

      {/* Deck lip — the "off" line */}
      <rect x="18" y="48" width="84" height="12" rx="4" fill="#f7f5f1" />
      <rect x="18" y="58" width="84" height="4" fill="#d4e8ec" opacity="0.85" />

      {/* Step off — chevron up into life above the pool */}
      <path
        d="M60 42 L72 30 M60 42 L48 30"
        stroke="#e8f4f6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="40" r="5" fill="#e07a5f" />
    </svg>
  );
}
