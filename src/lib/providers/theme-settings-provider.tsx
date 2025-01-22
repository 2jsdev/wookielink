'use client';

import {
  selectInitialThemeSettings,
  themeColors,
} from '@/lib/store/slices/themeSettingsSlice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeColor, fontFamily, roundedCorner, direction } = useSelector(
    selectInitialThemeSettings
  );

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
