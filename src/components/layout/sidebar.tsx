'use client';

import Icon from '@/components/icon';
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserRound } from 'lucide-react';
import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { page_routes } from '@/lib/routes-config';
import { useGetUserProfileQuery } from '@/lib/api/userApi';

export default function Sidebar() {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  const { data: userProfile } = useGetUserProfileQuery();

  useEffect(() => {
    if (isMobile) toggleSidebar();
  }, [isMobile, pathname, toggleSidebar]);

  return (
    <SidebarContainer collapsible="icon" className="flex flex-col h-screen">
      <SidebarHeader className="h-16 flex items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 flex items-center justify-center gap-2 group-data-[collapsible=icon]:justify-center">
              <Logo className="me-2 group-data-[collapsible=icon]:me-0" />
              <div className="truncate font-semibold text-lg group-data-[collapsible=icon]:hidden">
                WookieLink
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-hidden">
        <ScrollArea className="mx-2">
          <SidebarMenu>
            {page_routes.map((item, index) => (
              <SidebarMenuItem key={index} className="mt-2">
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname === item.href}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link href={item.href}>
                    {item.icon && <Icon name={item.icon} className="w-6 h-6" />}
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="w-8 h-8 shrink-0 group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6">
            <AvatarImage src={userProfile?.image} alt="User avatar" />
            <AvatarFallback className="rounded-full">
              <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm truncate group-data-[collapsible=icon]:hidden">
            @{userProfile?.username}
          </span>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
}
