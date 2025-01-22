'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface EditableInputProps {
  initialValue: string;
  onSave: (value: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({
  initialValue,
  onSave,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    if (!value.trim()) {
      setValue(initialValue);
    } else {
      onSave(value.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="relative flex items-center w-full">
      {isEditing ? (
        <input
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
            <span className="truncate text-sm md:text-base lg:text-lg">
              {value}
            </span>
            <Pencil
              className="h-4 w-4 cursor-pointer shrink-0 ml-1"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableInput;
