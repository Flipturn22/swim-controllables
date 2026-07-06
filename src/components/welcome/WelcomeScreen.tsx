import Link from "next/link";

/**
 * Visual mock for the first screen a new user sees.
 * Professional default — no gamification, no kid branding.
 */
export function WelcomeScreen() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f7f5f1]">
      {/* Subtle lane-line texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #0f4c5c 0px,
            #0f4c5c 1px,
            transparent 1px,
            transparent 72px
          )`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0f4c5c]/[0.06] blur-3xl"
      />

      <header className="relative z-10 px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-[#0f4c5c]">
            Off Deck
          </span>
          <span className="hidden text-sm text-slate-500 sm:inline">
            Controllables outside the pool
          </span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-10 pt-6 sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0f4c5c]/80">
              For swimmers &amp; parents
            </p>
            <h1 className="mt-4 text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Own what you control outside the pool.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
              Attendance. Sleep. Meet times. Your patterns — not your coach&apos;s
              workout plan.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/onboard"
                className="inline-flex items-center justify-center rounded-xl bg-[#0f4c5c] px-8 py-4 text-base font-medium text-white shadow-sm shadow-[#0f4c5c]/20 transition hover:bg-[#0c3e4b] active:scale-[0.99]"
              >
                Get started
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-xl px-6 py-4 text-base font-medium text-slate-600 transition hover:text-slate-900"
              >
                What are controllables?
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f4c5c]/60" />
                Private
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f4c5c]/60" />
                Stored on your device
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f4c5c]/60" />
                Coaches not required
              </li>
            </ul>
          </div>

          {/* Abstract product preview — serious tool, not a game */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-[#e7e2d9] bg-white/80 p-6 shadow-xl shadow-slate-900/[0.04] backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                This week
              </p>
              <div className="mt-5 space-y-3">
                <PreviewRow label="Practice check-ins" value="4 of 5" accent />
                <PreviewRow label="Sleep" value="Mostly solid" />
                <PreviewRow label="Meet logged" value="SCY 100 free · 52.4" />
                <PreviewRow label="Clue" value="Solid sleep → faster splits" />
              </div>
              <p className="mt-6 border-t border-[#e7e2d9] pt-4 text-xs leading-relaxed text-slate-500">
                Patterns from your data — not medical advice, not a training plan.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-[#e7e2d9]/80 px-6 py-5 sm:px-10">
        <p className="mx-auto max-w-6xl text-center text-xs text-slate-400 sm:text-left">
          Your coach runs the water. Off Deck is for everything else.
        </p>
      </footer>
    </div>
  );
}

function PreviewRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#ebe6dd] bg-[#faf8f5] px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span
        className={`text-sm font-medium ${accent ? "text-[#0f4c5c]" : "text-slate-800"}`}
      >
        {value}
      </span>
    </div>
  );
}
