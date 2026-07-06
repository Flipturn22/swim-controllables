import { OPTIONAL_SLEEP_HOURS } from "@/data/onboard";

function formatHours(hours: number): string {
  return Number.isInteger(hours) ? `${hours}h` : `${hours}h`;
}

export function OptionalSleepHoursPicker({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (hours: number | undefined) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">Hours of sleep (optional)</p>
      <p className="mt-1 text-xs text-slate-500">Only if you track this — tap closest number</p>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {OPTIONAL_SLEEP_HOURS.map((hours) => {
          const selected = value === hours;
          return (
            <button
              key={hours}
              type="button"
              onClick={() => onChange(selected ? undefined : hours)}
              className={`chip ${selected ? "chip-selected" : ""}`}
              aria-pressed={selected}
            >
              {formatHours(hours)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
