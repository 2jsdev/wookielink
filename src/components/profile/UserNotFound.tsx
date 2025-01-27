import Image from 'next/image';
import Link from 'next/link';

export default function UserNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Image src="/wookie.png" alt="WookieLink Logo" width={48} height={52} />
      </div>

      <h1 className="text-xl font-medium text-center mb-4">
        The page you&apos;re looking for doesn&apos;t exist.
      </h1>

      <p className="text-center text-muted-foreground">
        Want this to be your username?{' '}
        <Link
          href="/signup"
          className="text-primary hover:underline font-medium"
        >
          Create your WookieLink now.
        </Link>
      </p>
    </div>
  );
}
