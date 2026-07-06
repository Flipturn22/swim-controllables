import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Duolingo-inspired welcome — warm, rounded, encouraging —
 * but athletic and trustworthy (no mascot, no kid-game chrome).
 */
export function WelcomeScreenPlayful() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-[#f0f9fa] via-[#f7f5f1] to-[#f7f5f1]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#0f4c5c]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-[#e07a5f]/10 blur-3xl"
      />

      <header className="relative z-10 px-5 pt-6 sm:px-8 sm:pt-8">
        <div className="mx-auto flex max-w-lg items-center justify-between sm:max-w-2xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4c5c] shadow-md shadow-[#0f4c5c]/25">
              <DeckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0f4c5c]">
              Off Deck
            </span>
          </div>
          <Link
            href="/learn"
            className="text-sm font-semibold text-[#0f4c5c]/80 hover:text-[#0f4c5c]"
          >
            Learn
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-8 pt-4 sm:max-w-2xl sm:px-8">
        <div className="flex justify-center sm:justify-start">
          <HeroIllustration />
        </div>

        <h1 className="mt-6 text-center text-[2rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-left sm:text-[2.75rem]">
          Your coach has the sets.
          <br />
          <span className="text-[#0f4c5c]">You&apos;ve got the rest.</span>
        </h1>

        <p className="mt-4 text-center text-base leading-relaxed text-slate-600 sm:text-left sm:text-lg">
          Quick check-ins after practice. Sleep, attendance, meet times — turned
          into patterns you can actually use.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <FeatureCard
            icon={<PracticeIcon />}
            label="Practice"
            detail="Did you show up?"
            tint="teal"
          />
          <FeatureCard
            icon={<SleepIcon />}
            label="Sleep"
            detail="Rough, OK, or solid"
            tint="indigo"
          />
          <FeatureCard
            icon={<MeetIcon />}
            label="Meets"
            detail="Log times, spot trends"
            tint="coral"
          />
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/onboard"
            className="duo-btn group relative inline-flex w-full items-center justify-center rounded-2xl bg-[#0f4c5c] px-6 py-4 text-lg font-bold text-white shadow-[0_4px_0_#0a3642] transition active:translate-y-1 active:shadow-[0_1px_0_#0a3642]"
          >
            Get started — it&apos;s free
          </Link>
          <p className="text-center text-xs text-slate-500">
            Private · On your device · Coaches optional
          </p>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-[#e7e2d9] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <ProgressRing percent={80} />
            <div>
              <p className="text-sm font-bold text-slate-800">
                This is how clues unlock
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                Show up, log sleep, add a meet — your own patterns appear. No
                lectures. No workout plans.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-5 py-4 text-center sm:px-8">
        <p className="text-xs font-medium text-slate-400">
          Built for swimmers who care — and parents who log the drive home.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  label,
  detail,
  tint,
}: {
  icon: ReactNode;
  label: string;
  detail: string;
  tint: "teal" | "indigo" | "coral";
}) {
  const borders = {
    teal: "border-[#b8dde4] bg-[#eef8f9]",
    indigo: "border-[#c7d2fe] bg-[#f0f2ff]",
    coral: "border-[#f5d0c5] bg-[#fff5f2]",
  };
  const labels = {
    teal: "text-[#0f4c5c]",
    indigo: "text-[#4338ca]",
    coral: "text-[#c45c3e]",
  };

  return (
    <div
      className={`rounded-2xl border-2 px-4 py-3.5 ${borders[tint]}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="shrink-0">{icon}</div>
        <div>
          <p className={`text-sm font-bold ${labels[tint]}`}>{label}</p>
          <p className="text-xs text-slate-600">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative shrink-0">
      <svg width="56" height="56" className="-rotate-90">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#e7e2d9"
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#0f4c5c"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#0f4c5c]">
        {percent}%
      </span>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="welcome-float relative h-44 w-44 sm:h-48 sm:w-48">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#0f4c5c] to-[#1a7a8c] shadow-lg shadow-[#0f4c5c]/20" />
      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full p-5"
        aria-hidden
      >
        {/* Pool edge */}
        <rect x="20" y="130" width="160" height="12" rx="4" fill="#e8f4f6" />
        <rect x="20" y="142" width="160" height="40" rx="6" fill="#5bb8c9" opacity="0.5" />
        {/* Lane lines */}
        <line x1="60" y1="148" x2="60" y2="178" stroke="#fff" strokeWidth="2" opacity="0.4" />
        <line x1="100" y1="148" x2="100" y2="178" stroke="#fff" strokeWidth="2" opacity="0.4" />
        <line x1="140" y1="148" x2="140" y2="178" stroke="#fff" strokeWidth="2" opacity="0.4" />
        {/* Deck figure — minimal, athletic */}
        <circle cx="100" cy="72" r="18" fill="#f7f5f1" />
        <path
          d="M88 95 Q100 88 112 95 L108 125 L92 125 Z"
          fill="#f7f5f1"
        />
        <rect x="85" y="118" width="10" height="14" rx="3" fill="#e07a5f" />
        <rect x="105" y="118" width="10" height="14" rx="3" fill="#e07a5f" />
        {/* Towel / bag hint */}
        <rect x="130" y="108" width="28" height="18" rx="6" fill="#f7f5f1" opacity="0.9" />
        {/* Check mark badge */}
        <circle cx="155" cy="55" r="22" fill="#58cc02" />
        <path
          d="M145 55 L152 62 L168 46"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DeckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 16h16M4 12h16M4 8h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M6 16v4M18 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PracticeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="8" fill="#0f4c5c" />
      <path
        d="M10 14h8M14 10v8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SleepIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="8" fill="#6366f1" />
      <path
        d="M18 12a5 5 0 11-8 4 4 0 018 1z"
        fill="white"
      />
    </svg>
  );
}

function MeetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="8" fill="#e07a5f" />
      <path
        d="M10 18l3-8 3 5 2-4 3 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
