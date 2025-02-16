import UserMenu from '@/components/admin/header/user-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeSwitch from '@/components/custom/theme-switch';

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex flex-col">
      <header className="flex h-14 items-center gap-2 border-b bg-background px-4 lg:h-[60px]">
        <SidebarTrigger className="*:size-5" />
        <div className="flex-1" />
        <ThemeSwitch />
        <UserMenu />
      </header>
    </div>
  );
}
