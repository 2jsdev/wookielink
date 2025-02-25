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
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserRound } from 'lucide-react';
import Logo from '@/components/admin/logo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { page_routes } from '@/lib/routes-config';
import useUserStore from '@/store/user-store';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <SidebarContainer collapsible="icon" className="flex flex-col h-screen">
      <SidebarHeader className="h-16 flex items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 flex items-center justify-center gap-2 group-data-[collapsible=icon]:justify-center">
              <Logo className="me-2 group-data-[collapsible=icon]:me-0" />
              <div className="truncate font-semibold text-lg group-data-[collapsible=icon]:hidden">
                Wookielink
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
                  className="flex items-center gap-3 p-2 rounded-md"
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

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center space-x-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="w-8 h-8 shrink-0 group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6">
            <AvatarImage src={user?.image || undefined} alt="User avatar" />
            <AvatarFallback className="rounded-full">
              <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm truncate group-data-[collapsible=icon]:hidden">
            @{user?.username}
          </span>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
}
