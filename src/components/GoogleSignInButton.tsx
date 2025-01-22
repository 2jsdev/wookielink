import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { googleSignIn } from '@/@core/infra/actions/auth';

interface GoogleSignInButtonProps {
  children: ReactNode;
}

export const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
}) => {
  return (
    <Button
      onClick={async () => {
        await googleSignIn();
      }}
      className="w-full"
    >
      {children}
    </Button>
  );
};
