'use client';

import { useState } from 'react';
import { Camera, Upload, Trash2, UserRound } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CropModal } from './crop-modal';
import { PreviewModal } from './preview-modal';
import { RemoveModal } from './remove-modal';

interface ProfilePhotoProps {
  imageUrl?: string | null;
  size?: number;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
}

export default function ProfilePhoto({
  imageUrl,
  size = 96,
  onUpload,
  onRemove,
}: ProfilePhotoProps) {
  const [photo, setPhoto] = useState(imageUrl);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left - 40,
      y: e.clientY - rect.top - 80,
    });
    setIsOpen(true);
  };

  const handleViewPhoto = () => {
    setIsPreviewOpen(true);
    setIsOpen(false);
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, GIF, and WEBP formats are allowed.');
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setCropImage(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
    setIsOpen(false);
  };

  const handleOpenRemoveModal = () => {
    setIsOpen(false);
    setIsRemoveModalOpen(true);
  };

  const handleRemovePhoto = async () => {
    try {
      if (onRemove && typeof onRemove === 'function') {
        await onRemove();
      }
      setPhoto(null);
      setIsRemoveModalOpen(false);
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const handleCropComplete = async (croppedImage: string) => {
    setPhoto(croppedImage);

    if (onUpload && typeof onUpload === 'function' && selectedFile) {
      try {
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        const file = new File([blob], selectedFile.name, { type: blob.type });

        onUpload(file);
      } catch (error) {
        console.error('Error converting cropped image to File:', error);
      }
    }

    setCropImage(null);
    setSelectedFile(null);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className="relative cursor-pointer group"
            style={{ width: size, height: size }}
            onClick={handleClick}
          >
            <Avatar className="w-full h-full bg-muted">
              <AvatarImage src={photo || undefined} alt="Profile photo" />
              <AvatarFallback>
                <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute inset-0 bg-background/70 rounded-full flex flex-col items-center justify-center text-foreground text-xs ${
                !photo
                  ? ''
                  : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
              }`}
            >
              <Camera className="w-10 h-10 mb-1" />
              <span className="text-center px-2 font-bold">
                {!photo ? 'ADD PROFILE PHOTO' : 'CHANGE PROFILE PHOTO'}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-44 p-0 bg-popover border-border"
          style={{
            position: 'absolute',
            left: `${clickPosition.x}px`,
            top: `${clickPosition.y}px`,
            transform: 'translateY(0)',
            zIndex: 50,
          }}
        >
          <div className="py-1">
            {photo && (
              <button
                className="w-full px-3 py-2 flex items-center gap-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={handleViewPhoto}
              >
                <Camera className="w-4 h-4" />
                View photo
              </button>
            )}
            <label className="w-full px-3 py-2 flex items-center gap-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <Upload className="w-4 h-4" />
              Upload photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadPhoto}
              />
            </label>
            {photo && (
              <button
                className="w-full px-3 py-2 flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10"
                onClick={handleOpenRemoveModal}
              >
                <Trash2 className="w-4 h-4" />
                Remove photo
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {isPreviewOpen && (
        <PreviewModal image={photo!} onClose={() => setIsPreviewOpen(false)} />
      )}

      {isRemoveModalOpen && (
        <RemoveModal
          open={isRemoveModalOpen}
          onOpenChange={setIsRemoveModalOpen}
          onConfirm={handleRemovePhoto}
        />
      )}

      {cropImage && (
        <CropModal
          image={cropImage}
          isOpen={isCropModalOpen}
          onClose={() => {
            setCropImage(null);
            setIsCropModalOpen(false);
          }}
          onCropComplete={(croppedImage) => {
            handleCropComplete(croppedImage);
            setCropImage(null);
            setIsCropModalOpen(false);
          }}
        />
      )}
    </>
  );
}
