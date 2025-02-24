'use client';

import React, { useEffect } from 'react';
import { User } from '@/interfaces/User';
import { Link } from '@/interfaces/Link';
import { Theme } from '@/interfaces/Theme';
import useUserStore from '@/store/userStore';
import useLinkStore from '@/store/linkStore';
import useThemeStore from '@/store/theme-store';

interface UserProviderProps {
  user: User;
  links: Link[];
  theme: Theme;
  children: React.ReactNode;
}

export default function UserProvider({
  user,
  links,
  theme,
  children,
}: UserProviderProps) {
  const { setUser, setUserLoading } = useUserStore();
  const { setLinks, setLinksLoading, setArchivedLinks } = useLinkStore();
  const { setCustomTheme, setCustomThemeLoading } = useThemeStore();

  useEffect(() => {
    setUser(user);
    setUserLoading(false);
  }, [user, setUser, setUserLoading]);

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

  useEffect(() => {
    setCustomTheme(theme);
    setCustomThemeLoading(false);
  }, [theme, setCustomTheme, setCustomThemeLoading]);

  return <>{children}</>;
}
