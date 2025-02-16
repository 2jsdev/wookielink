import UserProvider from '@/lib/providers/user-provider';
import { getUserLinks } from '@/actions/getUserLinks';
import { getUserProfile } from '@/actions/getUserProfile';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userProfile = await getUserProfile();
  const links = await getUserLinks();

  return (
    <UserProvider user={userProfile} links={links}>
      {children}
    </UserProvider>
  );
}
