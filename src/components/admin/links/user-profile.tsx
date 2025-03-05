'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clipboard, Check, ExternalLink } from 'lucide-react';
import EditableInput from '@/components/custom/editable-input';
import ProfilePhoto from '@/components/admin/profile-photo';
import { uploadUserProfilePhoto } from '@/actions/upload-user-profile-photo';
import { updateUserProfile } from '@/actions/update-user-profile';
import { deleteUserProfilePhoto } from '@/actions/delete-user-profile-photo';
import useUiStore from '@/store/ui-store';
import useUserStore from '@/store/user-store';
import { cn } from '@/lib/utils';

export default function UserProfile() {
  const [copied, setCopied] = useState(false);

  const { viewArchived, isAnyCardOpen } = useUiStore();
  const { userLoading, setUser, user } = useUserStore();

  if (userLoading) {
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

  const copyToClipboard = () => {
    if (user?.username) {
      const url = `https://wookiel.ink/${user.username}`;
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

  const handleUpload = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const photo = {
        name: `${Date.now()}-${file.name}`,
        size: file.size,
        type: file.type,
        extension: file.name.split('.').pop() ?? '',
        content: arrayBuffer,
      };

      const userUpdated = await uploadUserProfilePhoto({ photo });
      setUser(userUpdated);
    } catch (error) {
      console.error('Error saving profile photo:', error);
    }
  };

  const handleSaveName = async (name: string) => {
    if (name !== user?.name) {
      const user = await updateUserProfile({ name });
      setUser(user);
    }
  };

  const handleSaveUsername = async (username: string) => {
    if (username !== user?.username) {
      const user = await updateUserProfile({ username });
      setUser(user);
    }
  };

  const handleRemoveProfilePhoto = async () => {
    try {
      await deleteUserProfilePhoto();
      setUser({ ...user!, image: '' });
    } catch (error) {
      console.error('Error removing profile photo:', error);
    }
  };

  return (
    <header
      className={cn('mb-6 flex flex-wrap items-center justify-between gap-4', {
        'opacity-100 filter blur-[2px] pointer-events-none': isAnyCardOpen(),
        hidden: viewArchived,
      })}
    >
      <div className="flex flex-wrap items-center gap-6 w-full sm:justify-center md:w-auto">
        <ProfilePhoto
          imageUrl={user?.image}
          size={80}
          onUpload={handleUpload}
          onRemove={handleRemoveProfilePhoto}
        />
        <div className="flex flex-col">
          <EditableInput
            initialValue={user?.username || ''}
            onSave={handleSaveUsername}
          />
          <EditableInput
            initialValue={user?.name || ''}
            onSave={handleSaveName}
          />
          <Link
            href={`/${user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-primary hover:underline"
          >
            wookiel.ink/{user?.username}
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
