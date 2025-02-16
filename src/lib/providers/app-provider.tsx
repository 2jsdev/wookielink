'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import ThemeSettingsProvider from './theme-settings-provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <ThemeSettingsProvider>{children}</ThemeSettingsProvider>
    </SessionProvider>
  );
}
