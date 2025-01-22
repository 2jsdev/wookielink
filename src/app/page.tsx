'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeSwitch from '@/components/layout/header/theme-switch';
import { useCheckUsernameAvailabilityQuery } from '@/lib/api/userApi';
import { Loader } from '@/components/ui/loader';

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [debouncedUsername, setDebouncedUsername] = useState('');

  // Prefix always fixed as 'wookiel.ink/'
  const prefix = 'wookiel.ink/';

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-background border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/wookie.png"
              alt="Wookielink Logo"
              width={30}
              height={30}
            />
            <span className="text-2xl font-bold text-primary">Wookielink</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleRedirect()}>
              Sign In
            </Button>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Your one link
            <br />
            for everything
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Share your links, social profiles, contact info and
            <br />
            more on one page
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow w-full sm:w-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                {prefix}
              </span>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-[103px] pr-10"
                aria-label="Enter your desired username"
                autoComplete="off"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {isLoading ? (
                  <Loader />
                ) : (
                  username && (
                    <div
                      className={`h-2 w-2 rounded-full ${data?.isAvailable && !isError ? 'bg-green-500' : 'bg-red-500'}`}
                    ></div>
                  )
                )}
              </div>
            </div>
            <Button
              onClick={() => handleRedirect('signup')}
              disabled={isButtonDisabled}
            >
              Claim your Wookielink
            </Button>
          </div>
          {username && !isLoading && data && (
            <p
              className={`text-sm mt-2 ${data?.isAvailable && !isError ? 'text-green-500' : 'text-red-500'}`}
            >
              {data?.isAvailable && !isError
                ? 'Username is available'
                : 'Username is not available'}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
