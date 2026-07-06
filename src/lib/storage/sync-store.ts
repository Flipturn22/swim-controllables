import { pushAppDataToCloud } from "@/lib/supabase/sync";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { AppData, CheckIn, MeetTime, SwimmerProfile, WeeklyCheckIn } from "@/lib/types";
import { LocalAppStore } from "./local-store";

/** Local-first store that pushes to Supabase after each save when signed in. */
export class SyncAppStore extends LocalAppStore {
  private syncQueued = false;

  private queueCloudSync(): void {
    if (!isSupabaseConfigured() || typeof window === "undefined") return;
    if (this.syncQueued) return;
    this.syncQueued = true;
    window.setTimeout(() => {
      this.syncQueued = false;
      void pushAppDataToCloud(this.load());
    }, 300);
  }

  save(data: AppData): void {
    super.save(data);
    this.queueCloudSync();
  }

  saveProfile(profile: SwimmerProfile): void {
    super.saveProfile(profile);
    this.queueCloudSync();
  }

  addCheckIn(checkIn: CheckIn): void {
    super.addCheckIn(checkIn);
    this.queueCloudSync();
  }

  addWeeklyCheckIn(entry: WeeklyCheckIn): void {
    super.addWeeklyCheckIn(entry);
    this.queueCloudSync();
  }

  addMeetTime(meetTime: MeetTime): void {
    super.addMeetTime(meetTime);
    this.queueCloudSync();
  }
}
