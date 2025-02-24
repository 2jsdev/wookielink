import { Metadata } from 'next';
import UserProvider from '@/lib/providers/user-provider';
import { getUserLinks } from '@/actions/getUserLinks';
import { getUserProfile } from '@/actions/getUserProfile';
import { getUserTheme } from '@/actions/getUserTheme';


export const metadata: Metadata = {
  title: 'Wookielink Admin'
}

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
