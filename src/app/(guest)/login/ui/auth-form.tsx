'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleSignInButton } from '@/components/custom/google-signIn-button';
import { UsernameInput } from '@/components/custom/username-input';

interface AuthFormProps {
  isSignup: boolean;
}

export default function AuthForm({ isSignup }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [usernameAvailability, setUsernameAvailability] = useState<boolean | null>(null);

  useEffect(() => {
    if (isSignup) {
      const cookies = document.cookie.split('; ');
      const usernameCookie = cookies.find((row) => row.startsWith('username='));
      if (usernameCookie) {
        setUsername(usernameCookie.split('=')[1]);
      }
    }
  }, [isSignup]);

  const handleSignUp = () => {
    if (!username || usernameAvailability !== true) return;
    document.cookie = `username=${username}; path=/`;
  };

  const isButtonDisabled = isSignup && (!username || usernameAvailability !== true);

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {isSignup ? 'Create a Wookielink for free' : 'Welcome back!'}
        </h1>
        <p className="text-muted-foreground">
          {isSignup
            ? 'Join 50M+ people using Wookielink to curate links, grow their audience, and sell products.'
            : 'Log in to your Wookielink'}
        </p>
      </div>

      {isSignup && (
        <UsernameInput
          value={username}
          onChange={setUsername}
          onAvailabilityChange={setUsernameAvailability}
        />
      )}

      <GoogleSignInButton disabled={isButtonDisabled} onClick={handleSignUp}>
        {isSignup ? 'Sign up with Google' : 'Log in with Google'}
      </GoogleSignInButton>

      <div className="text-center text-sm">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/login?state=signup" className="underline">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
