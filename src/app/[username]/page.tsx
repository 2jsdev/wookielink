'use client';

import React from 'react';
import { useGetPublicProfileByUsernameQuery } from '@/lib/api/userApi';
import UserNotFound from '@/components/admin/users/UserNotFound';
import UserInfo from '@/components/admin/users/UserInfo';
import LinkList from '@/components/admin/users/LinkList';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function UserPublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { data: userProfile, isLoading } = useGetPublicProfileByUsernameQuery(
    params.username
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto pt-12 px-4 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!userProfile) return <UserNotFound />;

  return (
    <>
      <div className="flex flex-col items-center w-full max-w-md mx-auto pt-12 px-4 pb-32">
        <UserInfo userProfile={userProfile} />
        <LinkList links={userProfile.links || []} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <Button
            variant="outline"
            className="w-auto px-6 py-2 bg-primary text-primary-foreground dark:bg-primary-foreground dark:text-primary border-none rounded-full shadow-lg flex items-center space-x-2 hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all duration-300"
            onClick={() => (window.location.href = 'https://wookiel.ink/')}
          >
            <span className="text-sm font-semibold">
              Join {userProfile.username} on Wookielink
            </span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your own Wookielink page
          </p>
        </div>
      </div>
    </>
  );
}
