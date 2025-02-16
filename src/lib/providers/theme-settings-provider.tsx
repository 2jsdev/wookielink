'use client';

import React, { useEffect } from 'react';
import useThemeSettingsStore, { themeColors } from '@/store/themeSettingsStore';

export default function ThemeSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeColor, fontFamily, roundedCorner, direction } =
    useThemeSettingsStore();

  useEffect(() => {
    if (themeColor === 'default') {
      document.documentElement.style.removeProperty('--primary');
    } else {
      const colorCode = themeColors[themeColor];
      if (colorCode) {
        document.documentElement.style.setProperty('--primary', colorCode);
      }
    }
  }, [themeColor]);

  useEffect(() => {
    if (fontFamily)
      document.body.style.setProperty(
        'font-family',
        `var(--font-${fontFamily})`
      );
  }, [fontFamily]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--radius',
      roundedCorner + 'rem'
    );
  }, [roundedCorner]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  return <>{children}</>;
}
