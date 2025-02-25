'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeSwitch from './custom/theme-switch';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { homeSections } from '@/config/home-sections';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data: session } = useSession({ required: false });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRedirect = () => {
    if (session) {
      router.push('/admin');
    } else {
      router.push('/login');
    }
    setIsDrawerOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsDrawerOpen(false);
  };

  const handleScrollToSection = (id: string) => {
    const section = document.querySelector(`#${id}`);
    if (section) {
      const yOffset = -80;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
      setIsDrawerOpen(false);
    }
  };

  const NavItems = () => (
    <>
      {homeSections
        .filter((section) => section.showInNav)
        .map((section) => (
          <button
            key={section.id}
            onClick={() => handleScrollToSection(section.id)}
            className="text-sm sm:text-base font-medium hover:text-purple-500 transition-colors"
          >
            {section.label}
          </button>
        ))}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleScrollToTop}
        >
          <Image
            src="/wookie.png"
            alt="Wookielink Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold">Wookielink</span>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex space-x-6">
            <NavItems />
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <Button variant="default" onClick={handleRedirect}>
              {session ? 'Go to Dashboard' : 'Sign In'}
            </Button>
          )}
          <ThemeSwitch />

          {isMobile && (
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavItems />
                  <Button
                    variant="default"
                    onClick={handleRedirect}
                    className="mt-4"
                  >
                    {session ? 'Go to Dashboard' : 'Sign In'}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
