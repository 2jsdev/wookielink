'use client';

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

export function FontSelector() {
  const { customTheme, setFontFamily, setFontColor } = useThemeStore();

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <Label>Font Family</Label>
        <Select
          value={customTheme?.fontStyle?.fontFamily}
          onValueChange={(value: FontFamily) => setFontFamily(value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select primary color" />
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
          onChange={(newColor) => setFontColor(newColor)}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
