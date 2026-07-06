import { LocalAppStore } from "./local-store";
import type { AppStore } from "./types";
import type { AppData, CheckIn, MeetTime, SwimmerProfile, WeeklyCheckIn } from "@/lib/types";

export type { AppStore } from "./types";
export { LocalAppStore } from "./local-store";

let store: AppStore = new LocalAppStore();

/** Replace the active store (e.g. API-backed sync in a future phase). */
export function setAppStore(next: AppStore): void {
  store = next;
}

export function getAppStore(): AppStore {
  return store;
}

export function loadData(): AppData {
  return store.load();
}

export function saveData(data: AppData): void {
  store.save(data);
}

export function saveProfile(profile: SwimmerProfile): void {
  store.saveProfile(profile);
}

export function addCheckIn(checkIn: CheckIn): void {
  store.addCheckIn(checkIn);
}

export function addWeeklyCheckIn(entry: WeeklyCheckIn): void {
  store.addWeeklyCheckIn(entry);
}

export function addMeetTime(meetTime: MeetTime): void {
  store.addMeetTime(meetTime);
}

export function clearAllData(): void {
  store.clearAll();
}
