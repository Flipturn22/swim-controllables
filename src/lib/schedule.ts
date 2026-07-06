import type { DayOfWeek, PracticeDay, PracticeSchedule, WeeklyCheckIn } from "@/lib/types";

export const DAYS_OF_WEEK: { id: DayOfWeek; label: string; short: string }[] = [
  { id: "mon", label: "Monday", short: "M" },
  { id: "tue", label: "Tuesday", short: "T" },
  { id: "wed", label: "Wednesday", short: "W" },
  { id: "thu", label: "Thursday", short: "T" },
  { id: "fri", label: "Friday", short: "F" },
  { id: "sat", label: "Saturday", short: "Sa" },
  { id: "sun", label: "Sunday", short: "Su" },
];

export function defaultPracticeSchedule(): PracticeSchedule {
  return {
    season: "club",
    days: DAYS_OF_WEEK.map((d) => ({
      day: d.id,
      active: d.id !== "sun",
      slot: "pm" as const,
    })),
  };
}

export function dayOfWeekFromDate(isoDate: string): DayOfWeek {
  const day = new Date(`${isoDate}T12:00:00`).getDay();
  const map: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return map[day] ?? "mon";
}

export function isPracticeDay(schedule: PracticeSchedule, isoDate: string): boolean {
  const dow = dayOfWeekFromDate(isoDate);
  return schedule.days.some((d) => d.day === dow && d.active);
}

export function activePracticeDays(schedule: PracticeSchedule): PracticeDay[] {
  return schedule.days.filter((d) => d.active);
}

export function formatScheduleSummary(schedule: PracticeSchedule): string {
  const active = activePracticeDays(schedule);
  if (active.length === 0) return "No practice days set";
  const labels = active.map((d) => DAYS_OF_WEEK.find((x) => x.id === d.day)?.short ?? d.day);
  return `${labels.join(" ")} · ${seasonLabel(schedule.season)}`;
}

export function seasonLabel(season: PracticeSchedule["season"]): string {
  switch (season) {
    case "club":
      return "Club season";
    case "high-school":
      return "High school season";
    case "summer":
      return "Summer";
    case "break":
      return "Break / off-season";
  }
}

export function mondayOfWeek(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export function hasWeeklyCheckInForWeek(weeklyCheckIns: WeeklyCheckIn[], isoDate: string): boolean {
  const weekStart = mondayOfWeek(isoDate);
  return weeklyCheckIns.some((w) => w.weekStart === weekStart);
}
