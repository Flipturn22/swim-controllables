import type { AppData, CheckIn, MeetTime, SwimmerProfile, WeeklyCheckIn } from "@/lib/types";

/** Persistence layer — swap LocalAppStore for sync/API later without touching UI. */
export interface AppStore {
  load(): AppData;
  save(data: AppData): void;
  saveProfile(profile: SwimmerProfile): void;
  addCheckIn(checkIn: CheckIn): void;
  addWeeklyCheckIn(entry: WeeklyCheckIn): void;
  addMeetTime(meetTime: MeetTime): void;
  clearAll(): void;
}
