// Base stats top out around 255 in practice; we cap the bar at 200 for readable proportions.
const MAX_STAT = 200;

export function getStatWidthClass(value: number): string {
  const percent = Math.max(0, Math.min(100, Math.round((value / MAX_STAT) * 100)));
  const rounded = Math.round(percent / 5) * 5;
  return `w${rounded}`;
}
