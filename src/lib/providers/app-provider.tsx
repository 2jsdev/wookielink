'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import ThemeSettingsProvider from './theme-settings-provider';
import store, { persistor } from '@/lib/store';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <ThemeSettingsProvider>{children}</ThemeSettingsProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
