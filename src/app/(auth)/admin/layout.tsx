import { Metadata } from 'next';
import UserProvider from '@/lib/providers/user-provider';
import { getUserLinks } from '@/actions/get-user-links';
import { getUserProfile } from '@/actions/get-user-profile';
import { getUserTheme } from '@/actions/get-user-theme';

export const metadata: Metadata = {
  title: 'Wookielink Admin',
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userProfile = await getUserProfile();
  const links = await getUserLinks();
  const theme = await getUserTheme();

  return (
    <UserProvider user={userProfile} links={links} theme={theme}>
      {children}
    </UserProvider>
  );
}
