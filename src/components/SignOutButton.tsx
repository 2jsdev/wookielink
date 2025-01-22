'use client';

import { FC } from 'react';
import { doSignOut } from '@/@core/infra/actions/auth';
import { LogOut } from 'lucide-react';

export const SignOutButton: FC = () => {
  return (
    <form action={doSignOut}>
      <button type="submit" className="w-full text-left flex items-center">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </button>
    </form>
  );
};
