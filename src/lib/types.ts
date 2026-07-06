export type UserRole = "athlete" | "parent";
export type Sex = "female" | "male";
export type SleepBucket = "rough" | "ok" | "solid";
export type PracticeAttendance = "full" | "partial" | "missed";
export type SeasonType = "club" | "high-school" | "summer" | "break";
export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type PracticeSlot = "am" | "pm" | "both";
export type DominantSide = "left" | "right" | "unknown";

export interface PracticeDay {
  day: DayOfWeek;
  active: boolean;
  slot?: PracticeSlot;
}

export interface PracticeSchedule {
  days: PracticeDay[];
  season: SeasonType;
}

export interface SwimmerProfile {
  firstName: string;
  role: UserRole;
  age: number;
  gradYear?: number;
  sex: Sex;
  primaryEvents: string[];
  stillFiguringOutEvents?: boolean;
  practiceSchedule: PracticeSchedule;
  heightInches: number;
  weightLbs: number;
  wingspanInches: number;
  clubYears?: number;
  swimsHighSchool: boolean;
  teamName?: string;
  dominantSide?: DominantSide;
  wearsDragsuit: boolean;
  techSuit?: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  date: string;
  practiceAttendance: PracticeAttendance;
  sleepBucket: SleepBucket;
  sleepHours?: number;
  soreness: number;
  feltSick?: boolean;
}

export interface WeeklyCheckIn {
  id: string;
  /** ISO date (Monday) for the week this entry belongs to */
  weekStart: string;
  buyIn: number;
  teamDryland: boolean;
  personalGym: boolean;
}

export interface MeetTime {
  id: string;
  event: string;
  timeSeconds: number;
  date: string;
  meetName?: string;
  course?: "SCY";
  isPersonalBest?: boolean;
}

export interface AppData {
  profile: SwimmerProfile | null;
  checkIns: CheckIn[];
  weeklyCheckIns: WeeklyCheckIn[];
  meetTimes: MeetTime[];
}
