import Link from "next/link";
import { FlipturnMark } from "@/components/brand/FlipturnMark";

/**
 * Welcome landing — Flipturn brand preview (logo-first).
 */
export function WelcomeScreenPlayfulV2() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-[#f0f9fa] via-[#f7f5f1] to-[#f7f5f1]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#0f4c5c]/8 blur-3xl"
      />

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-10">
        <div className="welcome-float flex flex-col items-center text-center">
          <div className="rounded-[2rem] shadow-xl shadow-[#0f4c5c]/15 ring-4 ring-white/80">
            <FlipturnMark size={132} />
          </div>
          <p className="mt-5 text-2xl font-extrabold tracking-tight text-[#0f4c5c]">
            Flipturn
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Controllables outside the pool
          </p>
        </div>

        <h1 className="mt-8 text-center text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-[2.25rem]">
          Your coach has the sets.
          <br />
          <span className="text-[#0f4c5c]">You&apos;ve got the rest.</span>
        </h1>

        <p className="mt-3 text-center text-base text-slate-600">
          Quick check-ins. Clues that help you show up ready.
        </p>

        <div className="mt-8">
          <Link
            href="/onboard"
            className="flex w-full items-center justify-center rounded-2xl bg-[#0f4c5c] px-6 py-4 text-lg font-bold text-white shadow-[0_4px_0_#0a3642] transition active:translate-y-1 active:shadow-[0_1px_0_#0a3642]"
          >
            Get started
          </Link>
          <p className="mt-3 text-center text-xs text-slate-500">
            Free · Private · No coach required
          </p>
        </div>
      </main>

      <footer className="relative z-10 space-y-2 px-6 pb-6 text-center">
        <Link
          href="/sync"
          className="block text-sm font-medium text-[#0f4c5c] hover:underline"
        >
          Save logs to cloud
        </Link>
        <Link
          href="/learn"
          className="block text-sm font-medium text-[#0f4c5c]/70 hover:text-[#0f4c5c]"
        >
          What are controllables?
        </Link>
      </footer>
    </div>
  );
}
