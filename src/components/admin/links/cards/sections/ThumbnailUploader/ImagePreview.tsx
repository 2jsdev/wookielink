'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  onDelete: () => void;
  onReset: () => void;
  onUpload: () => void;
}

export function ImagePreview({
  image,
  onDelete,
  onReset,
  onUpload,
}: ImagePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="icon" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative max-h-[400px] overflow-hidden rounded-lg">
        <img
          src={image || undefined}
          alt="Preview"
          className="max-h-[400px] w-full object-contain"
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onDelete}>
          Delete
        </Button>
        <Button onClick={onUpload}>Upload</Button>
      </div>
    </div>
  );
}
