import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

function isValidHex(value: string) {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
}

export function ColorSelector({
  value,
  onChange,
  className,
  placeholder = '#d21414',
  disabled = false,
}: ColorSelectorProps) {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalValue(newColor);

    if (isValidHex(newColor)) {
      onChange(newColor);
    }
  };

  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalValue(newColor);
    onChange(newColor);
  };

  const isError = !isValidHex(localValue);

  return (
    <div className={cn('flex items-center space-x-2 rounded-md', className)}>
      <Input
        type="color"
        value={isError ? '#000000' : localValue}
        onChange={handleColorInput}
        disabled={disabled}
        className={cn('h-12 w-12 p-1 cursor-pointer', {
          'border-red-500': isError,
        })}
      />

      <Input
        type="text"
        value={localValue}
        onChange={handleTextChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-12 max-w-[250px]',
          isError && 'border-red-500 text-red-500 placeholder:text-red-300'
        )}
      />
    </div>
  );
}
