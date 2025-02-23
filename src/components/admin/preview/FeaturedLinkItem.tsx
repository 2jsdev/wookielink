'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/Link';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useThemeStore from '@/store/theme-store';
import {
  getButtonStyleProps,
  getFeaturedLinkPreviewClass,
} from '@/lib/buttonUtils';

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

  if (isOutline) {
    dynamicStyle = {
      borderColor: selectedColor,
      backgroundColor: hovered ? selectedColor : 'transparent',
    };
  } else if (isFill) {
    dynamicStyle = hovered
      ? {
          backgroundColor: 'transparent',
          border: `2px solid ${selectedColor}`,
        }
      : { backgroundColor: selectedColor };
  } else if (isHardShadow) {
    dynamicStyle = {
      backgroundColor: selectedColor,
      border: `2px solid ${selectedColor}`,
      boxShadow: `4px 4px 0px 0px ${shadowColor}`,
    };
  } else if (isSoftShadow) {
    dynamicStyle = hovered
      ? {
          backgroundColor: 'transparent',
          border: `2px solid ${selectedColor}`,
          boxShadow: `0 4px 8px ${shadowColor}`,
        }
      : {
          backgroundColor: selectedColor,
          border: `2px solid ${selectedColor}`,
          boxShadow: `0 4px 8px ${shadowColor}`,
        };
  } else {
    dynamicStyle = { backgroundColor: selectedColor };
  }

  dynamicStyle.border = 'none';
  dynamicStyle.borderColor = 'transparent';

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative block w-full h-40 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer',
        buttonStyleClass
      )}
      style={dynamicStyle}
    >
      {link.thumbnail && (
        <Image
          src={link.thumbnail}
          alt={link.title ?? 'thumbnail'}
          fill
          sizes="100vw"
          className="w-full h-full object-cover object-[0%_20%]"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />

      <p
        className="absolute bottom-4 left-6 text-sm font-medium"
        style={{ color: textColor }}
      >
        {link.title}
      </p>

      <div className="absolute bottom-3 right-2">
        <MoreVertical style={{ color: textColor }} className="w-4 h-4" />
      </div>
    </a>
  );
}
