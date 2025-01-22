'use client';

import { useSelector } from 'react-redux';
import NextTopLoader from 'nextjs-toploader';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import ThemeCustomizer from './theme-customizer';
import { selectInitialThemeSettings } from '@/lib/store/slices/themeSettingsSlice';
import { cn } from '@/lib/utils';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { contentLayout } = useSelector(selectInitialThemeSettings);

  return (
    <>
      <NextTopLoader
        color="hsl(var(--primary))"
        showSpinner={false}
        height={2}
        shadow="none"
      />
      <div className="flex h-screen bg-base-200">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 p-4">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                  className={cn('min-h-full mx-auto p-4', {
                    'lg:container lg:pt-10': contentLayout === 'centered',
                  })}
                >
                  {children}
                </div>
              </div>
            </main>
          </div>
          <ThemeCustomizer />
        </div>
      </div>
    </>
  );
}
