import { cookies } from 'next/headers';

import PreviewLayout from '@/components/preview-layout';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieStoreValue = cookieStore.get('sidebar:state')?.value;

  return (
    <SidebarProvider
      defaultOpen={cookieStoreValue ? JSON.parse(cookieStoreValue) : true}
    >
      <PreviewLayout>{children}</PreviewLayout>
    </SidebarProvider>
  );
}
