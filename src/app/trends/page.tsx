"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { RequireProfile } from "@/components/RequireProfile";
import { loadData } from "@/lib/storage";
import { buildCoachQuestion, buildTrendInsights, formatCheckInSummary } from "@/lib/trends";
import type { CheckIn } from "@/lib/types";

export default function TrendsPage() {
  return (
    <RequireProfile>
      <TrendsContent />
    </RequireProfile>
  );
}

function TrendsContent() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [insights, setInsights] = useState<{ title: string; body: string }[]>([]);
  const [coachQ, setCoachQ] = useState<{ question: string; context: string } | null>(null);

  useEffect(() => {
    const data = loadData();
    setCheckIns(data.checkIns);
    setInsights(buildTrendInsights(data.checkIns, data.meetTimes, data.weeklyCheckIns));
    setCoachQ(buildCoachQuestion(data.checkIns, data.weeklyCheckIns));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-medium text-slate-900">My Clues</h1>
        <p className="mt-2 text-slate-600">
          Your patterns only — especially around meets. Not rules for everyone. Not medical advice.
        </p>

        <section className="mt-10 space-y-4">
          {insights.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e7e2d9] bg-white p-6">
              <h2 className="font-medium text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </section>

        {coachQ && (
          <section className="mt-10 rounded-xl bg-[#e8f4f6] p-6">
            <h2 className="font-medium text-slate-900">One question for your coach (optional)</h2>
            <p className="mt-3 text-sm leading-7 text-slate-800 italic">&ldquo;{coachQ.question}&rdquo;</p>
            <p className="mt-3 text-xs leading-6 text-slate-600">{coachQ.context}</p>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-medium text-slate-900">Recent check-ins</h2>
          <ul className="mt-4 space-y-2">
            {checkIns.length === 0 ? (
              <li className="text-sm text-slate-500">No check-ins yet.</li>
            ) : (
              checkIns.slice(0, 10).map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#e7e2d9] bg-white px-4 py-3 text-sm"
                >
                  <span className="text-slate-800">{c.date}</span>
                  <span className="text-slate-600">{formatCheckInSummary(c)}</span>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
