'use client';

import { useState, useEffect, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Check, X } from 'lucide-react';
import { checkUsernameAvailability } from '@/actions/check-username-availability';

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
  onAvailabilityChange?: (available: boolean | null) => void;
}

export function UsernameInput({
  value,
  onChange,
  onAvailabilityChange,
}: UsernameInputProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debouncedValue.length > 2) {
      setIsLoading(true);
      setError(null);
      startTransition(async () => {
        try {
          const isAvailable = await checkUsernameAvailability({
            username: debouncedValue,
          });
          setAvailability(isAvailable);
          if (onAvailabilityChange) onAvailabilityChange(isAvailable);
        } catch (err) {
          console.error(err);
          setError('Error checking username availability.');
          setAvailability(null);
          if (onAvailabilityChange) onAvailabilityChange(null);
        } finally {
          setIsLoading(false);
        }
      });
    } else {
      setAvailability(null);
      if (onAvailabilityChange) onAvailabilityChange(null);
    }
  }, [debouncedValue, startTransition, onAvailabilityChange]);

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        wookiel.ink/
      </div>
      <Input
        type="text"
        placeholder="yourname"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-[100px] pr-10"
        aria-label="Enter your desired username"
        autoComplete="off"
      />
      <div className="absolute top-1/2 right-0 flex items-center pr-3 -translate-y-1/2">
        {isLoading || isPending ? (
          <Loader className="h-5 w-5" />
        ) : (
          value &&
          availability !== null &&
          (availability ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <X className="h-5 w-5 text-red-500" />
          ))
        )}
      </div>
      {value && !isLoading && availability !== null && (
        <p
          className={`absolute top-full mt-1 text-sm ${
            availability ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {availability ? 'Username is available' : 'Username is not available'}
        </p>
      )}
      {error && (
        <p className="absolute top-full mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
