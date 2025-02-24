import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="mb-8">
          <div>
            <Image
              src="/wookie.png"
              alt="Wookielink Logo"
              width={48}
              height={52}
              priority
            />
          </div>
        </div>

        <h1 className="text-xl font-medium text-center mb-4">
          The page you&apos;re looking for doesn&apos;t exist.
        </h1>

        <p className="text-center text-muted-foreground">
          Want this to be your username?{' '}
          <Link
            href={{
              pathname: '/login',
              query: { state: 'signup' },
            }}
            className="text-primary hover:underline font-medium"
          >
            Create your Wookielink now.
          </Link>
        </p>
      </div>

      <footer className="w-full flex items-center justify-center text-muted-foreground text-sm">
        <span className="mr-2">Wookielink</span>
        <div>
          <Image
            src="/wookie.png"
            alt="Wookielink Logo"
            width={16}
            height={16}
          />
        </div>
      </footer>
    </div>
  );
}
