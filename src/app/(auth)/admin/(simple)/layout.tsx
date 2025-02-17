import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from '@/components/admin/sidebar';
import Header from '@/components/admin/header';
import SimpleLayout from '@/components/simple-layout';

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
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <Header />
          <SimpleLayout>{children}</SimpleLayout>
        </div>
      </div>
    </SidebarProvider>
  );
}
