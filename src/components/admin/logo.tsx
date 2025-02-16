import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <Image
        src="/wookie.png"
        className="hidden w-6 dark:block"
        alt="wookieLink light logo"
        width={24}
        height={34}
      />
      <Image
        src="/wookie.png"
        className="block w-6 dark:hidden"
        alt="wookieLink logo"
        width={24}
        height={34}
      />
    </Link>
  );
}
