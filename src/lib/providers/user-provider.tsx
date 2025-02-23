'use client';

import React, { useEffect } from 'react';
import { User } from '@/interfaces/User';
import { Link } from '@/interfaces/Link';
import useUserStore from '@/store/userStore';
import useLinkStore from '@/store/linkStore';
import useThemeStore from '@/store/theme-store';

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
  const { setTheme } = useThemeStore();

  useEffect(() => {
    setUser(user);
    setUserLoading(false);
  }, [user, setUser, setUserLoading]);

  useEffect(() => {
    setTheme({
      id: 'custom',
      name: 'Custom',
      premium: false,
      background: {
        type: 'COLOR',
        style: 'FLAT',
        color: '#f3f4f6',
      },
      buttonStyle: {
        type: 'FILL',
        backgroundColor: '#f3f4f6',
        shadowColor: '#f3f4f6',
        textColor: '#000000',
      },
      fontStyle: {
        fontFamily: 'inter',
        color: '#000000',
      },
    });
  }, [setTheme]);

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
