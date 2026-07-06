import type {
  DominantSide,
  PracticeSchedule,
  SeasonType,
  Sex,
} from "@/lib/types";
import { defaultPracticeSchedule, formatScheduleSummary } from "@/lib/schedule";

export { formatScheduleSummary };

export const MAX_PRIMARY_EVENTS = 4;

export const SEX_OPTIONS: { value: Sex; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

export const SEASON_OPTIONS: { value: SeasonType; label: string; hint: string }[] = [
  { value: "club", label: "Club season", hint: "Year-round or fall–spring club team" },
  { value: "high-school", label: "High school season", hint: "HS practices on top of or instead of club" },
  { value: "summer", label: "Summer", hint: "Summer league or short-course focus" },
  { value: "break", label: "Break / off-season", hint: "Lighter schedule or time away" },
];

export const CLUB_YEARS_OPTIONS = [
  { value: 0, label: "First year on club team" },
  { value: 1, label: "1–2 years" },
  { value: 3, label: "3–5 years" },
  { value: 6, label: "6+ years" },
];

export const DOMINANT_SIDE_OPTIONS: { value: DominantSide; label: string }[] = [
  { value: "unknown", label: "Not sure / skip" },
  { value: "right", label: "Right-handed / right-foot takeoff" },
  { value: "left", label: "Left-handed / left-foot takeoff" },
];

export const TECH_SUIT_OPTIONS = [
  "None / practice suit only",
  "Arena Carbon Core",
  "Arena Powerskin ST Next",
  "Arena Powerskin Carbon Glide",
  "Speedo LZR Pure Intent",
  "Speedo LZR Pure Valor",
  "Speedo Fastskin LZR R-X",
  "TYR Venzo",
  "TYR Avictor",
  "Mizuno GX Sonic",
  "Finis Fuse",
  "Other tech suit",
] as const;

export const SLEEP_BUCKET_OPTIONS = [
  { value: "rough" as const, label: "Rough", hint: "Restless, short, or off night" },
  { value: "ok" as const, label: "OK", hint: "Got through the night" },
  { value: "solid" as const, label: "Solid", hint: "Rested enough to train" },
];

export const ATTENDANCE_OPTIONS = [
  { value: "full" as const, label: "Full practice", hint: "There for the whole session" },
  { value: "partial" as const, label: "Partial", hint: "Left early, came late, or modified" },
  { value: "missed" as const, label: "Missed", hint: "Did not make this one" },
];

export const OPTIONAL_SLEEP_HOURS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] as const;

export const BUY_IN_LABELS = [
  "Not connected",
  "A little",
  "Somewhat",
  "Mostly",
  "Fully locked in",
];

export function defaultPracticeScheduleTemplate(): PracticeSchedule {
  return defaultPracticeSchedule();
}
