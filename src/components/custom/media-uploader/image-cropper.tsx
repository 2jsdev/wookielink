'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface ImageCropperProps {
  file: File;
  onCrop: (croppedImage: string) => void;
  onDelete: () => void;
  onReset: () => void;
}

type AspectRatio = 'free' | 'rectangle' | 'square';

const aspectRatios: Record<AspectRatio, number | undefined> = {
  free: undefined,
  rectangle: 16 / 9,
  square: 1,
};

export function ImageCropper({
  file,
  onCrop,
  onDelete,
  onReset,
}: ImageCropperProps) {
  const [aspect, setAspect] = useState<AspectRatio>('rectangle');
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [initialCrop, setInitialCrop] = useState<Crop | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    const { width, height } = img;

    const newCrop = centerCrop(
      makeAspectCrop(
        { unit: '%', width: (Math.min(width, height) / width) * 100 },
        aspect === 'free' ? 1 : (aspectRatios[aspect] ?? 1),
        width,
        height
      ),
      width,
      height
    );

    setCrop(newCrop);
    setInitialCrop(newCrop);
  };

  const handleAspectChange = (newAspect: AspectRatio) => {
    setAspect(newAspect);

    if (imageRef.current) {
      const { width, height } = imageRef.current;

      const newCrop = centerCrop(
        makeAspectCrop(
          { unit: 'px', width: Math.min(width, height) },
          newAspect === 'free' ? 1 : (aspectRatios[newAspect] ?? 1),
          width,
          height
        ),
        width,
        height
      );

      setCrop(newCrop);
      setInitialCrop(newCrop);
    }
  };

  const handleReset = () => {
    if (initialCrop) {
      setCrop(initialCrop);
    }
    onReset();
  };

  const getCroppedImg = (cropToUse: Crop) => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const image = imageRef.current;

    const pixelCrop = {
      x:
        cropToUse.unit === '%'
          ? (cropToUse.x * image.width) / 100
          : cropToUse.x,
      y:
        cropToUse.unit === '%'
          ? (cropToUse.y * image.height) / 100
          : cropToUse.y,
      width:
        cropToUse.unit === '%'
          ? (cropToUse.width * image.width) / 100
          : cropToUse.width,
      height:
        cropToUse.unit === '%'
          ? (cropToUse.height * image.height) / 100
          : cropToUse.height,
    };

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = pixelCrop.width * scaleX;
    canvas.height = pixelCrop.height * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleCrop = () => {
    const cropToUse = crop ?? initialCrop;
    if (!cropToUse) return;

    const croppedImageUrl = getCroppedImg(cropToUse);
    if (croppedImageUrl) {
      onCrop(croppedImageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['free', 'rectangle', 'square'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleAspectChange(type)}
              className={cn(
                'h-9 rounded-md px-4 text-sm transition-colors',
                aspect === type
                  ? 'border-2 border-primary bg-primary/10 text-primary'
                  : 'border border-dashed border-muted-foreground/50 hover:border-muted-foreground/80 hover:bg-muted/50'
              )}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-gray-100">
        <div className="w-fit">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={aspect === 'free' ? undefined : aspectRatios[aspect]}
            className="max-h-[500px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageUrl || '/placeholder.svg'}
              alt="Crop preview"
              className="max-h-[500px] w-auto"
              onLoad={onImageLoad}
              crossOrigin="anonymous"
            />
          </ReactCrop>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onDelete}>
          Delete
        </Button>
        <Button onClick={handleCrop}>Crop</Button>
      </div>
    </div>
  );
}
