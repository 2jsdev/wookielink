'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { DynamicMockPhone } from '@/components/custom/DynamicMockPhone';
import { UsernameInput } from './custom/UsernameInput';

export function Hero() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [usernameAvailability, setUsernameAvailability] = useState<
    boolean | null
  >(null);

  const handleRedirect = (state?: 'signup') => {
    const queryParams = new URLSearchParams();
    if (state) queryParams.append('state', state);
    if (username) document.cookie = `username=${username}; path=/`;
    const url = `/login${queryParams.toString() ? `?${queryParams}` : ''}`;
    router.push(url);
  };

  const handleScrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      const yOffset = -80;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  // El botón se deshabilita si no hay username o si el username no está disponible (availability !== true)
  const isButtonDisabled = !username || usernameAvailability !== true;

  return (
    <section
      id="hero"
      className="flex flex-col justify-center items-center h-screen px-6 text-center relative"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <DynamicMockPhone />
        <div className="flex flex-col gap-12 flex-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6"
          >
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-500 text-white"
            >
              Launch Offer - Claim Your Wookielink Today
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Everything you are. In one{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
                simple link
              </span>
              .
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Share your links, social profiles, contact info, and more on one
              beautiful page. Join thousands of creators using Wookielink to
              share their content.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="space-y-6">
              <div className="relative flex items-center gap-3">
                <UsernameInput
                  value={username}
                  onChange={setUsername}
                  onAvailabilityChange={setUsernameAvailability}
                />
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                  size="lg"
                  onClick={() => handleRedirect('signup')}
                  disabled={isButtonDisabled}
                >
                  Claim
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute bottom-16 flex flex-col items-center cursor-pointer"
        onClick={() => handleScrollToSection('#features')}
      >
        <ChevronDown className="h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-400">Scroll down</p>
      </motion.div>
    </section>
  );
}
