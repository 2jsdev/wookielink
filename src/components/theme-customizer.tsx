'use client';

import { Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import useSettingsStore, {
  ThemeDirection,
  FontFamily,
  themeColors,
  themeSettings,
  ContentLayout,
} from '@/store/theme-settings-store';
import { Label } from './ui/label';

function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const {
    themeColor,
    setThemeColor,
    resetTheme,
    fontFamily,
    setFontFamily,
    direction,
    setDirection,
    roundedCorner,
    setRoundedCorner,
    contentLayout,
    setContentLayout,
  } = useSettingsStore((state) => state);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-2 right-0 z-50 rounded-full rounded-br-none rounded-tr-none py-6 shadow-lg"
          >
            <Settings className="h-6 w-6 animate-spin" />
            <span className="sr-only">Open theme customizer</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Customize Theme</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 space-y-4 py-6">
            <div className="flex flex-col gap-4">
              <Label>Font Family</Label>
              <Select
                value={fontFamily}
                onValueChange={(value: FontFamily) => setFontFamily(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select primary color" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(themeSettings.fontFamily).map((key) => {
                    const item = themeSettings.fontFamily[key as FontFamily];
                    return (
                      <SelectItem key={key} value={key}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Primary Color</Label>
              <Select
                value={String(themeColor === 'default' ? '' : themeColor)}
                onValueChange={(value: string) => setThemeColor(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select primary color" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(themeColors).map((key) => {
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-3 capitalize">
                          <span
                            className="inline-block h-4 w-4 rounded-full"
                            style={{
                              backgroundColor: `hsl(${themeColors[key]})`,
                            }}
                          ></span>{' '}
                          {key}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="roundedCorner">Rounded Conners</Label>
              <Slider
                id="roundedCorner"
                min={0}
                max={1.5}
                step={0.3}
                value={[roundedCorner]}
                onValueChange={([value]) => setRoundedCorner(value)}
                className="col-span-3"
              />
            </div>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="light"
                  id="light"
                  className="peer sr-only"
                  aria-label="light"
                />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border border-muted bg-transparent p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full items-center rounded">
                    <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                      <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                      </div>
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    Light
                  </span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="dark"
                  id="dark"
                  className="peer sr-only"
                  aria-label="dark"
                />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border border-muted bg-transparent p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full items-center rounded">
                    <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                      <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                      </div>
                    </div>
                  </div>
                  <span className="block w-full p-2 text-center font-normal">
                    Dark
                  </span>
                </Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col gap-4">
              <Label>Direction</Label>
              <RadioGroup
                value={direction}
                onValueChange={(value: ThemeDirection) => setDirection(value)}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="ltr"
                    id="ltr"
                    className="peer sr-only"
                    aria-label="ltr"
                  />
                  <Label
                    htmlFor="ltr"
                    className="flex flex-col items-center justify-between rounded-md border border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    LTR
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="rtl"
                    id="rtl"
                    className="peer sr-only"
                    aria-label="rtl"
                  />
                  <Label
                    htmlFor="rtl"
                    className="flex flex-col items-center justify-between rounded-md border border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    RTL
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Content Layout</Label>
              <RadioGroup
                value={contentLayout}
                onValueChange={(value: ContentLayout) =>
                  setContentLayout(value)
                }
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="full"
                    id="full"
                    className="peer sr-only"
                    aria-label="full"
                  />
                  <Label
                    htmlFor="full"
                    className="flex flex-col items-center justify-between rounded-md border border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Full
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="centered"
                    id="centered"
                    className="peer sr-only"
                    aria-label="centered"
                  />
                  <Label
                    htmlFor="centered"
                    className="flex flex-col items-center justify-between rounded-md border border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Centered
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                resetTheme();
                setTheme('light');
              }}
            >
              Reset to Default
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ThemeCustomizer;
