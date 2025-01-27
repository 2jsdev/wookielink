'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeSwitch from '@/components/layout/header/theme-switch';
import { useCheckUsernameAvailabilityQuery } from '@/lib/api/userApi';
import { Loader } from '@/components/ui/loader';
import { ArrowRight, Check, X, Globe, LinkIcon, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function LandingPage() {
  const { theme } = useTheme();
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

  const isButtonDisabled =
    !data?.isAvailable || isLoading || isError || !username;

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white'
          : 'bg-gradient-to-br from-purple-100 via-white to-purple-300 text-black'
      }`}
    >
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/wookie.png"
              alt="Wookielink Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold">Wookielink</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleRedirect()}>
              Sign In
            </Button>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 flex-1"
          >
            <Badge variant="secondary" className="mb-4">
              Launch Offer - Claim Your Wookielink Today
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold">
              Your one link for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
                everything
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Share your links, social profiles, contact info, and more on one
              beautiful page. Join thousands of creators using Wookielink to
              share their content.
            </p>
            <div className="flex justify-center lg:justify-start space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-purple-400" />
                <span className="text-purple-400">100k+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <LinkIcon className="h-5 w-5 text-purple-400" />
                <span className="text-purple-400">1M+ Links</span>
              </div>
              <div className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-purple-400" />
                <span className="text-purple-400">10M+ Shares</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md flex-1"
          >
            <div
              className={`rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-violet-900/80 backdrop-blur border-gray-600 text-white shadow-lg'
                  : 'bg-white/90 border-purple-300 text-black shadow-xl'
              } p-8`}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Claim your Wookielink
              </h2>
              <div className="space-y-6">
                <div className="relative">
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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
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
                </div>
                {username && !isLoading && data && (
                  <p
                    className={`text-sm text-center ${
                      data.isAvailable ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {data.isAvailable
                      ? 'Username is available'
                      : 'Username is not available'}
                  </p>
                )}
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                  size="lg"
                  onClick={() => handleRedirect('signup')}
                  disabled={isButtonDisabled}
                >
                  Claim your Wookielink
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-center text-gray-400">
                  By signing up, you agree to our{' '}
                  <Link
                    href="/terms"
                    className="underline underline-offset-2 hover:text-purple-300"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-purple-300"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
