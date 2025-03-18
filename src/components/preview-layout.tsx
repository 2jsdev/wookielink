'use client';
import NextTopLoader from 'nextjs-toploader';
import ThemeCustomizer from './theme-customizer';
import useThemeSettingsStore from '@/store/theme-settings-store';
import MobilePreview from '@/components/admin/preview/mobile-preview';
import { cn } from '@/lib/utils';
import MobilePreviewDrawer from '@/components/admin/preview/mobile-preview-drawer';
import useMobilePreviewStore from '@/store/mobile-preview-store';

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeSettings = useThemeSettingsStore();
  const { isOpen } = useMobilePreviewStore();

  return (
    <>
      <NextTopLoader
        color="hsl(var(--primary))"
        showSpinner={false}
        height={2}
        shadow="none"
      />
      <div className="flex flex-1 overflow-y-auto scrollbar-hidden">
        <main className="flex-1 p-4 min-w-0">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div
              className={cn('min-h-full mx-auto p-4 w-full', {
                'lg:container lg:pt-10':
                  themeSettings.contentLayout === 'centered',
              })}
            >
              {children}
            </div>
          </div>
        </main>
        <div
          id="mobile-preview-container"
          className="hidden lg:flex lg:basis-1/3 md:basis-1/4 sticky top-0 h-[calc(100vh-60px)] items-center justify-center lg:border-l-2"
        >
          <MobilePreview />
        </div>
      </div>
      <ThemeCustomizer />

      {isOpen && <MobilePreviewDrawer />}
    </>
  );
}
