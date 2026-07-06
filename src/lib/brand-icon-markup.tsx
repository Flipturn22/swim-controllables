/** Shared Flipturn app-icon art for ImageResponse (icon + apple-icon). */
export function FlipturnIconMarkup({ size }: { size: number }) {
  const r = size * 0.233;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f4c5c 0%, #1a7a8c 100%)",
        borderRadius: r,
      }}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 120 120" fill="none">
        <rect x="18" y="62" width="84" height="40" rx="6" fill="rgba(74,171,184,0.45)" />
        <rect x="18" y="52" width="84" height="12" rx="4" fill="#f7f5f1" />
        <rect x="54" y="44" width="12" height="68" rx="3" fill="#e8f4f6" />
        <path
          d="M 88 74 H 70 Q 60 48 50 74 H 32"
          stroke="#f7f5f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="52" r="5" fill="#e07a5f" />
      </svg>
    </div>
  );
}
