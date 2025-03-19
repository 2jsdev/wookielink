import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/actions/sign-in-with-google';

interface GoogleSignInButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      onClick={async () => {
        if (!disabled) {
          if (onClick) onClick();
          await signInWithGoogle();
        }
      }}
      disabled={disabled}
      className="w-full"
    >
      {children}
    </Button>
  );
};
