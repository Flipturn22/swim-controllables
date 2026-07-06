import { ATTENDANCE_OPTIONS } from "@/data/onboard";
import type { PracticeAttendance } from "@/lib/types";

export function AttendancePicker({
  value,
  onChange,
}: {
  value: PracticeAttendance;
  onChange: (attendance: PracticeAttendance) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">Today&apos;s practice</p>
      <p className="mt-1 text-xs text-slate-500">How did you show up for your team schedule?</p>
      <div className="mt-3 space-y-2">
        {ATTENDANCE_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex w-full flex-col rounded-xl border px-4 py-3.5 text-left transition active:scale-[0.99] ${
                selected
                  ? "border-[#0f4c5c] bg-[#e8f4f6]"
                  : "border-[#d9d2c7] bg-white hover:border-[#0f4c5c]/30"
              }`}
            >
              <span className="font-medium text-slate-900">{option.label}</span>
              <span className="mt-0.5 text-sm text-slate-600">{option.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
