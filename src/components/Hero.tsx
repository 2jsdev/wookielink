'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCheckUsernameAvailabilityQuery } from '@/lib/api/userApi';
import { Loader } from '@/components/ui/loader';
import { ArrowRight, Check, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { DynamicMockPhone } from './ui/custom/DynamicMockPhone';

export function Hero() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [debouncedUsername, setDebouncedUsername] = useState('');

  const { data, isLoading, isError } = useCheckUsernameAvailabilityQuery(
    debouncedUsername,
    {
      skip: !debouncedUsername,
    }
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username);
    }, 500);
    return () => clearTimeout(handler);
  }, [username]);

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
      const yOffset = -80; // Altura de compensación
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  const isButtonDisabled =
    !data?.isAvailable || isLoading || isError || !username;

  return (
    <section className="flex flex-col justify-center items-center h-screen px-6 text-center relative">
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
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    wookiel.ink/
                  </div>
                  <Input
                    type="text"
                    placeholder="yourname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-[100px] pr-10"
                    aria-label="Enter your desired username"
                    autoComplete="off"
                  />
                  <div className="absolute top-1/2 right-0 flex items-center pr-3 -translate-y-1/2">
                    {isLoading ? (
                      <Loader className="h-5 w-5" />
                    ) : (
                      username &&
                      (!!data?.isAvailable ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      ))
                    )}
                  </div>
                  {username && !isLoading && data && (
                    <p
                      className={`absolute top-full mt-1 text-sm ${
                        data.isAvailable ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {data.isAvailable
                        ? 'Username is available'
                        : 'Username is not available'}
                    </p>
                  )}
                </div>

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
