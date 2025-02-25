import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/actions/sign-in-with-google';

interface GoogleSignInButtonProps {
  children: ReactNode;
}

export const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
}) => {
  return (
    <Button
      onClick={async () => {
        await signInWithGoogle();
      }}
      className="w-full"
    >
      {children}
    </Button>
  );
};
