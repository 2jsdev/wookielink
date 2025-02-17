import type { Metadata, ResolvingMetadata } from 'next';
import { getPublicProfile } from '@/actions/getPublicProfile';
import { notFound } from 'next/navigation';
import PublicProfileContent from './ui/PublicProfileContent';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { auth } from '@core/shared/infrastructure/services/auth';

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const username = (await params).username;
  const user = await getPublicProfile({ username: username });

  return {
    title: `${username} | WookieLink`,
    description: 'WookieLink. Make your link do more.',
    openGraph: {
      title: `${username} | WookieLink`,
      description: 'WookieLink. Make your link do more.',
      images: user?.image ? [user.image] : [],
    },
  };
}

export default async function PublicProfilePage({
  params,
  searchParams,
}: Props) {
  const username = (await params).username;
  const share_link = (await searchParams).share_link;


  const user = await getPublicProfile({ username });

  if (!user) {
    notFound();
  }

  const session = await auth();
  const isOwner = session?.user?.username === username;

  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      {isOwner && (
        <Alert className="rounded-none border-0 bg-primary py-5 px-12 text-primary-foreground dark:bg-primary-foreground dark:text-primary">
          <AlertDescription className="flex justify-between w-full">
            <p>✨ This is your WookieLink.</p>
            <Link href="/admin" className="font-semibold hover:underline">
              Edit
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <PublicProfileContent user={user} highlightedLink={share_link} />
    </main>
  );
}
