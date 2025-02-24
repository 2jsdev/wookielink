'use client';

import { useTransition } from 'react';
import useThemeStore from '@/store/theme-store';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FontFamily, fonts } from '@/interfaces/theme';
import { ColorSelector } from '../ColorSelector';
import { useToast } from '@/hooks/use-toast';
import { updateTheme } from '@/actions/updateTheme';
import { Loader } from '@/components/ui/loader';

export function FontSelector() {
  const { customTheme, setFontFamily, setFontColor } = useThemeStore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFontFamilyChange = async (value: FontFamily) => {
    if (!customTheme) return;
    const previousFontFamily = customTheme.fontStyle?.fontFamily;
    try {
      setFontFamily(value);
      await updateTheme({
        id: customTheme.id,
        fontStyle: {
          ...customTheme.fontStyle,
          fontFamily: value,
        },
      });
    } catch (error) {
      setFontFamily(previousFontFamily);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update font family',
      });
    }
  };

  const handleFontColorChange = async (value: string) => {
    if (!customTheme) return;
    const previousFontColor = customTheme.fontStyle?.color;
    try {
      setFontColor(value);
      await updateTheme({
        id: customTheme.id,
        fontStyle: {
          ...customTheme.fontStyle,
          color: value,
        },
      });
    } catch (error) {
      setFontColor(previousFontColor);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update font color',
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {isPending && (
        <div className="flex justify-center">
          <Loader className="h-5 w-5" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Label>Font Family</Label>
        <Select
          value={customTheme?.fontStyle?.fontFamily}
          onValueChange={(value: FontFamily) => {
            startTransition(() => handleFontFamilyChange(value));
          }}
          disabled={isPending}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select font family" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(fonts).map((key) => {
              const item = fonts[key as FontFamily];
              return (
                <SelectItem key={key} value={key}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Color</Label>
        <ColorSelector
          value={customTheme?.fontStyle?.color || '#000000'}
          onChange={(newColor) => {
            startTransition(() => handleFontColorChange(newColor));
          }}
          placeholder="#000000"
          disabled={isPending}
        />
      </div>
    </div>
  );
}
