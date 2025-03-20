'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clipboard, Check, ExternalLink } from 'lucide-react';
import ProfilePhoto from '@/components/admin/profile-photo';
import { uploadUserProfilePhoto } from '@/actions/upload-user-profile-photo';
import { updateUserProfile } from '@/actions/update-user-profile';
import { deleteUserProfilePhoto } from '@/actions/delete-user-profile-photo';
import useUiStore from '@/store/ui-store';
import useUserStore from '@/store/user-store';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function UserProfile() {
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [bioError, setBioError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const focusedFieldRef = useRef<'username' | 'bio' | null>(null);

  const MAX_BIO_LENGTH = 80;

  const { viewArchived, isAnyCardOpen } = useUiStore();
  const { userLoading, setUser, user } = useUserStore();

  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => {
        if (focusedFieldRef.current === 'username' && usernameRef.current) {
          usernameRef.current.focus();
          usernameRef.current.setSelectionRange(
            usernameRef.current.value.length,
            usernameRef.current.value.length
          );
        } else if (focusedFieldRef.current === 'bio' && bioRef.current) {
          bioRef.current.focus();
          bioRef.current.setSelectionRange(
            bioRef.current.value.length,
            bioRef.current.value.length
          );
        }
      }, 100);
    }
  }, [isDialogOpen]);

  const openDialog = (field: 'username' | 'bio') => {
    setUsername(user?.username || '');
    setBio(user?.bio || '');
    focusedFieldRef.current = field;
    setIsDialogOpen(true);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = e.target.value;
    if (newBio.length > MAX_BIO_LENGTH) {
      setBioError('Bio cannot be longer than 80 characters');
    } else {
      setBioError('');
    }
    setBio(newBio);
  };

  const handleSave = async () => {
    if (bio.length <= MAX_BIO_LENGTH) {
      const updatedUser = await updateUserProfile({ username, bio });
      setUser(updatedUser);
      setIsDialogOpen(false);
    }
  };

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

  const handleRemoveProfilePhoto = async () => {
    try {
      await deleteUserProfilePhoto();
      setUser({ ...user!, image: '' });
    } catch (error) {
      console.error('Error removing profile photo:', error);
    }
  };

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
          <div
            className="min-w-0 overflow-hidden flex items-center gap-1 cursor-pointer"
            onClick={() => openDialog('username')}
          >
            <span className="text-lg font-semibold hover:underline">
              {user?.username || 'Set username'}
            </span>
          </div>
          <div
            className="flex flex-1 cursor-pointer"
            onClick={() => openDialog('bio')}
          >
            <p className="text-sm text-gray-500 max-w-xs truncate text-wrap hover:underline">
              {user?.bio || 'Add bio'}
            </p>
          </div>
          <Link
            href={`/${user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm md:text-base text-primary hover:underline max-w-fit overflow-hidden whitespace-nowrap"
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <Input
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mb-4"
          />

          <div>
            <Textarea
              ref={bioRef}
              value={bio}
              onChange={handleBioChange}
              placeholder="Bio"
              className={bioError ? 'border-red-500' : ''}
            />

            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-red-500">{bioError}</p>

              <p
                className={cn('text-xs text-gray-500', {
                  'text-red-500': bio.length > MAX_BIO_LENGTH,
                })}
              >
                {bio.length} / {MAX_BIO_LENGTH}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={bio.length > MAX_BIO_LENGTH}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
