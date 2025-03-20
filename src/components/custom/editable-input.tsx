'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

interface EditableInputProps {
  initialValue: string;
  onSave: (value: string) => void;
  placeholder?: string;
}

const getCaretIndexFromClick = (
  e: MouseEvent,
  element: HTMLElement
): number | undefined => {
  if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
    return pos?.offset;
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    return range?.startOffset;
  }
  return 0;
};

const EditableInput: React.FC<EditableInputProps> = ({
  initialValue,
  onSave,
  placeholder = 'Click to edit...',
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [caretPosition, setCaretPosition] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(caretPosition, caretPosition);
    }
  }, [isEditing, caretPosition]);

  const handleSave = () => {
    if (!value.trim()) {
      setValue(initialValue);
    } else {
      onSave(value.trim());
    }
    setIsEditing(false);
  };

  const handleSpanClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (spanRef.current) {
      const index = getCaretIndexFromClick(e.nativeEvent, spanRef.current);
      setCaretPosition(index ?? 0);
      setIsEditing(true);
    }
  };

  const handlePencilClick = () => {
    setCaretPosition(value.length);
    setIsEditing(true);
  };

  return (
    <div className="relative flex items-center">
      {isEditing ? (
        <input
          ref={inputRef}
          className="w-full border-none focus:ring-0 focus:outline-none bg-background text-sm md:text-base lg:text-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
          style={{ paddingRight: '2rem' }}
        />
      ) : (
        <div className="w-full flex items-center min-w-0">
          <div className="min-w-0 flex-1 flex items-center">
            <span
              ref={spanRef}
              className={`truncate text-sm md:text-base lg:text-lg cursor-text ${!value ? 'text-gray-400' : ''}`}
              onClick={handleSpanClick}
            >
              {value || placeholder}
            </span>
            <Pencil
              className="h-4 w-4 cursor-pointer shrink-0 ml-1"
              onClick={handlePencilClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableInput;
