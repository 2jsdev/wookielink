'use client';

import NextTopLoader from 'nextjs-toploader';
import ThemeCustomizer from './theme-customizer';
import useThemeSettingsStore from '@/store/theme-settings-store';
import { cn } from '@/lib/utils';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeSettings = useThemeSettingsStore();

  return (
    <>
      <NextTopLoader
        color="hsl(var(--primary))"
        showSpinner={false}
        height={2}
        shadow="none"
      />
      <div className="flex flex-1 overflow-y-auto scrollbar-hidden">
        <main className="flex-1 p-4">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={cn('min-h-full mx-auto p-4', {
                'lg:container lg:pt-10':
                  themeSettings.contentLayout === 'centered',
              })}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
      <ThemeCustomizer />
    </>
  );
}
