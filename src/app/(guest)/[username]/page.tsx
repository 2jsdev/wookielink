import type { Metadata } from 'next';
import { getPublicProfile } from '@/actions/getPublicProfile';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';
import PublicLinkList from './ui/PublicLinkList';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { auth } from '@core/shared/infrastructure/services/auth';

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;
  const user = await getPublicProfile({ username });

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

export default async function PublicProfilePage({ params }: Props) {
  const username = (await params).username;
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

      <div className="flex flex-col items-center w-full max-w-xl mx-auto pt-12 px-4 pb-32">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.image || undefined} alt="Profile photo" />
          <AvatarFallback>
            <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-5 text-lg font-semibold">@{user?.username}</h2>
        <div className="w-full space-y-2 mt-14">
          <PublicLinkList links={user.links || []} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <Link
            href="/"
            className="w-auto px-6 py-2 bg-primary text-primary-foreground dark:bg-primary-foreground dark:text-primary border-none rounded-full shadow-lg flex items-center space-x-2 hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all duration-300"
          >
            <span className="text-sm font-semibold">
              Join {user.username} on Wookielink
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
