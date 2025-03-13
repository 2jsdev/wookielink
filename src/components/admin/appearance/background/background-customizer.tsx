'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import useThemeStore from '@/store/theme-store';
import { ColorSelector } from '@/components/custom/color-selector';
import BackgroundCard from '@/components/admin/appearance/background/background-card';
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
import { updateTheme } from '@/actions/update-theme';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { MediaUploader } from '@/components/custom/media-uploader';
import { uploadThemeBackgroundMedia } from '@/actions/upload-theme-background-media';

export function BackgroundCustomizer() {
  const {
    customTheme,
    setBackgroundType,
    setBackgroundStyle,
    removeBackgroundStyle,
    setBackgroundColor,
    setCustomTheme,
  } = useThemeStore();
  const { toast } = useToast();
  const [openMediaUploader, setOpenMediaUploader] = useState(false);

  const handleBackgroundCardClick = async (
    type: BackgroundType,
    style?: BackgroundStyleType
  ) => {
    if (!customTheme) return;
    const previousType = customTheme.background?.type;
    const previousStyle = customTheme.background?.style;
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
      setBackgroundStyle(previousStyle!);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update background',
      });
    }
  };

  const debouncedHandleBackgroundColorChange = useDebouncedCallback(
    async (newColor: string) => {
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
    },
    300
  );

  async function handleUploadMedia(file: File) {
    if (!customTheme) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const updatedTheme = await uploadThemeBackgroundMedia({
        themeId: customTheme.id,
        backgroundMedia: {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.name.split('.').pop() ?? '',
          content: arrayBuffer,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload file.',
      });
    }
  }

  return (
    <div className="w-full space-y-8">
      <Card>
        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4 p-5">
          <BackgroundCard
            selected={customTheme?.background?.style === backgroundStyles.FLAT}
            onClick={() => {
              handleBackgroundCardClick(
                backgroundTypes.COLOR,
                backgroundStyles.FLAT
              );
            }}
            label="Flat Colour"
          >
            <div className="h-full w-full bg-[#3d444b] before:flex before:pt-[150%]"></div>
          </BackgroundCard>

          <BackgroundCard
            selected={
              customTheme?.background?.style === backgroundStyles.COLORUP ||
              customTheme?.background?.style === backgroundStyles.COLORDOWN
            }
            onClick={() => {
              handleBackgroundCardClick(
                backgroundTypes.COLOR,
                backgroundStyles.COLORUP
              );
            }}
            label="Gradient"
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
            selected={customTheme?.background?.style === backgroundStyles.POLKA}
            onClick={() => {
              handleBackgroundCardClick(
                backgroundTypes.ANIMATED,
                backgroundStyles.POLKA
              );
            }}
            label="Polka"
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
              handleBackgroundCardClick(
                backgroundTypes.ANIMATED,
                backgroundStyles.STRIPE
              );
            }}
            label="Stripe"
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
              handleBackgroundCardClick(
                backgroundTypes.ANIMATED,
                backgroundStyles.WAVES
              );
            }}
            label="Waves"
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
              handleBackgroundCardClick(
                backgroundTypes.ANIMATED,
                backgroundStyles.ZIGZAG
              );
            }}
            label="Zig Zag"
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <img
              className="h-full w-full object-cover chromatic-ignore"
              src="https://mfe-appearance.production.linktr.ee/images/10965.070c59066dce3c0ac656.svg"
              alt="Preview image for Zig Zag"
              loading="lazy"
            />
          </BackgroundCard>

          <BackgroundCard
            selected={customTheme?.background?.type === backgroundTypes.IMAGE}
            onClick={() => {
              handleBackgroundCardClick(backgroundTypes.IMAGE);
              removeBackgroundStyle();
              setOpenMediaUploader(true);
            }}
            label="Image"
            badgeContent={<Zap className="h-[10px] w-[10px] text-white" />}
          >
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-pebble before:flex before:pt-[150%]">
              <Image className="h-10 w-10 text-gray-300" />
            </div>
          </BackgroundCard>
        </div>

        <div className="flex flex-col gap-4 p-5">
          {customTheme?.background?.style === backgroundStyles.COLORUP ||
            customTheme?.background?.style === backgroundStyles.COLORDOWN ? (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">Direction</Label>
              <RadioGroup
                value={customTheme?.background?.style}
                onValueChange={(value) =>
                  handleBackgroundCardClick(
                    backgroundTypes.COLOR,
                    value as BackgroundStyleType
                  )
                }
                className="space-y-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem value={backgroundStyles.COLORUP} id="gradient-up" className="mr-6" />
                  <div className="mr-2 w-10 h-6 rounded border border-gray-300 dark:border-gray-600 bg-gradient-to-t from-gray-400 to-white dark:from-gray-600 dark:to-black" />
                  <Label htmlFor="gradient-up" className="cursor-pointer text-gray-900 dark:text-white">
                    Gradient Up
                  </Label>
                </div>

                <div className="flex items-center">
                  <RadioGroupItem value={backgroundStyles.COLORDOWN} id="gradient-down" className="mr-6" />
                  <div className="mr-2 w-10 h-6 rounded border border-gray-300 dark:border-gray-600 bg-gradient-to-b from-white to-gray-400 dark:from-black dark:to-gray-600" />
                  <Label htmlFor="gradient-down" className="cursor-pointer text-gray-900 dark:text-white">
                    Gradient Down
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ) : null}

          {(customTheme?.background?.type === backgroundTypes.COLOR ||
            customTheme?.background?.type === backgroundTypes.ANIMATED) && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Color</Label>
                <ColorSelector
                  value={customTheme?.background?.color || '#d21414'}
                  onChange={(newColor) => {
                    debouncedHandleBackgroundColorChange(newColor);
                  }}
                  placeholder="#d21414"
                />
              </div>
            )}
        </div>
      </Card>

      <MediaUploader
        open={openMediaUploader}
        setOpen={setOpenMediaUploader}
        dialogTitle="Upload Image"
        onUpload={handleUploadMedia}
      />
    </div>
  );
}
