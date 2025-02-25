import { redirect } from 'next/navigation';
import { getUsernameByShortCode } from '@/actions/get-username-by-short-code';

interface Props {
  params: Promise<{ shortCode: string }>;
}

export default async function ShortCodeRedirectPage({ params }: Props) {
  const shortCode = (await params).shortCode;
  const username = await getUsernameByShortCode({ shortCode });

  if (!username) {
    return redirect('/404');
  }

  const newUrl = `/${username}?share_link=${shortCode}`;

  redirect(newUrl);
}
