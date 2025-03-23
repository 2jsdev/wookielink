'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ColorSelector } from '@/components/custom/color-selector';
import { Card } from '@/components/ui/card';
import useUserStore from '@/store/user-store';
import { updateUserImagePreviewWithColor } from '@/actions/update-user-image-preview-with-color';
import { Loader2 } from 'lucide-react';

export default function SharingPreview() {
  const { setUser, user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const presetColors = ['#8DD3D7', '#FF8370', '#FFFFFF', '#000000'];
  const bgColor = user?.imagePreviewBgColor ?? '#FFFFFF';

  const [pendingColor, setPendingColor] = useState<string>(bgColor);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pendingColor !== bgColor) {
        handleColorChange(pendingColor);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [pendingColor]);

  const handleColorChange = async (color: string) => {
    try {
      setIsLoading(true);
      const updatedUser = await updateUserImagePreviewWithColor({
        imagePreviewBgColor: color,
      });
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user background color:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Sharing Preview</h1>
      <p className="mb-6">
        Your sharing preview is the image that&apos;s displayed when you share
        your Linktree.
      </p>

      <Card>
        <div className="space-y-8 p-5">
          <div className="w-full flex justify-center min-h-[440px] items-center relative">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Generating preview...
                </p>
              </div>
            ) : user?.imagePreview ? (
              <div className="relative w-[800px] h-[418px] border rounded-lg overflow-hidden">
                <Image
                  src={user.imagePreview}
                  alt="Sharing preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="font-medium mb-2">Select Background Color</h3>
            <div className="flex gap-2 mb-6">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full transition-all ${
                    bgColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  style={{
                    backgroundColor: color,
                    border: color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none',
                  }}
                  onClick={() => handleColorChange(color)}
                  aria-label={`Select ${color} background`}
                  disabled={isLoading}
                />
              ))}
            </div>

            <ColorSelector
              value={pendingColor}
              onChange={(color) => setPendingColor(color)}
              placeholder="#000000"
              disabled={isLoading}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
