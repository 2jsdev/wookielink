'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/link';
import { MoreVertical, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useThemeStore from '@/store/theme-store';
import {
  getButtonStyleProps,
  getFeaturedLinkPreviewClass,
} from '@/lib/button-utils';

export default function FeaturedLinkItem({ link }: { link: Link }) {
  const [hovered, setHovered] = useState(false);
  const { customTheme } = useThemeStore();

  const {
    isOutline,
    isFill,
    isHardShadow,
    isSoftShadow,
    selectedColor,
    shadowColor,
    textColor,
  } = getButtonStyleProps(customTheme);

  const buttonStyleClass = getFeaturedLinkPreviewClass(
    customTheme?.buttonStyle?.type
  );

  let dynamicStyle: React.CSSProperties = {};
  let dynamicTextColor = textColor;

  if (isOutline) {
    dynamicStyle = {
      border:
        !hovered && !link.thumbnail ? `1px solid ${selectedColor}` : 'none',
      borderColor: selectedColor,
      backgroundColor: hovered ? selectedColor : 'transparent',
    };
    dynamicTextColor =
      hovered && !link.thumbnail
        ? (customTheme?.fontStyle?.color ?? textColor)
        : textColor;
  } else if (isFill) {
    dynamicStyle = {
      backgroundColor: hovered ? 'transparent' : selectedColor,
      border:
        hovered && !link.thumbnail ? `1px solid ${selectedColor}` : 'none',
    };
    dynamicTextColor = hovered && !link.thumbnail ? selectedColor : textColor;
  } else if (isSoftShadow) {
    dynamicStyle = {
      backgroundColor: selectedColor,
      border: 'none',
      boxShadow: `0 4px 8px ${shadowColor}`,
    };
  } else if (isHardShadow) {
    dynamicStyle = {
      position: 'relative',
      backgroundColor: selectedColor,
      border: 'none',
      transition: 'transform 0.2s ease-in-out',
      transform: hovered ? 'translate(6px, 6px)' : 'translate(0, 0)',
    };
  } else {
    dynamicStyle = { backgroundColor: selectedColor };
  }

  return (
    <div className="relative w-full">
      {isHardShadow && (
        <div
          className={cn('absolute w-full h-full', buttonStyleClass)}
          style={{
            top: '6px',
            left: '6px',
            backgroundColor: shadowColor,
            zIndex: 0,
          }}
        />
      )}
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'relative block w-full h-40 overflow-hidden transition-all duration-300 ease-in-out',
          isHardShadow ? '' : 'hover:scale-105 hover:shadow-lg',
          buttonStyleClass
        )}
        style={dynamicStyle}
      >
        {link.thumbnail ? (
          <Image
            src={link.thumbnail}
            alt={link.title ?? 'thumbnail'}
            fill
            sizes="100vw"
            className="w-full h-full object-cover object-[0%_20%]"
          />
        ) : (
          <div
            className="absolute top-3 right-3 opacity-70"
            style={{ color: dynamicTextColor }}
          >
            <LinkIcon className="w-4 h-4" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />

        <p
          className="absolute bottom-2 left-4 text-sm font-medium"
          style={{ color: dynamicTextColor }}
        >
          {link.title}
        </p>

        <div className="absolute bottom-3 right-3">
          <MoreVertical
            style={{ color: dynamicTextColor }}
            className="w-4 h-4"
          />
        </div>
      </a>
    </div>
  );
}
