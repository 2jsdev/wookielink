'use client';

import { useEffect } from 'react';
import { User } from '@/interfaces/User';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';
import ClassicLinkItem from './ClassicLinkItem';
import FeaturedLinkItem from './FeaturedLinkItem';
import useUiStore from '@/store/uiStore';

interface Props {
  user: User;
  highlightedLink?: string | null;
}

export default function PublicProfileContent({ user, highlightedLink }: Props) {
  const { isBlurred, setHighlightedLink } = useUiStore();

  useEffect(() => {
    if (highlightedLink) {
      setHighlightedLink(highlightedLink);
    }
  }, [highlightedLink, setHighlightedLink]);

  return (
    <div className="relative flex flex-col items-center w-full max-w-xl mx-auto pt-12 px-4 pb-32">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user?.image || undefined} alt="Profile photo" />
        <AvatarFallback>
          <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <h2 className="mt-5 text-lg font-semibold">@{user?.username}</h2>

      {isBlurred && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-10 transition-opacity duration-500" />
      )}

      <div className="w-full space-y-2 mt-14 relative z-20">
        {user.links?.map((link) => {
          return link.layout === 'Classic' ? (
            <ClassicLinkItem key={link.id} link={link} />
          ) : (
            <FeaturedLinkItem key={link.id} link={link} />
          );
        })}
      </div>
    </div>
  );
}
