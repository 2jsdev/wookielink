import type { Metadata } from 'next';
import { getPublicProfile } from '@/actions/getPublicProfile';
import { notFound } from 'next/navigation';
import PublicProfileContent from './ui/PublicProfileContent';
import { auth } from '@core/shared/infrastructure/services/auth';

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;
  const user = await getPublicProfile({ username: username });

  return {
    title: `${username} | Wookielink`,
    description: 'Wookielink. Make your link do more.',
    openGraph: {
      title: `${username} | Wookielink`,
      description: 'Wookielink. Make your link do more.',
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
    <PublicProfileContent
      isOwner={isOwner}
      user={user}
      highlightedLink={share_link}
    />
  );
}
