import type { AppData, CheckIn, MeetTime, SwimmerProfile, WeeklyCheckIn } from "@/lib/types";
import type { SleepBucket } from "@/lib/types";
import { withPersonalBestFlags } from "@/lib/meets";
import type { AppStore } from "./types";

const STORAGE_KEY = "off-deck-data";

const EMPTY: AppData = {
  profile: null,
  checkIns: [],
  weeklyCheckIns: [],
  meetTimes: [],
};

function hoursToSleepBucket(hours: number): SleepBucket {
  if (hours < 6.5) return "rough";
  if (hours < 8) return "ok";
  return "solid";
}

function migrateCheckIn(raw: Record<string, unknown>): CheckIn | null {
  if (raw.sleepBucket && raw.practiceAttendance) {
    return raw as unknown as CheckIn;
  }

  const legacy = raw as {
    id: string;
    date: string;
    sleepHours?: number;
    readiness?: number;
    note?: string;
  };

  if (!legacy.id || !legacy.date) return null;

  return {
    id: legacy.id,
    date: legacy.date,
    practiceAttendance: "full",
    sleepBucket: hoursToSleepBucket(legacy.sleepHours ?? 7),
    sleepHours: legacy.sleepHours,
    soreness: legacy.readiness ?? 3,
  };
}

function isCompleteProfile(profile: SwimmerProfile): boolean {
  return (
    Boolean(profile.sex) &&
    Boolean(profile.practiceSchedule?.days?.some((d) => d.active)) &&
    typeof profile.heightInches === "number" &&
    typeof profile.weightLbs === "number" &&
    typeof profile.wingspanInches === "number" &&
    typeof profile.swimsHighSchool === "boolean"
  );
}

export class LocalAppStore implements AppStore {
  load(): AppData {
    if (typeof window === "undefined") return EMPTY;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    try {
      const parsed = JSON.parse(raw) as Partial<AppData> & { checkIns?: Record<string, unknown>[] };
      const checkIns = (parsed.checkIns ?? [])
        .map((c) => migrateCheckIn(c as unknown as Record<string, unknown>))
        .filter((c): c is CheckIn => c !== null);
      const weeklyCheckIns = parsed.weeklyCheckIns ?? [];
      const meetTimes = withPersonalBestFlags(parsed.meetTimes ?? []);

      let profile = parsed.profile ?? null;
      if (profile && !isCompleteProfile(profile)) {
        profile = null;
      }

      return { profile, checkIns, weeklyCheckIns, meetTimes };
    } catch {
      return EMPTY;
    }
  }

  save(data: AppData): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  saveProfile(profile: SwimmerProfile): void {
    const data = this.load();
    this.save({ ...data, profile });
  }

  addCheckIn(checkIn: CheckIn): void {
    const data = this.load();
    const filtered = data.checkIns.filter((c) => c.date !== checkIn.date);
    this.save({ ...data, checkIns: [checkIn, ...filtered] });
  }

  addWeeklyCheckIn(entry: WeeklyCheckIn): void {
    const data = this.load();
    const filtered = data.weeklyCheckIns.filter((w) => w.weekStart !== entry.weekStart);
    this.save({ ...data, weeklyCheckIns: [entry, ...filtered] });
  }

  addMeetTime(meetTime: MeetTime): void {
    const data = this.load();
    const next = withPersonalBestFlags([meetTime, ...data.meetTimes]);
    this.save({ ...data, meetTimes: next });
  }

  clearAll(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  }
}
