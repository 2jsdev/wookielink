import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as d3 from 'd3-color';
import { UAParser } from 'ua-parser-js';

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

export function generateLighterColor(
  hexColor: string,
  intensity: number = 100
) {
  if (!hexColor) return '#ffffff';

  let r = parseInt(hexColor.substring(1, 3), 16);
  let g = parseInt(hexColor.substring(3, 5), 16);
  let b = parseInt(hexColor.substring(5, 7), 16);

  r = Math.min(255, r + intensity * 0.8);
  g = Math.min(255, g + intensity * 0.5);
  b = Math.min(255, b + intensity * 1.2);

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
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

export const getUserDeviceData = async () => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json').then(
      (res) => res.json()
    );

    const parser = new UAParser(navigator.userAgent);
    const browserInfo = parser.getBrowser();
    const osInfo = parser.getOS();

    return {
      ip: ipResponse.ip,
      userAgent: navigator.userAgent,
      os: osInfo.name || 'Unknown',
      browser: browserInfo.name || 'Unknown',
      screen: `${window.innerWidth}x${window.innerHeight}`,
    };
  } catch (error) {
    console.error('Error fetching user device data:', error);
    return null;
  }
};
