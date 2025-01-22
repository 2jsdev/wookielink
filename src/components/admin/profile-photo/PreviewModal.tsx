'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface PreviewModalProps {
  image: string;
  onClose: () => void;
}

export function PreviewModal({ image, onClose }: PreviewModalProps) {
  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-foreground text-2xl z-50"
        onClick={onClose}
      >
        <X />
      </button>
      <Image
        src={image}
        alt="Preview"
        width={500}
        height={500}
        className="rounded-md"
      />
    </div>
  );
}
