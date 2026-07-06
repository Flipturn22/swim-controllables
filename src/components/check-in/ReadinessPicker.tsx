const READINESS_LEVELS = [
  { value: 1, label: "Flat", hint: "No gas" },
  { value: 2, label: "Low", hint: "Heavy legs" },
  { value: 3, label: "OK", hint: "Normal day" },
  { value: 4, label: "Good", hint: "Felt sharp" },
  { value: 5, label: "Great", hint: "Best day" },
] as const;

export function ReadinessPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (readiness: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">How practice felt</p>
      <p className="mt-1 text-xs text-slate-500">1 = flat · 5 = great</p>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {READINESS_LEVELS.map((level) => {
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
