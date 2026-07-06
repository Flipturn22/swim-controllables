"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { RequireProfile } from "@/components/RequireProfile";
import { hasWeeklyCheckInForWeek, isPracticeDay } from "@/lib/schedule";
import { loadData } from "@/lib/storage";
import { buildCoachQuestion } from "@/lib/trends";
import type { SwimmerProfile } from "@/lib/types";

export default function DashboardPage() {
  return (
    <RequireProfile>
      <DashboardContent />
    </RequireProfile>
  );
}

function DashboardContent() {
  const [profile, setProfile] = useState<SwimmerProfile | null>(null);
  const [checkInCount, setCheckInCount] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [loggedToday, setLoggedToday] = useState(false);
  const [weeklyDone, setWeeklyDone] = useState(false);
  const [practiceToday, setPracticeToday] = useState(false);
  const [coachQuestion, setCoachQuestion] = useState<string | null>(null);

  useEffect(() => {
    const data = loadData();
    const today = new Date().toISOString().slice(0, 10);
    setProfile(data.profile);
    setCheckInCount(data.checkIns.length);
    setTimeCount(data.meetTimes.length);
    setLoggedToday(data.checkIns.some((c) => c.date === today));
    setWeeklyDone(hasWeeklyCheckInForWeek(data.weeklyCheckIns, today));
    if (data.profile) {
      setPracticeToday(isPracticeDay(data.profile.practiceSchedule, today));
    }
    const q = buildCoachQuestion(data.checkIns, data.weeklyCheckIns);
    setCoachQuestion(q?.question ?? null);
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-medium text-slate-900">Hi {profile.firstName}</h1>
        <p className="mt-2 text-slate-600">
          {profile.role === "parent" ? "Supporting your swimmer" : "Your controllables hub"}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10">
          {!loggedToday && practiceToday && (
            <Link href="/check-in" className="btn-primary text-center sm:hidden">
              Log today&apos;s check-in
            </Link>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Check-ins"
              value={loggedToday ? "Today ✓" : String(checkInCount)}
              href="/check-in"
            />
            <StatCard
              label="Weekly"
              value={weeklyDone ? "Done ✓" : "Log"}
              href="/weekly"
            />
            <StatCard label="Meet times" value={String(timeCount)} href="/times" />
            <StatCard label="My Clues" value="View" href="/trends" />
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#e7e2d9] bg-white p-6">
            <h2 className="font-medium text-slate-900">Today&apos;s nudge</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {loggedToday
                ? weeklyDone
                  ? "You're caught up for now. Patterns build around meets — keep times logged."
                  : "Practice check-in done. Take 30 seconds for this week's buy-in when you can."
                : practiceToday
                  ? "Log attendance and sleep after practice — one tap each."
                  : "No scheduled practice today. Weekly check-in or meet times still help."}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {!loggedToday && (
                <Link
                  href="/check-in"
                  className="text-sm font-medium text-[#0f4c5c] hover:underline"
                >
                  Go to check-in →
                </Link>
              )}
              {!weeklyDone && (
                <Link
                  href="/weekly"
                  className="text-sm font-medium text-[#0f4c5c] hover:underline"
                >
                  Weekly check-in →
                </Link>
              )}
            </div>
          </div>

          {coachQuestion ? (
            <div className="rounded-xl border border-[#e7e2d9] bg-[#e8f4f6] p-6">
              <h2 className="font-medium text-slate-900">Optional: one line for your coach</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 italic">&ldquo;{coachQuestion}&rdquo;</p>
              <p className="mt-3 text-xs text-slate-500">
                Say it once, honestly — supports your program, not a fight over the whiteboard.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[#e7e2d9] bg-white p-6">
              <h2 className="font-medium text-slate-900">Coach conversation</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                After a few check-ins, we&apos;ll suggest one respectful question you could ask — if
                you want to.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-[#e7e2d9] bg-white p-5 transition hover:border-[#0f4c5c]/30"
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-medium text-slate-900">{value}</p>
    </Link>
  );
}
