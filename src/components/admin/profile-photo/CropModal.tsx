'use client';

import { useState, useCallback, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';

interface CropModalProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedImage: string) => void;
}

export function CropModal({
  image,
  isOpen,
  onClose,
  onCropComplete,
}: CropModalProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    const aspect = 1;
    const width = img.width;
    const height = img.height;
    const cropWidth = Math.min(width, height);
    const x = (width - cropWidth) / 2;
    const y = (height - cropWidth) / 2;
    const defaultCrop: Crop = {
      unit: 'px',
      width: cropWidth,
      height: cropWidth,
      x,
      y,
    };
    setCrop(defaultCrop);
    setCompletedCrop(defaultCrop);
  }, []);

  const getCroppedImg = useCallback((image: HTMLImageElement, crop: Crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    return canvas.toDataURL('image/jpeg');
  }, []);

  const handleSave = useCallback(async () => {
    if (completedCrop && imgRef.current) {
      setIsProcessing(true); // Muestra el loader
      setTimeout(() => {
        const croppedImage = getCroppedImg(imgRef.current!, completedCrop);
        onCropComplete(croppedImage);
        setIsProcessing(false);
        onClose();
      }, 1000); // Simula el procesamiento
    }
  }, [completedCrop, getCroppedImg, onCropComplete, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-lg font-medium text-card-foreground">
          Edit profile photo
        </DialogTitle>
        <div className="mt-4">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
          >
            <img
              ref={imgRef}
              src={image || ''}
              alt="Crop me"
              onLoad={(e) => onImageLoad(e.currentTarget)}
            />
          </ReactCrop>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center"
            disabled={!completedCrop || isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              'Save'
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
