import type { AppData } from "@/lib/types";
import { getSupabaseClient } from "./client";

export type SyncResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function pushAppDataToCloud(data: AppData): Promise<SyncResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured on this deployment." };
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Sign in on the Sync page first." };
  }

  if (data.profile) {
    const { error } = await supabase.from("swimmer_profiles").upsert({
      user_id: userId,
      profile: data.profile,
      updated_at: new Date().toISOString(),
    });
    if (error) return { ok: false, message: error.message };
  }

  if (data.checkIns.length > 0) {
    const rows = data.checkIns.map((c) => ({
      id: c.id,
      user_id: userId,
      date: c.date,
      practice_attendance: c.practiceAttendance,
      sleep_bucket: c.sleepBucket,
      sleep_hours: c.sleepHours ?? null,
      soreness: c.soreness,
      felt_sick: c.feltSick ?? null,
    }));
    const { error } = await supabase.from("check_ins").upsert(rows);
    if (error) return { ok: false, message: error.message };
  }

  if (data.weeklyCheckIns.length > 0) {
    const rows = data.weeklyCheckIns.map((w) => ({
      id: w.id,
      user_id: userId,
      week_start: w.weekStart,
      buy_in: w.buyIn,
      team_dryland: w.teamDryland,
      personal_gym: w.personalGym,
    }));
    const { error } = await supabase.from("weekly_check_ins").upsert(rows);
    if (error) return { ok: false, message: error.message };
  }

  if (data.meetTimes.length > 0) {
    const rows = data.meetTimes.map((m) => ({
      id: m.id,
      user_id: userId,
      event: m.event,
      time_seconds: m.timeSeconds,
      date: m.date,
      meet_name: m.meetName ?? null,
      course: m.course ?? null,
      is_personal_best: m.isPersonalBest ?? null,
    }));
    const { error } = await supabase.from("meet_times").upsert(rows);
    if (error) return { ok: false, message: error.message };
  }

  return {
    ok: true,
    message: `Synced ${data.checkIns.length} check-ins, ${data.weeklyCheckIns.length} weekly, ${data.meetTimes.length} meets.`,
  };
}
