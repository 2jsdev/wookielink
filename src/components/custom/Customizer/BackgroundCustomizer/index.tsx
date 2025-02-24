'use client';

import { useCallback, useTransition } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import useThemeStore from '@/store/theme-store';
import { ColorSelector } from '@/components/custom/Customizer/ColorSelector';
import BackgroundCard from '@/components/custom/Customizer/BackgroundCustomizer/BackgroundCard';
import {
  backgroundStyles,
  BackgroundStyleType,
  BackgroundType,
  backgroundTypes,
  gradientDirections,
} from '@/interfaces/theme';
import { Image, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateTheme } from '@/actions/updateTheme';

export function BackgroundCustomizer() {
  const {
    customTheme,
    setBackgroundType,
    setBackgroundStyle,
    removeBackgroundStyle,
    setBackgroundColor,
    setBackgroundImageUrl,
    setCustomTheme,
  } = useThemeStore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleBackgroundCardClick = async (
    type: BackgroundType,
    style?: BackgroundStyleType
  ) => {
    if (!customTheme) return;
    const previousType = customTheme.background?.type;
    const previousStyle = customTheme.background?.style!;
    try {
      setBackgroundType(type);
      if (style) {
        setBackgroundStyle(style);
      } else {
        removeBackgroundStyle();
      }
      const updatedTheme = await updateTheme({
        id: customTheme.id,
        background: {
          ...customTheme.background,
          type,
          style,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      setBackgroundType(previousType);
      setBackgroundStyle(previousStyle);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update background',
      });
    }
  };

  const handleBackgroundColorChange = async (newColor: string) => {
    if (!customTheme) return;
    const previousColor = customTheme.background?.color;
    try {
      setBackgroundColor(newColor);
      const updatedTheme = await updateTheme({
        id: customTheme.id,
        background: {
          ...customTheme.background,
          color: newColor,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      setBackgroundColor(previousColor);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update background color',
      });
    }
  };

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const objectUrl = URL.createObjectURL(file);
        setBackgroundImageUrl(objectUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [setBackgroundImageUrl]
  );

  return (
    <div className="w-full space-y-8">
      <Card>
        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 p-5">
          <BackgroundCard
            selected={customTheme?.background?.style === backgroundStyles.FLAT}
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(
                  backgroundTypes.COLOR,
                  backgroundStyles.FLAT
                )
              );
            }}
            label="Flat Colour"
            isPro={false}
          >
            <div className="h-full w-full bg-[#3d444b] before:flex before:pt-[150%]"></div>
          </BackgroundCard>

          <BackgroundCard
            selected={
              customTheme?.background?.style === backgroundStyles.COLORUP ||
              customTheme?.background?.style === backgroundStyles.COLORDOWN
            }
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(
                  backgroundTypes.COLOR,
                  backgroundStyles.COLORUP
                )
              );
            }}
            label="Gradient"
            isPro={false}
          >
            <div
              className="h-full w-full before:flex before:pt-[150%]"
              style={{
                background:
                  'linear-gradient(0deg, rgb(61, 68, 75) 0%, rgb(104, 109, 115) 100%)',
              }}
            ></div>
          </BackgroundCard>

          <BackgroundCard
            selected={customTheme?.background?.type === backgroundTypes.IMAGE}
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(backgroundTypes.IMAGE)
              );
              removeBackgroundStyle();
            }}
            label="Image"
            isPro={true}
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-pebble before:flex before:pt-[150%]">
              <Image className="h-10 w-10 text-gray-300" />
            </div>
          </BackgroundCard>

          <BackgroundCard
            selected={customTheme?.background?.type === backgroundTypes.VIDEO}
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(backgroundTypes.VIDEO)
              );
              removeBackgroundStyle();
            }}
            label="Video"
            isPro={true}
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-pebble before:flex before:pt-[150%]">
              <Image className="h-10 w-10 text-gray-300" />
            </div>
          </BackgroundCard>

          <BackgroundCard
            selected={customTheme?.background?.style === backgroundStyles.POLKA}
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(
                  backgroundTypes.ANIMATED,
                  backgroundStyles.POLKA
                )
              );
            }}
            label="Polka"
            isPro={true}
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <img
              className="h-full w-full object-cover chromatic-ignore"
              src="https://mfe-appearance.production.linktr.ee/images/60630.77a30bbed28f234a9cea.svg"
              alt="Preview image for Polka"
              loading="lazy"
            />
          </BackgroundCard>

          <BackgroundCard
            selected={
              customTheme?.background?.style === backgroundStyles.STRIPE
            }
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(
                  backgroundTypes.ANIMATED,
                  backgroundStyles.STRIPE
                )
              );
            }}
            label="Stripe"
            isPro={true}
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <img
              className="h-full w-full object-cover chromatic-ignore"
              src="https://mfe-appearance.production.linktr.ee/images/37298.b241c1ff53e90ab950b6.svg"
              alt="Preview image for Stripe"
              loading="lazy"
            />
          </BackgroundCard>

          <BackgroundCard
            selected={customTheme?.background?.style === backgroundStyles.WAVES}
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(
                  backgroundTypes.ANIMATED,
                  backgroundStyles.WAVES
                )
              );
            }}
            label="Waves"
            isPro={true}
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <img
              className="h-full w-full object-cover chromatic-ignore"
              src="https://mfe-appearance.production.linktr.ee/images/53709.b31ea1a827ac220f0de1.svg"
              alt="Preview image for Waves"
              loading="lazy"
            />
          </BackgroundCard>

          <BackgroundCard
            selected={
              customTheme?.background?.style === backgroundStyles.ZIGZAG
            }
            onClick={() => {
              startTransition(() =>
                handleBackgroundCardClick(
                  backgroundTypes.ANIMATED,
                  backgroundStyles.ZIGZAG
                )
              );
            }}
            label="Zig Zag"
            isPro={true}
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <img
              className="h-full w-full object-cover chromatic-ignore"
              src="https://mfe-appearance.production.linktr.ee/images/10965.070c59066dce3c0ac656.svg"
              alt="Preview image for Zig Zag"
              loading="lazy"
            />
          </BackgroundCard>
        </div>

        <div className="gap-4 p-5">
          {customTheme?.background?.style === backgroundStyles.COLORUP ||
            (customTheme?.background?.style === backgroundStyles.COLORDOWN && (
              <div className="space-y-2">
                <Label>Direction</Label>
                <RadioGroup
                  value={customTheme?.background?.style}
                  onValueChange={(value) =>
                    startTransition(() =>
                      handleBackgroundCardClick(
                        backgroundTypes.COLOR,
                        value as BackgroundStyleType
                      )
                    )
                  }
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {Object.entries(gradientDirections).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

          {(customTheme?.background?.type === backgroundTypes.COLOR ||
            customTheme?.background?.type === backgroundTypes.ANIMATED) && (
            <div className="space-y-2">
              <Label>Color</Label>
              <ColorSelector
                value={customTheme?.background?.color || '#d21414'}
                onChange={(newColor) => {
                  startTransition(() => handleBackgroundColorChange(newColor));
                }}
                placeholder="#d21414"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
