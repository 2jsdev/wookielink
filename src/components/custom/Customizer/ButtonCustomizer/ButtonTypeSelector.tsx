'use client';

import { cn } from '@/lib/utils';
import { ButtonType, buttonTypes } from '@/interfaces/theme';
import { Label } from '@/components/ui/label';
import { ColorSelector } from '@/components/custom/Customizer/ColorSelector';
import useThemeStore from '@/store/theme-store';
import { useToast } from '@/hooks/use-toast';
import { updateTheme } from '@/actions/updateTheme';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

export function ButtonTypeSelector() {
  const {
    customTheme,
    setButtonType,
    setButtonColor,
    setButtonShadowColor,
    setButtonTextColor,
    setCustomTheme,
  } = useThemeStore();
  const { toast } = useToast();

  const handleSelect = async (type: ButtonType) => {
    if (!customTheme) return;
    const previousType = customTheme.buttonStyle?.type;
    try {
      setButtonType(type);
      const updatedTheme = await updateTheme({
        id: customTheme.id,
        buttonStyle: {
          ...customTheme.buttonStyle,
          type,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      setButtonType(previousType);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update button type',
      });
    }
  };

  const handleButtonColorChange = async (newColor: string) => {
    if (!customTheme) return;
    const previousColor = customTheme.buttonStyle?.backgroundColor;
    try {
      setButtonColor(newColor);
      const updatedTheme = await updateTheme({
        id: customTheme.id,
        buttonStyle: {
          ...customTheme.buttonStyle,
          backgroundColor: newColor,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      setButtonColor(previousColor);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update button color',
      });
    }
  };

  const debouncedHandleButtonColorChange = useDebouncedCallback(
    handleButtonColorChange,
    300
  );

  const handleShadowColorChange = async (newColor: string) => {
    if (!customTheme) return;
    const previousColor = customTheme.buttonStyle?.shadowColor;
    try {
      setButtonShadowColor(newColor);
      const updatedTheme = await updateTheme({
        id: customTheme.id,
        buttonStyle: {
          ...customTheme.buttonStyle,
          shadowColor: newColor,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      setButtonShadowColor(previousColor);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update shadow color',
      });
    }
  };

  const debouncedHandleShadowColorChange = useDebouncedCallback(
    handleShadowColorChange,
    300
  );

  const handleTextColorChange = async (newColor: string) => {
    if (!customTheme) return;
    const previousColor = customTheme.buttonStyle?.textColor;
    try {
      setButtonTextColor(newColor);
      const updatedTheme = await updateTheme({
        id: customTheme.id,
        buttonStyle: {
          ...customTheme.buttonStyle,
          textColor: newColor,
        },
      });
      setCustomTheme(updatedTheme);
    } catch (error) {
      setButtonTextColor(previousColor);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update button text color',
      });
    }
  };

  const debouncedHandleTextColorChange = useDebouncedCallback(
    handleTextColorChange,
    300
  );

  const renderButtonPreview = (type: ButtonType) => {
    const baseClasses = 'w-full h-8 border transition-all';

    switch (type) {
      case buttonTypes.FILL:
        return 'bg-black dark:bg-white';
      case buttonTypes.FILL_ROUNDED:
        return 'bg-black dark:bg-white rounded-md';
      case buttonTypes.FILL_CIRCULAR:
        return 'bg-black dark:bg-white rounded-full';
      case buttonTypes.OUTLINE:
        return 'border-2 border-black dark:border-white';
      case buttonTypes.OUTLINE_ROUNDED:
        return 'border-2 border-black dark:border-white rounded-md';
      case buttonTypes.OUTLINE_CIRCULAR:
        return 'border-2 border-black dark:border-white rounded-full';

      case buttonTypes.SOFTSHADOW:
        return 'bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg';
      case buttonTypes.SOFTSHADOW_ROUNDED:
        return 'bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg rounded-md';
      case buttonTypes.SOFTSHADOW_CIRCULAR:
        return 'bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-lg rounded-full';

      case buttonTypes.HARDSHADOW:
        return 'border-2 border-black dark:border-white translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]';
      case buttonTypes.HARDSHADOW_ROUNDED:
        return 'border-2 border-black dark:border-white rounded-md translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]';
      case buttonTypes.HARDSHADOW_CIRCULAR:
        return 'border-2 border-black dark:border-white rounded-full translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]';
      default:
        return '';
    }
  };

  const categories = [
    {
      title: 'Fill',
      types: ['FILL', 'FILL_ROUNDED', 'FILL_CIRCULAR'] as ButtonType[],
    },
    {
      title: 'Outline',
      types: ['OUTLINE', 'OUTLINE_ROUNDED', 'OUTLINE_CIRCULAR'] as ButtonType[],
    },
    {
      title: 'Soft shadow',
      types: [
        'SOFTSHADOW',
        'SOFTSHADOW_ROUNDED',
        'SOFTSHADOW_CIRCULAR',
      ] as ButtonType[],
    },
    {
      title: 'Hard shadow',
      types: [
        'HARDSHADOW',
        'HARDSHADOW_ROUNDED',
        'HARDSHADOW_CIRCULAR',
      ] as ButtonType[],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {categories.map((category) => (
        <div key={category.title} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {category.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {category.types.map((type) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                className={cn(
                  'relative h-12 w-full cursor-pointer rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  customTheme?.buttonStyle?.type === type
                    ? 'ring-2 ring-primary'
                    : 'ring-1 ring-transparent'
                )}
              >
                <div
                  className={cn('h-full w-full', renderButtonPreview(type))}
                />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <Label>Button color</Label>
        <ColorSelector
          value={customTheme?.buttonStyle?.backgroundColor || '#d21414'}
          onChange={(newColor) => debouncedHandleButtonColorChange(newColor)}
          placeholder="#d21414"
        />
      </div>
      {(customTheme?.buttonStyle?.type === buttonTypes.SOFTSHADOW ||
        customTheme?.buttonStyle?.type === buttonTypes.SOFTSHADOW_ROUNDED ||
        customTheme?.buttonStyle?.type === buttonTypes.SOFTSHADOW_CIRCULAR ||
        customTheme?.buttonStyle?.type === buttonTypes.HARDSHADOW ||
        customTheme?.buttonStyle?.type === buttonTypes.HARDSHADOW_ROUNDED ||
        customTheme?.buttonStyle?.type === buttonTypes.HARDSHADOW_CIRCULAR) && (
        <div className="space-y-2">
          <Label>Shadow Color</Label>
          <ColorSelector
            value={customTheme?.buttonStyle?.shadowColor || '#d21414'}
            onChange={(newColor) => debouncedHandleShadowColorChange(newColor)}
            placeholder="#d21414"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label>Button font color</Label>
        <ColorSelector
          value={customTheme?.buttonStyle?.textColor || '#d21414'}
          onChange={(newColor) => debouncedHandleTextColorChange(newColor)}
          placeholder="#d21414"
        />
      </div>
    </div>
  );
}
