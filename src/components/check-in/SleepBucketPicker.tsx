import { SLEEP_BUCKET_OPTIONS } from "@/data/onboard";
import type { SleepBucket } from "@/lib/types";

export function SleepBucketPicker({
  value,
  onChange,
}: {
  value: SleepBucket;
  onChange: (bucket: SleepBucket) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">How did you sleep last night?</p>
      <p className="mt-1 text-xs text-slate-500">Your pattern, not a grade — one tap.</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {SLEEP_BUCKET_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition active:scale-[0.98] ${
                selected
                  ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                  : "border-[#d9d2c7] bg-white text-slate-700 hover:border-[#0f4c5c]/40"
              }`}
              aria-pressed={selected}
            >
              <span className="text-sm font-medium">{option.label}</span>
              <span className="mt-1 text-[10px] leading-tight text-slate-500 sm:text-xs">
                {option.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
