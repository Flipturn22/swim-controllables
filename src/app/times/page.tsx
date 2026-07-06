"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { RequireProfile } from "@/components/RequireProfile";
import { EVENT_OPTIONS } from "@/data/content";
import { addMeetTime, loadData } from "@/lib/storage";
import { formatSwimTime, parseSwimTime } from "@/lib/time";
import type { MeetTime } from "@/lib/types";

export default function TimesPage() {
  return (
    <RequireProfile>
      <TimesContent />
    </RequireProfile>
  );
}

function TimesContent() {
  const [times, setTimes] = useState<MeetTime[]>([]);
  const [event, setEvent] = useState<string>("100 Free");
  const [timeInput, setTimeInput] = useState("");
  const [meetName, setMeetName] = useState("");

  useEffect(() => {
    setTimes(loadData().meetTimes);
  }, []);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const seconds = parseSwimTime(timeInput);
    if (seconds === null) return;

    const entry: MeetTime = {
      id: crypto.randomUUID(),
      event,
      timeSeconds: seconds,
      date: new Date().toISOString().slice(0, 10),
      meetName: meetName.trim() || undefined,
      course: "SCY",
    };
    addMeetTime(entry);
    setTimes(loadData().meetTimes);
    setTimeInput("");
    setMeetName("");
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-3xl font-medium text-slate-900">Meet times</h1>
        <p className="mt-2 text-slate-600">
          The scoreboard truth — My Clues look at the week before each meet.
        </p>

        <form onSubmit={handleAdd} className="mt-8 space-y-4 rounded-xl border border-[#e7e2d9] bg-white p-6">
          <label className="block">
            <span className="text-sm font-medium">Event</span>
            <select value={event} onChange={(e) => setEvent(e.target.value)} className="input mt-1">
              {EVENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Time (e.g. 53.15 or 1:52.30)</span>
            <input
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              className="input mt-1"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Meet name (optional)</span>
            <input
              value={meetName}
              onChange={(e) => setMeetName(e.target.value)}
              className="input mt-1"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0f4c5c] py-2.5 font-medium text-white hover:bg-[#0c3e4b]"
          >
            Add time
          </button>
        </form>

        <ul className="mt-8 space-y-3">
          {times.length === 0 ? (
            <li className="text-sm text-slate-500">No times logged yet.</li>
          ) : (
            times.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-lg border border-[#e7e2d9] bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {t.event}
                    {t.isPersonalBest ? (
                      <span className="ml-2 rounded-full bg-[#e8f4f6] px-2 py-0.5 text-xs font-medium text-[#0f4c5c]">
                        PB
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.date}
                    {t.meetName ? ` · ${t.meetName}` : ""}
                    {t.course ? ` · ${t.course}` : ""}
                  </p>
                </div>
                <p className="font-mono text-slate-800">{formatSwimTime(t.timeSeconds)}</p>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}
