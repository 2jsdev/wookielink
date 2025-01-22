'use client';

import { useSelector } from 'react-redux';
import NextTopLoader from 'nextjs-toploader';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import ThemeCustomizer from './theme-customizer';
import { selectInitialThemeSettings } from '@/lib/store/slices/themeSettingsSlice';
import { cn } from '@/lib/utils';
import MobilePreview from '@/components/admin/MobilePreview';

export default function PreviewLayout({
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
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <Header />
          <div className="flex flex-1 overflow-y-auto scrollbar-hidden">
            <main className="flex-1 p-4 min-w-0">
              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
                <div
                  className={cn('min-h-full mx-auto p-4 w-full', {
                    'lg:container lg:pt-10': contentLayout === 'centered',
                  })}
                >
                  {children}
                </div>
              </div>
            </main>
            <div className="hidden lg:flex lg:basis-1/3 md:basis-1/4 sticky top-0 h-[calc(100vh-60px)] items-center justify-center lg:border-l-2">
              <MobilePreview />
            </div>
          </div>
        </div>
      </div>
      <ThemeCustomizer />
    </>
  );
}
