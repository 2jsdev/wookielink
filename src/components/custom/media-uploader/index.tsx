'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileUploader } from './file-uploader';
import { ImageCropper } from './image-cropper';
import { ImagePreview } from './image-preview';

type View = 'upload' | 'crop' | 'preview';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogTitle?: string;
  onUpload: (file: File) => void;
}

export function MediaUploader({
  open,
  setOpen,
  dialogTitle = 'Upload Image',
  onUpload,
}: Props) {
  const [view, setView] = useState<View>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setView('crop');
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setCroppedImage(null);
    setView('upload');
  };

  const handleCrop = (croppedImageUrl: string) => {
    setCroppedImage(croppedImageUrl);
    setView('preview');
  };

  const handleReset = () => {
    setCroppedImage(null);
    setView('crop');
  };

  const handleFinalUpload = async () => {
    if (!croppedImage || !selectedFile) return;

    setView('upload');
    setIsUploading(true);

    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], selectedFile.name, { type: blob.type });

      await onUpload(file);

      setOpen(false);
      handleDelete();
    } catch (error) {
      console.error('Error uploading cropped image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] w-[90vw] overflow-hidden sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          {view === 'upload' && (
            <FileUploader
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
            />
          )}
          {view === 'crop' && selectedFile && (
            <ImageCropper
              file={selectedFile}
              onCrop={handleCrop}
              onDelete={handleDelete}
              onReset={handleReset}
            />
          )}
          {view === 'preview' && croppedImage && (
            <ImagePreview
              image={croppedImage}
              onDelete={handleDelete}
              onReset={handleReset}
              onUpload={handleFinalUpload}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
