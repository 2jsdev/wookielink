import ThemeSwitch from './theme-switch';
import UserMenu from './user-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

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
