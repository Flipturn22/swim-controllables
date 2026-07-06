const SORENESS_LEVELS = [
  { value: 1, label: "Fresh", hint: "Feeling good" },
  { value: 2, label: "Mild", hint: "A little tight" },
  { value: 3, label: "Moderate", hint: "Normal soreness" },
  { value: 4, label: "Sore", hint: "Pretty beat up" },
  { value: 5, label: "Very sore", hint: "Needs recovery" },
] as const;

export function SorenessPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (soreness: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">Soreness right now</p>
      <p className="mt-1 text-xs text-slate-500">1 = fresh · 5 = very sore</p>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {SORENESS_LEVELS.map((level) => {
          const selected = value === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border px-1 py-2 text-center transition active:scale-[0.98] ${
                selected
                  ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                  : "border-[#d9d2c7] bg-white text-slate-700 hover:border-[#0f4c5c]/40"
              }`}
              aria-pressed={selected}
            >
              <span className="text-lg font-medium leading-none">{level.value}</span>
              <span className="mt-1 text-[10px] font-medium leading-tight sm:text-xs">
                {level.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
