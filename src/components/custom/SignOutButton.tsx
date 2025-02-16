'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export const SignOutButton: FC = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left flex items-center"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </button>
  );
};
