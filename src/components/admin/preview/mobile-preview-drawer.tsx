'use client';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import useMobilePreviewStore from '@/store/mobile-preview-store';
import MobilePreview from './mobile-preview';
import { cn } from '@/lib/utils';

export default function MobilePreviewDrawer() {
  const { isOpen, closePreview } = useMobilePreviewStore();

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && closePreview()}>
      <DrawerContent
        className={cn(
          'w-full h-full bg-background shadow-lg transition-transform transform',
          'backdrop-blur-lg flex '
        )}
      >
        <div className="flex flex-col h-full w-full">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Mobile Preview</DrawerTitle>
          </DrawerHeader>

          <div className="flex items-center justify-center h-full w-full">
            <MobilePreview />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
