"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { RequireProfile } from "@/components/RequireProfile";
import { BUY_IN_LABELS } from "@/data/onboard";
import { hasWeeklyCheckInForWeek, mondayOfWeek } from "@/lib/schedule";
import { addWeeklyCheckIn, loadData } from "@/lib/storage";
import type { WeeklyCheckIn } from "@/lib/types";

export default function WeeklyPage() {
  return (
    <RequireProfile>
      <WeeklyForm />
    </RequireProfile>
  );
}

function WeeklyForm() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const weekStart = mondayOfWeek(today);
  const [buyIn, setBuyIn] = useState(3);
  const [teamDryland, setTeamDryland] = useState(false);
  const [personalGym, setPersonalGym] = useState(false);
  const [saved, setSaved] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    const data = loadData();
    if (hasWeeklyCheckInForWeek(data.weeklyCheckIns, today)) {
      setAlreadyDone(true);
      const existing = data.weeklyCheckIns.find((w) => w.weekStart === weekStart);
      if (existing) {
        setBuyIn(existing.buyIn);
        setTeamDryland(existing.teamDryland);
        setPersonalGym(existing.personalGym);
      }
    }
  }, [today, weekStart]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const entry: WeeklyCheckIn = {
      id: crypto.randomUUID(),
      weekStart,
      buyIn,
      teamDryland,
      personalGym,
    };
    addWeeklyCheckIn(entry);
    setSaved(true);
    setAlreadyDone(true);
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <div className="min-h-screen pb-28 sm:pb-12">
      <Header />
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-2xl font-medium text-slate-900 sm:text-3xl">Weekly check-in</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Once a week — buy-in and dryland/gym context. Not a daily complaint log.
        </p>

        {saved ? (
          <div className="mt-8 rounded-xl bg-[#e8f4f6] px-5 py-6 text-center">
            <p className="text-lg font-medium text-[#0f4c5c]">Saved for this week</p>
          </div>
        ) : (
          <form id="weekly-form" onSubmit={handleSubmit} className="mt-8 space-y-8">
            {alreadyDone && (
              <p className="rounded-lg bg-[#e8f4f6] px-4 py-3 text-sm text-[#0f4c5c]">
                You already logged this week — update below if something changed.
              </p>
            )}

            <div>
              <p className="text-sm font-medium text-slate-800">
                How connected do you feel to your team&apos;s plan this week?
              </p>
              <p className="mt-1 text-xs text-slate-500">
                About buy-in — not rating your coach&apos;s training.
              </p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setBuyIn(level)}
                    className={`flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border px-1 py-2 text-center transition active:scale-[0.98] ${
                      buyIn === level
                        ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                        : "border-[#d9d2c7] bg-white text-slate-700"
                    }`}
                  >
                    <span className="text-lg font-medium">{level}</span>
                    <span className="mt-1 text-[9px] leading-tight sm:text-[10px]">
                      {BUY_IN_LABELS[level - 1]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-[#d9d2c7] bg-white px-4 py-3">
              <input
                type="checkbox"
                checked={teamDryland}
                onChange={(e) => setTeamDryland(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-800">Did team dryland / lift with the group this week?</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-[#d9d2c7] bg-white px-4 py-3">
              <input
                type="checkbox"
                checked={personalGym}
                onChange={(e) => setPersonalGym(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-800">
                Did personal gym or lifting outside team practice this week?
              </span>
            </label>

            <button type="submit" className="btn-primary hidden sm:block">
              Save weekly check-in
            </button>
          </form>
        )}
      </main>

      {!saved && (
        <div className="fixed inset-x-0 bottom-0 border-t border-[#e7e2d9] bg-[#f7f5f1]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
          <button type="submit" form="weekly-form" className="btn-primary">
            Save weekly check-in
          </button>
        </div>
      )}
    </div>
  );
}
