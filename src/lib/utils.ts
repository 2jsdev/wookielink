import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as d3 from 'd3-color';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatarFallback(string: string) {
  const names = string.split(' ').filter((name: string) => name);
  const mapped = names.map((name: string) => name.charAt(0).toUpperCase());

  return mapped.join('');
}

export function getHSLValue(hex: string): string {
  return d3.color(hex)!.formatHsl().slice(4, -1).replaceAll(',', '');
}

export function generateLighterColor(hexColor: string) {
  if (!hexColor) return '#ffffff';
  let r = parseInt(hexColor.substring(1, 3), 16);
  let g = parseInt(hexColor.substring(3, 5), 16);
  let b = parseInt(hexColor.substring(5, 7), 16);

  r = Math.min(255, r + 50);
  g = Math.min(255, g + 50);
  b = Math.min(255, b + 50);

  return `rgb(${r}, ${g}, ${b})`;
}

export function generateLighterHexColor(hexColor: string): string {
  if (!hexColor || !/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) return '#ffffff';

  let r = parseInt(hexColor.substring(1, 3), 16);
  let g = parseInt(hexColor.substring(3, 5), 16);
  let b = parseInt(hexColor.substring(5, 7), 16);

  r = Math.min(255, r + 50);
  g = Math.min(255, g + 50);
  b = Math.min(255, b + 50);

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}
