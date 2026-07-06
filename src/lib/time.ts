export function parseSwimTime(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.includes(":")) {
    const parts = trimmed.split(":");
    if (parts.length !== 2) return null;
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null;
    return minutes * 60 + seconds;
  }

  const seconds = Number(trimmed);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  return seconds;
}

export function formatSwimTime(seconds: number): string {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds - minutes * 60;
    return `${minutes}:${remainder.toFixed(2).padStart(5, "0")}`;
  }
  return seconds.toFixed(2);
}
