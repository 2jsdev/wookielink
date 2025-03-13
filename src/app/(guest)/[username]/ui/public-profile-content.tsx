'use client';

import { CSSProperties, useEffect } from 'react';
import { User } from '@/interfaces/user';
import NextLink from 'next/link';
import { UserRound } from 'lucide-react';
import ClassicLinkItem from './classic-link-item';
import FeaturedLinkItem from './featured-link-item';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, generateLighterColor, generateLighterHexColor } from '@/lib/utils';
import useUiStore from '@/store/ui-store';
import { backgroundStyles, backgroundTypes } from '@/interfaces/theme';
import { PolkaSVG } from '@/components/admin/appearance/background/polka-svg';
import { WaveSVG } from '@/components/admin/appearance/background/wave-svg';

interface Props {
  isOwner: boolean;
  user: User;
  highlightedLink?: string | null;
}

export default function PublicProfileContent({
  isOwner,
  user,
  highlightedLink,
}: Props) {
  const { setHighlightedLink } = useUiStore();

  useEffect(() => {
    if (highlightedLink) {
      setHighlightedLink(highlightedLink);
    }
  }, [highlightedLink, setHighlightedLink]);

  const theme = user.theme;
  const fontFamily = theme?.fontStyle?.fontFamily || 'sans-serif';
  const fontColor = theme?.fontStyle?.color || '#000000';

  let backgroundClass = '';
  let backgroundStyle: CSSProperties = {};

  if (
    theme?.background?.type === backgroundTypes.IMAGE &&
    theme?.background?.imageUrl
  ) {
    backgroundStyle = {
      backgroundImage: `url(${theme.background.imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
      position: 'absolute',
    };

    return (
      <main
        className="relative h-full w-full flex flex-col items-center overflow-y-auto"
        style={{ fontFamily, color: fontColor, ...backgroundStyle }}
      >
        <Content user={user} isOwner={isOwner} />
      </main>
    );
  }

  if (theme?.background?.style === backgroundStyles.POLKA) {
    const lighterHexColor = generateLighterHexColor(theme.background.color!);
    backgroundStyle = { backgroundColor: theme.background.color };

    return (
      <main
        className="relative w-full min-h-screen flex flex-col items-center overflow-hidden"
        style={{ fontFamily, color: fontColor, ...backgroundStyle }}
      >
        <div className="absolute inset-0 w-full h-full">
          <PolkaSVG
            style={{
              width: '100%',
              height: '100%',
              color: lighterHexColor,
            }}
          />
        </div>

        <div className="relative w-full flex flex-col items-center overflow-y-auto z-10">
          <Content user={user} isOwner={isOwner} />
        </div>
      </main>
    );
  }

  if (theme?.background?.style === backgroundStyles.WAVES) {
    const lighterHexColor = generateLighterHexColor(theme.background.color!);
    backgroundStyle = { backgroundColor: lighterHexColor };

    return (
      <main
        className="relative min-h-screen w-full flex flex-col items-center"
        style={{ fontFamily, color: fontColor, ...backgroundStyle }}
      >
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <WaveSVG
            style={{
              width: '100%',
              height: '100%',
              color: theme.background.color,
            }}
          />
        </div>

        <div className="relative w-full h-full flex flex-col items-center overflow-y-auto z-10">
          <Content user={user} isOwner={isOwner} />
        </div>
      </main>
    );
  }

  switch (theme?.background?.style) {
    case backgroundStyles.FLAT:
      backgroundStyle.backgroundColor = theme.background.color;
      break;
    case backgroundStyles.COLORUP:
      backgroundStyle.background = `linear-gradient(to top, ${theme.background.color}, ${generateLighterColor(theme.background.color!, 100)})`;
      break;
    case backgroundStyles.COLORDOWN:
      backgroundStyle.background = `linear-gradient(to bottom, ${theme.background.color}, ${generateLighterColor(theme.background.color!, 100)})`;
      break;
    case backgroundStyles.STRIPE:
      backgroundClass = 'pattern-stripe';
      backgroundStyle = {
        ...backgroundStyle,
        '--pattern-color': theme.background.color,
      } as CSSProperties;
      break;
    case backgroundStyles.ZIGZAG:
      backgroundClass = 'pattern-zigzag';
      backgroundStyle = {
        ...backgroundStyle,
        '--pattern-color': theme.background.color,
      } as CSSProperties;
      break;
    default:
      backgroundClass = 'bg-gray-100';
  }

  return (
    <main
      className={cn(
        'min-h-screen w-full flex flex-col items-center',
        backgroundClass
      )}
      style={{ fontFamily, color: fontColor, ...backgroundStyle }}
    >
      <div className="absolute h-full w-full overflow-y-auto">
        <Content user={user} isOwner={isOwner} />
      </div>
    </main>
  );
}

function Content({ user, isOwner }: { user: User; isOwner: boolean }) {
  const { isBlurred } = useUiStore();

  return (
    <>
      {isOwner && (
        <Alert className="rounded-none border-0 bg-primary py-5 px-12 text-primary-foreground dark:bg-primary-foreground dark:text-primary">
          <AlertDescription className="flex justify-between w-full">
            <p>✨ This is your Wookielink.</p>
            <NextLink href="/admin" className="font-semibold hover:underline">
              Edit
            </NextLink>
          </AlertDescription>
        </Alert>
      )}

      <div className="relative flex flex-col items-center w-full max-w-xl mx-auto pt-20">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.image || undefined} alt="Profile photo" />
          <AvatarFallback>
            <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-5 text-lg font-semibold">@{user?.username}</h2>

        {isBlurred && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-10 transition-opacity duration-500" />
        )}

        <div className="w-full min-h-[300px] space-y-6 mt-14 relative z-20 flex flex-col items-center justify-center">
          {user.links?.map((link) =>
            link.layout === 'Classic' ? (
              <ClassicLinkItem key={link.id} link={link} theme={user.theme!} />
            ) : (
              <FeaturedLinkItem key={link.id} link={link} theme={user.theme!} />
            )
          )}
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center my-8">
          <NextLink
            href="/"
            className="w-auto px-6 py-4 bg-primary text-primary-foreground dark:bg-primary-foreground dark:text-primary border-none rounded-full shadow-lg flex items-center space-x-2 hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all duration-300"
          >
            <span className="text-sm font-semibold">
              Join {user.username} on Wookielink
            </span>
          </NextLink>
        </div>
      </div>
    </>
  );
}
