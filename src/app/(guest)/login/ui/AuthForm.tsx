'use client';

import Link from 'next/link';
import { GoogleSignInButton } from '@/components/custom/GoogleSignInButton';

interface AuthFormProps {
  isSignup: boolean;
}

export default function AuthForm({ isSignup }: AuthFormProps) {
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

      <GoogleSignInButton>
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
