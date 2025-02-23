'use client';

import useThemeStore from '@/store/theme-store';
import BackgroundCard from '@/components/custom/Customizer/BackgroundCustomizer/BackgroundCard';
import { Card } from '@/components/ui/card';

export default function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Themes</h1>
      <div className="space-y-4">
        <Card className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 p-5">
          <BackgroundCard
            selected={theme?.id === 'custom'}
            onClick={() => {
              setTheme({
                id: 'custom',
                name: 'Custom',
                premium: false,
                background: {
                  type: 'COLOR',
                  style: 'FLAT',
                  color: '#f3f4f6',
                },
                buttonStyle: {
                  type: 'FILL',
                  backgroundColor: '#f3f4f6',
                  shadowColor: '#f3f4f6',
                  textColor: '#000000',
                },
                fontStyle: {
                  fontFamily: 'inter',
                  color: '#000000',
                },
              });
            }}
            label="Custom"
            isPro={false}
          >
            <span className="w-full h-full flex items-center justify-center overflow-hidden rounded-sm border border-sand">
              <h4 className="text-lg mx-2">CREATE YOUR OWN</h4>
            </span>
          </BackgroundCard>

          {/* {themes.map((item) => (
            <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
              <Card
                key={item.id}
                className={cn(
                  'flex flex-col items-center aspect-[9/16] w-20 md:w-32 rounded-lg overflow-hidden border-2 transition-all cursor-pointer hover:border-primary/50',
                  { 'border-primary': item.id === theme.id }
                )}
                onClick={() => setTheme(item)}
              >
                <div
                  className={cn(
                    'w-full h-full rounded-lg shadow-lg flex flex-col justify-center items-center',
                    item.type === 'flat' && item.background,
                    item.type === 'gradient' &&
                    `${item.gradientDirection} ${item.backgroundColor}`,
                    item.type === 'image' ||
                    (item.type === 'video' &&
                      `${item.backgroundUrl} bg-center bg-cover`),
                    item.textColor
                  )}
                >
                  <div className="flex flex-col items-center gap-y-4 w-full px-2">
                    <div
                      className={`w-full h-4 rounded-md ${item.buttonStyle}`}
                    />
                    <div
                      className={`w-full h-4 rounded-md ${item.buttonStyle}`}
                    />
                    <div
                      className={`w-full h-4 rounded-md ${item.buttonStyle}`}
                    />
                  </div>
                </div>
              </Card>
              <span className="mt-3 text-sm text-center">{item.name}</span>
            </div>
          ))} */}
        </Card>
      </div>
    </div>
  );
}
