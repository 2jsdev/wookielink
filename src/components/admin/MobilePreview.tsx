'use client';

import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '@/lib/api/userApi';
import { useGetLinksQuery } from '@/lib/api/linksApi';
import { selectLinks } from '@/lib/store/slices/linksSlice';
import { PhoneMockup } from '@/components/PhoneMockup';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import LinkList from './users/LinkList';

export default function MobilePreview() {
  const { isLoading: isLinksLoading } = useGetLinksQuery();
  const { data: userProfile, isLoading: isProfileLoading } =
    useGetUserProfileQuery();

  const links = useSelector(selectLinks);

  const visibleLinks = links.filter((link) => !link.archived && link.visible);

  return (
    <aside className="bg-background">
      <PhoneMockup>
        <div className="flex flex-col items-center justify-center space-y-4">
          {isProfileLoading || isLinksLoading ? (
            <>
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <div className="w-full space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </>
          ) : (
            <>
              <Avatar className="w-24 h-24">
                <AvatarImage src={userProfile?.image} alt="Profile photo" />
                <AvatarFallback>
                  <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">
                @{userProfile?.username}
              </h2>
              <div className="w-full space-y-2">
                <LinkList
                  links={visibleLinks || []}
                  userProfile={userProfile}
                />
              </div>
            </>
          )}
        </div>
      </PhoneMockup>
    </aside>
  );
}
