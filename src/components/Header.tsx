'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ThemeSwitch from '@/components/layout/header/theme-switch';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { data: session } = useSession({ required: false });

  const handleRedirect = (state?: string) => {
    if (session) {
      router.push('/admin');
    } else {
      const queryParams = new URLSearchParams();
      if (state) queryParams.append('state', state);

      const url = `/login${queryParams.toString() ? `?${queryParams}` : ''}`;
      router.push(url);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      const yOffset = -80;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
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

        <nav className="flex space-x-6">
          <button
            className="text-sm sm:text-base font-medium hover:text-purple-500 transition-colors"
            onClick={() => handleScrollToSection('#features')}
          >
            Features
          </button>
          <button
            className="text-sm sm:text-base font-medium hover:text-purple-500 transition-colors"
            onClick={() => handleScrollToSection('#pricing')}
          >
            Pricing
          </button>
          <button
            className="text-sm sm:text-base font-medium hover:text-purple-500 transition-colors"
            onClick={() => handleScrollToSection('#faq')}
          >
            FAQ
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="default" onClick={() => handleRedirect()}>
            {session ? 'Go to Dashboard' : 'Sign In'}
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
