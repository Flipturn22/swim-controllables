"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AttendancePicker } from "@/components/check-in/AttendancePicker";
import { OptionalSleepHoursPicker } from "@/components/check-in/OptionalSleepHoursPicker";
import { SleepBucketPicker } from "@/components/check-in/SleepBucketPicker";
import { SorenessPicker } from "@/components/check-in/SorenessPicker";
import { Header } from "@/components/Header";
import { RequireProfile } from "@/components/RequireProfile";
import { isPracticeDay } from "@/lib/schedule";
import { addCheckIn, loadData } from "@/lib/storage";
import type { CheckIn, PracticeAttendance, SleepBucket } from "@/lib/types";

export default function CheckInPage() {
  return (
    <RequireProfile>
      <CheckInForm />
    </RequireProfile>
  );
}

function CheckInForm() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [isPracticeToday, setIsPracticeToday] = useState(true);
  const [attendance, setAttendance] = useState<PracticeAttendance>("full");
  const [sleepBucket, setSleepBucket] = useState<SleepBucket>("ok");
  const [sleepHours, setSleepHours] = useState<number | undefined>();
  const [showHours, setShowHours] = useState(false);
  const [soreness, setSoreness] = useState(3);
  const [feltSick, setFeltSick] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const { profile, checkIns } = loadData();
    if (profile) {
      setIsPracticeToday(isPracticeDay(profile.practiceSchedule, today));
    }
    const existing = checkIns.find((c) => c.date === today);
    if (existing) {
      setAttendance(existing.practiceAttendance);
      setSleepBucket(existing.sleepBucket);
      setSleepHours(existing.sleepHours);
      setShowHours(existing.sleepHours !== undefined);
      setSoreness(existing.soreness);
      setFeltSick(existing.feltSick ?? false);
    }
  }, [today]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const checkIn: CheckIn = {
      id: crypto.randomUUID(),
      date: today,
      practiceAttendance: attendance,
      sleepBucket,
      sleepHours: showHours ? sleepHours : undefined,
      soreness,
      feltSick: feltSick || undefined,
    };
    addCheckIn(checkIn);
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <div className="min-h-screen pb-28 sm:pb-12">
      <Header />
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-2xl font-medium text-slate-900 sm:text-3xl">Practice check-in</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Attendance, sleep, soreness — about 30 seconds. No notes, no grading your coach&apos;s plan.
        </p>
        {!isPracticeToday && (
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Today isn&apos;t on your team schedule — you can still log if you swam or want to track sleep.
          </p>
        )}

        {saved ? (
          <div className="mt-8 rounded-xl bg-[#e8f4f6] px-5 py-6 text-center">
            <p className="text-lg font-medium text-[#0f4c5c]">Saved</p>
            <p className="mt-1 text-sm text-slate-600">Heading home…</p>
          </div>
        ) : (
          <form id="check-in-form" onSubmit={handleSubmit} className="mt-8 space-y-8">
            <AttendancePicker value={attendance} onChange={setAttendance} />
            <SleepBucketPicker value={sleepBucket} onChange={setSleepBucket} />
            {!showHours ? (
              <button
                type="button"
                onClick={() => setShowHours(true)}
                className="text-sm font-medium text-[#0f4c5c] hover:underline"
              >
                + Add hours (optional)
              </button>
            ) : (
              <OptionalSleepHoursPicker value={sleepHours} onChange={setSleepHours} />
            )}
            <SorenessPicker value={soreness} onChange={setSoreness} />
            <label className="flex items-center gap-3 rounded-xl border border-[#d9d2c7] bg-white px-4 py-3">
              <input
                type="checkbox"
                checked={feltSick}
                onChange={(e) => setFeltSick(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-800">Felt sick or congested today</span>
            </label>
            <button type="submit" className="btn-primary hidden sm:block">
              Save check-in
            </button>
          </form>
        )}
      </main>

      {!saved && (
        <div className="fixed inset-x-0 bottom-0 border-t border-[#e7e2d9] bg-[#f7f5f1]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
          <button type="submit" form="check-in-form" className="btn-primary">
            Save check-in
          </button>
        </div>
      )}
    </div>
  );
}
