'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';

interface AuthWrapperProps {
  setIsSignup: (isSignup: boolean) => void;
}

function AuthWrapper({ setIsSignup }: AuthWrapperProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get('state');
    setIsSignup(state === 'signup');
  }, [searchParams, setIsSignup]);

  return null;
}

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full lg:w-1/2 flex-col">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            Wookielink
          </Link>
        </div>

        <div className="flex flex-grow items-center justify-center p-8 lg:p-12">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthWrapper setIsSignup={setIsSignup} />
          </Suspense>
          <AuthForm isSignup={isSignup} />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2">
        <div className="relative w-full h-full">
          <Image
            alt="Cover image"
            src={
              isSignup ? '/images/signup-cover.jpg' : '/images/login-cover.jpg'
            }
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
