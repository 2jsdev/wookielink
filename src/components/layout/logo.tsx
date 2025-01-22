import Link from 'next/link';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <img
        src="/wookie.png"
        className="hidden w-6 dark:block"
        alt="wookieLink light logo"
      />
      <img
        src="/wookie.png"
        className="block w-6 dark:hidden"
        alt="wookieLink logo"
      />
    </Link>
  );
}
