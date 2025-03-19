'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader } from '@/components/ui/loader';
import { Check, X, Pencil } from 'lucide-react';
import { checkUsernameAvailability } from '@/actions/check-username-availability';

interface EditableUsernameInputProps {
  initialValue: string;
  onSave: (value: string) => void;
  maxWidth?: number;
}

const getCaretIndexFromClick = (e: MouseEvent, element: HTMLElement): number | undefined => {
  if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
    return pos?.offset;
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    return range?.startOffset;
  }
  return 0;
};

export default function EditableUsernameInput({ initialValue, onSave, maxWidth = 250 }: EditableUsernameInputProps) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caretPosition, setCaretPosition] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value, isEditing]);

  useEffect(() => {
    if (!isEditing || debouncedValue === initialValue || debouncedValue.length <= 2) {
      setAvailability(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    checkUsernameAvailability({ username: debouncedValue })
      .then((isAvailable) => setAvailability(isAvailable))
      .catch(() => setError('Error checking availability.'))
      .finally(() => setIsLoading(false));
  }, [debouncedValue, isEditing]);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const newWidth = Math.min(spanRef.current.offsetWidth + 20, maxWidth);
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(caretPosition, caretPosition);
    }
  }, [isEditing, caretPosition]);

  const handleSave = () => {
    if (!value.trim() || availability === false) {
      setValue(initialValue);
    } else if (availability === true) {
      onSave(value.trim());
    }
    setIsEditing(false);
  };

  const handleSpanClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (spanRef.current) {
      const index = getCaretIndexFromClick(e.nativeEvent, spanRef.current);
      setCaretPosition(index ?? value.length);
      setIsEditing(true);
    }
  };

  const handlePencilClick = () => {
    setCaretPosition(value.length);
    setIsEditing(true);
  };

  return (
    <div className="relative flex items-center">
      <span ref={spanRef} className="absolute invisible whitespace-pre text-sm md:text-base lg:text-lg">
        {value || "placeholder"}
      </span>

      {isEditing ? (
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            className="border-none focus:ring-0 focus:outline-none bg-background text-sm md:text-base lg:text-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            autoFocus
            style={{ minWidth: "50px" }}
          />
          <div className="ml-[-10px]">
            {isLoading ? (
              <Loader className="h-4 w-4 text-gray-500" />
            ) : availability !== null ? (
              availability ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="truncate text-sm md:text-base lg:text-lg cursor-text" onClick={handleSpanClick}>
            {value}
          </span>
          <Pencil className="h-4 w-4 cursor-pointer ml-1" onClick={handlePencilClick} />
        </div>
      )}
      {error && <p className="absolute top-full mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
