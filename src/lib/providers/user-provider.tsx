'use client';

import React, { useEffect } from 'react';
import { User } from '@/interfaces/User';
import { Link } from '@/interfaces/Link';
import useUserStore from '@/store/userStore';
import useLinkStore from '@/store/linkStore';

interface UserProviderProps {
  user: User;
  links: Link[];
  children: React.ReactNode;
}

export default function UserProvider({
  user,
  links,
  children,
}: UserProviderProps) {
  const { setUser, setUserLoading } = useUserStore();
  const { setLinks, setLinksLoading, setArchivedLinks } = useLinkStore();

  useEffect(() => {
    setUser(user);
    setUserLoading(false);
  }, [user, setUser]);

  useEffect(() => {
    const { active, archived } = links.reduce<{
      active: Link[];
      archived: Link[];
    }>(
      (acc, link) => {
        if (link.archived) {
          acc.archived.push(link);
        } else {
          acc.active.push(link);
        }
        return acc;
      },
      { active: [], archived: [] }
    );

    setLinks(active);
    setArchivedLinks(archived);
    setLinksLoading(false);
  }, [links, setLinks, setArchivedLinks, setUserLoading, setLinksLoading]);

  return <>{children}</>;
}
