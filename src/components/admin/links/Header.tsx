'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clipboard, Check, ExternalLink, UserRound } from 'lucide-react';
import {
  useDeleteUserProfilePhotoMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadUserProfilePhotoMutation,
} from '@/lib/api/userApi';
import EditableInput from '@/components/admin/EditableInput';
import ProfilePhoto from '@/components/admin/profile-photo/ProfilePhoto';

export default function Header() {
  const { data: userProfile, isLoading } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [uploadUserProfilePhoto] = useUploadUserProfilePhotoMutation();
  const [deleteUserProfilePhoto] = useDeleteUserProfilePhotoMutation();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (userProfile?.username) {
      const url = `https://wookiel.ink/${userProfile.username}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const handleSaveProfilePhoto = async (image: string) => {
    try {
      const blob = await fetch(image).then((res) => res.blob());
      const formData = new FormData();
      formData.append(
        'file',
        blob,
        `${userProfile?.id}.${blob.type.split('/')[1]}`
      );
      await uploadUserProfilePhoto(formData);
    } catch (error) {
      console.error('Error saving profile photo:', error);
    }
  };

  const handleSaveName = (name: string) => {
    if (name !== userProfile?.name) {
      updateUserProfile({ name });
    }
  };

  const handleSaveUsername = (username: string) => {
    if (username !== userProfile?.username) {
      updateUserProfile({ username });
    }
  };

  const handleRemoveProfilePhoto = async () => {
    try {
      await deleteUserProfilePhoto();
    } catch (error) {
      console.error('Error removing profile photo:', error);
    }
  };

  if (isLoading) {
    return (
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 w-full sm:justify-center md:w-auto">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex flex-col sm:items-center gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>

        <div className="w-full sm:flex sm:justify-center md:w-auto">
          <Skeleton className="h-8 w-24" />
        </div>
      </header>
    );
  }

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-6 w-full sm:justify-center md:w-auto">
        <ProfilePhoto
          imageUrl={userProfile?.image}
          size={80}
          onSave={handleSaveProfilePhoto}
          onRemove={handleRemoveProfilePhoto}
        />
        <div className="flex flex-col">
          <EditableInput
            initialValue={userProfile?.username || ''}
            onSave={handleSaveUsername}
          />
          <EditableInput
            initialValue={userProfile?.name || ''}
            onSave={handleSaveName}
          />
          <Link
            href={`/${userProfile?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-primary hover:underline"
          >
            wookiel.ink/{userProfile?.username}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="w-full sm:flex sm:justify-center md:w-auto">
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="whitespace-nowrap w-full"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Clipboard className="mr-2 h-4 w-4" />
              Copy URL
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
