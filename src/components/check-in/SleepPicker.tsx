const SLEEP_OPTIONS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] as const;

function formatHours(hours: number): string {
  return Number.isInteger(hours) ? `${hours}h` : `${hours}h`;
}

export function SleepPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (hours: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">Hours of sleep last night</p>
      <p className="mt-1 text-xs text-slate-500">Tap the closest number</p>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {SLEEP_OPTIONS.map((hours) => {
          const selected = value === hours;
          return (
            <button
              key={hours}
              type="button"
              onClick={() => onChange(hours)}
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
