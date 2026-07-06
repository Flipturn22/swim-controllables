import { DAYS_OF_WEEK, seasonLabel } from "@/lib/schedule";
import type { PracticeSchedule, PracticeSlot, SeasonType } from "@/lib/types";
import { SEASON_OPTIONS } from "@/data/onboard";

export function ScheduleTemplatePicker({
  schedule,
  onChange,
}: {
  schedule: PracticeSchedule;
  onChange: (schedule: PracticeSchedule) => void;
}) {
  function toggleDay(dayId: (typeof DAYS_OF_WEEK)[number]["id"]) {
    onChange({
      ...schedule,
      days: schedule.days.map((d) =>
        d.day === dayId ? { ...d, active: !d.active, slot: d.active ? undefined : d.slot ?? "pm" } : d
      ),
    });
  }

  function setSlot(dayId: (typeof DAYS_OF_WEEK)[number]["id"], slot: PracticeSlot) {
    onChange({
      ...schedule,
      days: schedule.days.map((d) => (d.day === dayId ? { ...d, slot } : d)),
    });
  }

  function setSeason(season: SeasonType) {
    onChange({ ...schedule, season });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-800">Which days does your team usually swim?</p>
        <p className="mt-1 text-xs text-slate-500">
          Tap each day — this drives attendance, not your coach&apos;s sets.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map(({ id, label, short }) => {
            const day = schedule.days.find((d) => d.day === id);
            const active = day?.active ?? false;
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleDay(id)}
                className={`min-h-11 min-w-[3rem] rounded-xl border px-3 py-2 text-sm font-medium transition active:scale-[0.98] ${
                  active
                    ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                    : "border-[#d9d2c7] bg-white text-slate-600"
                }`}
                aria-pressed={active}
                title={label}
              >
                {short}
              </button>
            );
          })}
        </div>
      </div>

      {schedule.days.some((d) => d.active) && (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Time of day (optional)
          </p>
          {schedule.days
            .filter((d) => d.active)
            .map((d) => {
              const label = DAYS_OF_WEEK.find((x) => x.id === d.day)?.label ?? d.day;
              return (
                <div key={d.day} className="flex flex-wrap items-center gap-2">
                  <span className="w-24 text-sm text-slate-700">{label}</span>
                  {(["am", "pm", "both"] as PracticeSlot[]).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSlot(d.day, slot)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${
                        d.slot === slot
                          ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                          : "border-[#d9d2c7] bg-white text-slate-600"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              );
            })}
        </div>
      )}

      <div>
        <p className="text-sm font-medium text-slate-800">Season right now</p>
        <p className="mt-1 text-xs text-slate-500">Selected: {seasonLabel(schedule.season)}</p>
        <div className="mt-2 space-y-2">
          {SEASON_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSeason(option.value)}
              className={`flex w-full flex-col rounded-xl border px-4 py-3 text-left transition active:scale-[0.99] ${
                schedule.season === option.value
                  ? "border-[#0f4c5c] bg-[#e8f4f6]"
                  : "border-[#d9d2c7] bg-white hover:border-[#0f4c5c]/30"
              }`}
            >
              <span className="font-medium text-slate-900">{option.label}</span>
              <span className="mt-0.5 text-sm text-slate-600">{option.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
