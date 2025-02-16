'use client';

import { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LinkList from '@/components/admin/preview/LinkList';
import { PhoneMockup } from '@/components/admin/PhoneMockup';
import { Skeleton } from '@/components/ui/skeleton';
import useUserStore from '@/store/userStore';
import useLinkStore from '@/store/linkStore';
import { Link } from '@/interfaces/Link';

export default function MobilePreview() {
  const { user } = useUserStore();
  const { links } = useLinkStore();

  const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (!links) return;
    setVisibleLinks(links.filter((link) => !link.archived && link.active));
  }, [links]);

  return (
    <aside className="bg-background">
      <PhoneMockup>
        <div className="flex flex-col items-center justify-center space-y-4">
          {!user || !links ? (
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
                <AvatarImage
                  src={user?.image || undefined}
                  alt="Profile photo"
                />
                <AvatarFallback>
                  <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">@{user?.username}</h2>
              <div className="w-full space-y-2 mb-48">
                <LinkList links={visibleLinks || []} />
              </div>
            </>
          )}
        </div>
      </PhoneMockup>
    </aside>
  );
}
