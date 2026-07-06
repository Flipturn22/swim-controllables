import type { MeetTime } from "@/lib/types";

/** Recompute PB flags for all times in an event after a new entry. */
export function withPersonalBestFlags(allTimes: MeetTime[]): MeetTime[] {
  const bestByEvent = new Map<string, number>();

  for (const t of allTimes) {
    const prev = bestByEvent.get(t.event);
    if (prev === undefined || t.timeSeconds < prev) {
      bestByEvent.set(t.event, t.timeSeconds);
    }
  }

  return allTimes.map((t) => ({
    ...t,
    course: t.course ?? "SCY",
    isPersonalBest: t.timeSeconds === bestByEvent.get(t.event),
  }));
}

export function seasonBestForEvent(times: MeetTime[], event: string): number | null {
  const eventTimes = times.filter((t) => t.event === event);
  if (eventTimes.length === 0) return null;
  return Math.min(...eventTimes.map((t) => t.timeSeconds));
}
