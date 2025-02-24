import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginContent from './ui/LoginContent';

export const metadata: Metadata = {
  title: 'Log in or Sign Up | Wookielink'
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
