export const DEFAULT_PRIMARY = '#1E3A8A';
export const DEFAULT_ACCENT = '#FACC15';
export const DEFAULT_TEXT = '#0f172a';

export function normalizeHex(color, fallback) {
  if (typeof color !== 'string') return fallback;
  const value = color.trim();
  if (!value) return fallback;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    if (value.length === 4) {
      return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    }
    return value;
  }
  return fallback;
}

export function withAlpha(color, alpha, fallback) {
  const hex = normalizeHex(color, fallback).replace('#', '');
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}
