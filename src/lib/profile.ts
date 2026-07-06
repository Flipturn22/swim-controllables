import type {
  DominantSide,
  PracticeSchedule,
  Sex,
  SwimmerProfile,
  UserRole,
} from "@/lib/types";
import { defaultPracticeSchedule } from "@/lib/schedule";

export function suggestedGradYear(age: number): number {
  const currentYear = new Date().getFullYear();
  const typicalGradAge = 18;
  return currentYear + Math.max(0, typicalGradAge - age);
}

export function heightToTotalInches(feet: string, inches: string): number | null {
  if (!feet.trim() || !inches.trim()) return null;
  const ft = Number(feet);
  const inch = Number(inches);
  if (!Number.isFinite(ft) || !Number.isFinite(inch)) return null;
  if (!Number.isInteger(ft) || !Number.isInteger(inch)) return null;
  if (inch < 0 || inch > 11) return null;
  return ft * 12 + inch;
}

export function totalInchesToHeight(totalInches: number): { feet: number; inches: number } {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

export function formatHeight(totalInches: number): string {
  const { feet, inches } = totalInchesToHeight(totalInches);
  return `${feet}' ${inches}"`;
}

function currentYear(): number {
  return new Date().getFullYear();
}

export interface ProfileFormState {
  firstName: string;
  role: UserRole;
  age: string;
  gradYear: string;
  sex: Sex | "";
  stillFiguringOutEvents: boolean;
  events: string[];
  practiceSchedule: PracticeSchedule;
  heightFeet: string;
  heightInches: string;
  weightLbs: string;
  wingspanFeet: string;
  wingspanInches: string;
  clubYears: string;
  swimsHighSchool: boolean;
  teamName: string;
  dominantSide: DominantSide;
  wearsDragsuit: boolean;
  techSuit: string;
}

const TECH_SUIT_DEFAULT = "None / practice suit only";

export function defaultProfileForm(): ProfileFormState {
  const age = "15";
  return {
    firstName: "",
    role: "athlete",
    age,
    gradYear: String(suggestedGradYear(Number(age))),
    sex: "",
    stillFiguringOutEvents: false,
    events: [],
    practiceSchedule: defaultPracticeSchedule(),
    heightFeet: "",
    heightInches: "",
    weightLbs: "",
    wingspanFeet: "",
    wingspanInches: "",
    clubYears: "3",
    swimsHighSchool: true,
    teamName: "",
    dominantSide: "unknown",
    wearsDragsuit: false,
    techSuit: TECH_SUIT_DEFAULT,
  };
}

export function validateHeightFields(feet: string, inches: string): string | null {
  if (!feet.trim() || !inches.trim()) return "Enter height in feet and inches.";
  const ft = Number(feet);
  const inch = Number(inches);
  if (!Number.isInteger(ft) || ft < 3 || ft > 7) {
    return "Feet should be a whole number, usually 4–7.";
  }
  if (!Number.isInteger(inch) || inch < 0 || inch > 11) {
    return "Inches should be 0–11.";
  }
  const total = ft * 12 + inch;
  if (total < 40 || total > 90) {
    return "That height looks off — double-check feet and inches.";
  }
  return null;
}

export function validateProfileForm(form: ProfileFormState): string | null {
  if (!form.firstName.trim()) return "Enter a first name.";

  const age = Number(form.age);
  if (!Number.isFinite(age) || age < 8 || age > 22) {
    return "Age should be between 8 and 22.";
  }

  const grad = Number(form.gradYear);
  if (!Number.isFinite(grad) || grad < currentYear() - 1 || grad > currentYear() + 10) {
    return "Enter a realistic graduation year.";
  }

  if (!form.sex) return "Select sex.";

  if (!form.stillFiguringOutEvents && form.events.length === 0) {
    return "Pick at least one event — or mark still figuring it out.";
  }

  const activeDays = form.practiceSchedule.days.filter((d) => d.active);
  if (activeDays.length === 0) {
    return "Select at least one practice day for your team schedule.";
  }

  const heightError = validateHeightFields(form.heightFeet, form.heightInches);
  if (heightError) return heightError;

  const wingspanError = validateHeightFields(form.wingspanFeet, form.wingspanInches);
  if (wingspanError) return "Enter wingspan in feet and inches.";

  if (!form.weightLbs.trim()) return "Enter weight in pounds.";
  const weight = Number(form.weightLbs);
  if (!Number.isFinite(weight) || weight < 50 || weight > 350) {
    return "Enter a realistic weight in pounds.";
  }

  return null;
}

export function validateCurrentStep(step: SignupStep, form: ProfileFormState): string | null {
  switch (step) {
    case "role":
      return null;
    case "name":
      if (!form.firstName.trim()) return "Enter a first name.";
      return null;
    case "basics": {
      const age = Number(form.age);
      if (!Number.isFinite(age) || age < 8 || age > 22) {
        return "Age should be between 8 and 22.";
      }
      const grad = Number(form.gradYear);
      if (!Number.isFinite(grad) || grad < currentYear() - 1 || grad > currentYear() + 10) {
        return "Enter a realistic graduation year.";
      }
      if (!form.sex) return "Select sex.";
      return null;
    }
    case "schedule": {
      if (form.practiceSchedule.days.filter((d) => d.active).length === 0) {
        return "Tap the days your team usually has pool practice.";
      }
      return null;
    }
    case "events":
      if (!form.stillFiguringOutEvents && form.events.length === 0) {
        return "Pick at least one event — or mark still figuring it out.";
      }
      return null;
    case "body": {
      const heightError = validateHeightFields(form.heightFeet, form.heightInches);
      if (heightError) return heightError;
      const wingspanError = validateHeightFields(form.wingspanFeet, form.wingspanInches);
      if (wingspanError) return "Enter wingspan — helps with body and event orientation.";
      if (!form.weightLbs.trim()) return "Enter weight in pounds.";
      const weight = Number(form.weightLbs);
      if (!Number.isFinite(weight) || weight < 50 || weight > 350) {
        return "Enter a realistic weight in pounds.";
      }
      return null;
    }
    default:
      return null;
  }
}

export type SignupStep = "role" | "name" | "basics" | "schedule" | "events" | "body" | "team";

export const SIGNUP_STEPS: SignupStep[] = [
  "role",
  "name",
  "basics",
  "schedule",
  "events",
  "body",
  "team",
];

export function formToProfile(form: ProfileFormState): SwimmerProfile {
  const totalHeight = heightToTotalInches(form.heightFeet, form.heightInches);
  const totalWingspan = heightToTotalInches(form.wingspanFeet, form.wingspanInches);
  if (totalHeight === null || totalWingspan === null) {
    throw new Error("Invalid body measurements");
  }

  return {
    firstName: form.firstName.trim(),
    role: form.role,
    age: Number(form.age),
    gradYear: Number(form.gradYear),
    sex: form.sex as Sex,
    primaryEvents: form.events,
    stillFiguringOutEvents: form.stillFiguringOutEvents || undefined,
    practiceSchedule: form.practiceSchedule,
    heightInches: totalHeight,
    weightLbs: Number(form.weightLbs),
    wingspanInches: totalWingspan,
    clubYears: Number(form.clubYears),
    swimsHighSchool: form.swimsHighSchool,
    teamName: form.teamName.trim() || undefined,
    dominantSide: form.dominantSide === "unknown" ? undefined : form.dominantSide,
    wearsDragsuit: form.wearsDragsuit,
    techSuit: form.techSuit || undefined,
    createdAt: new Date().toISOString(),
  };
}

export function profileLabel(
  role: UserRole,
  field: "name" | "age" | "grad" | "height" | "weight" | "wingspan"
): string {
  const prefix = role === "parent" ? "Swimmer's" : "Your";
  if (field === "name") return role === "parent" ? "Swimmer's first name" : "First name";
  if (field === "age") return `${prefix} age`;
  if (field === "grad") return `${prefix} grad year`;
  if (field === "height") return `${prefix} height`;
  if (field === "wingspan") return `${prefix} wingspan (arm span)`;
  return `${prefix} weight`;
}
