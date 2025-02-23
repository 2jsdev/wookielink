'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/Link';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useThemeStore from '@/store/theme-store';
import {
  getButtonStyleProps,
  getClassicLinkPreviewClass,
} from '@/lib/buttonUtils';

export default function ClassicLinkItem({ link }: { link: Link }) {
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

  const buttonStyleClass = getClassicLinkPreviewClass(
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
  } else if (isSoftShadow) {
    dynamicStyle = {
      backgroundColor: selectedColor,
      border: `2px solid ${selectedColor}`,
      boxShadow: `0 4px 8px ${shadowColor}`,
    };
  } else if (isHardShadow) {
    dynamicStyle = {
      backgroundColor: selectedColor,
      border: `2px solid ${selectedColor}`,
      boxShadow: `4px 4px 0px 0px ${shadowColor}`,
    };
  } else {
    dynamicStyle = { backgroundColor: selectedColor };
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'block w-full h-12 text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn('h-full w-full', buttonStyleClass)}
        style={dynamicStyle}
      >
        <div className="flex items-center justify-between w-full p-2">
          <div className="flex w-8 h-8 rounded-md overflow-hidden">
            {link.thumbnail ? (
              <Image
                src={link.thumbnail}
                alt={link.title ?? 'thumbnail'}
                width={30}
                height={30}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="self-center">
            <p className="text-sm font-medium" style={{ color: textColor }}>
              {link.title}
            </p>
          </div>
          <div className="self-end w-8 h-8 rounded-full flex items-center justify-end">
            <MoreVertical style={{ color: textColor }} className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
}
