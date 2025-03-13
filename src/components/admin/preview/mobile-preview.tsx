'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LinkList from '@/components/admin/preview/link-list';
import { PhoneMockup } from '@/components/admin/phone-mockup';
import { Skeleton } from '@/components/ui/skeleton';
import useUserStore from '@/store/user-store';
import useLinkStore from '@/store/link-store';
import { Link } from '@/interfaces/link';
import useThemeStore from '@/store/theme-store';
import { backgroundStyles, backgroundTypes } from '@/interfaces/theme';
import { generateLighterColor, generateLighterHexColor } from '@/lib/utils';
import { PolkaSVG } from '@/components/admin/appearance/background/polka-svg';
import { WaveSVG } from '@/components/admin/appearance/background/wave-svg';

export default function MobilePreview() {
  const { theme, customTheme } = useThemeStore();

  const activeTheme = theme || customTheme;

  const fontFamily = activeTheme?.fontStyle?.fontFamily || 'sans-serif';
  const fontColor = activeTheme?.fontStyle?.color || '#000000';

  let backgroundClass = '';
  let backgroundStyle: CSSProperties = {};

  if (activeTheme?.background?.type === backgroundTypes.IMAGE) {
    const imageUrl = activeTheme.background.imageUrl;

    const backgroundStyle: CSSProperties = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
      position: 'absolute',
    };

    return (
      <aside className="bg-background">
        <PhoneMockup>
          <div
            className="relative h-full w-full flex flex-col items-center overflow-y-auto"
            style={{
              fontFamily,
              color: fontColor,
              ...backgroundStyle,
            }}
          >
            <Content />
          </div>
        </PhoneMockup>
      </aside>
    );
  }

  if (activeTheme?.background?.style === backgroundStyles.POLKA) {
    const lighterHexColor = generateLighterHexColor(activeTheme.background.color!);
    backgroundStyle = { backgroundColor: activeTheme.background.color };

    return (
      <aside className="bg-background">
        <PhoneMockup>
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <PolkaSVG
                style={{
                  width: '100%',
                  height: '100%',
                  fontFamily,
                  color: lighterHexColor,
                  ...backgroundStyle
                }}
              />
            </div>

            <div
              className="relative w-full h-full flex flex-col items-center overflow-y-auto z-10"
              style={{ fontFamily, color: lighterHexColor }}
            >
              <Content />
            </div>
          </div>
        </PhoneMockup>
      </aside>
    );
  }



  if (activeTheme?.background?.style === backgroundStyles.WAVES) {
    const lighterHexColor = generateLighterHexColor(
      activeTheme.background.color!
    );
    backgroundStyle = { backgroundColor: lighterHexColor };
    return (
      <aside className="bg-background">
        <PhoneMockup>
          <div
            className="h-full w-full flex flex-col items-center"
            style={{ fontFamily, color: fontColor, ...backgroundStyle }}
          >
            <div className="absolute w-full h-full">
              <WaveSVG style={{ color: activeTheme.background.color }} />
            </div>
            <Content />
          </div>
        </PhoneMockup>
      </aside>
    );
  }

  switch (activeTheme?.background?.style) {
    case backgroundStyles.FLAT:
      backgroundStyle.backgroundColor = activeTheme.background.color;
      break;
      case backgroundStyles.COLORUP:
        backgroundStyle.background = `linear-gradient(to top, ${activeTheme.background.color}, ${generateLighterColor(activeTheme.background.color!, 100)})`;
        break;
      case backgroundStyles.COLORDOWN:
        backgroundStyle.background = `linear-gradient(to bottom, ${activeTheme.background.color}, ${generateLighterColor(activeTheme.background.color!, 100)})`;
        break;    
    case backgroundStyles.STRIPE:
      backgroundClass = 'pattern-stripe';
      backgroundStyle = {
        ...backgroundStyle,
        '--pattern-color': activeTheme.background.color,
      } as CSSProperties;
      break;
    case backgroundStyles.ZIGZAG:
      backgroundClass = 'pattern-zigzag';
      backgroundStyle = {
        ...backgroundStyle,
        '--pattern-color': activeTheme.background.color,
      } as CSSProperties;
      break;
    default:
      backgroundClass = 'bg-gray-100';
  }

  return (
    <aside className="bg-background">
      <PhoneMockup>
        <div
          className={`h-full w-full flex flex-col items-center ${backgroundClass}`}
          style={{ fontFamily, color: fontColor, ...backgroundStyle }}
        >
          <div className="absolute h-full w-full overflow-y-auto">
            <Content />
          </div>
        </div>
      </PhoneMockup>
    </aside>
  );
}

function Content() {
  const { user } = useUserStore();
  const { links } = useLinkStore();

  const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (!links) return;
    setVisibleLinks(links.filter((link) => !link.archived && link.active));
  }, [links]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full py-11 px-4 z-10">
      {!user || !links ? (
        <>
          <Skeleton className="w-20 h-20 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <div className="w-full space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </>
      ) : (
        <>
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.image || undefined} alt="Profile photo" />
            <AvatarFallback>
              <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">@{user?.username}</h2>
          <div className="w-full space-y-2 mb-48">
            <LinkList links={visibleLinks || []} />
          </div>
        </>
      )}
    </div>
  );
}
