'use client';
import useMobilePreviewStore from '@/store/mobile-preview-store';
import UserMenu from '@/components/admin/header/user-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeSwitch from '@/components/custom/theme-switch';
import { Button } from '@/components/ui/button';
import { useMobilePreviewVisibility } from '@/hooks/use-mobile-preview-visibility';
import { Eye } from 'lucide-react';

export default function Header() {
  const { openPreview } = useMobilePreviewStore();
  const isHidden = useMobilePreviewVisibility();

  return (
    <div className="sticky top-0 z-10 flex flex-col">
      <header className="flex h-14 items-center gap-2 border-b bg-background px-4 lg:h-[60px]">
        <SidebarTrigger className="*:size-5" />
        <div className="flex-1" />

        {isHidden && (
          <Button
            variant="outline"
            size="sm"
            className="text-sm px-3 py-1"
            onClick={() => openPreview()}
          >
            <Eye size={16} />
            View
          </Button>
        )}

        <ThemeSwitch />
        <UserMenu />
      </header>
    </div>
  );
}
