'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/link';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useThemeStore from '@/store/theme-store';
import {
  getButtonStyleProps,
  getClassicImagePreviewClass,
  getClassicLinkPreviewClass,
} from '@/lib/button-utils';

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
        'flex items-center min-h-[56px] w-full text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
        customTheme?.buttonStyle,
        buttonStyleClass
      )}
      style={dynamicStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex w-10 h-10 rounded-md overflow-hidden ml-1">
          {link.thumbnail && (
            <div
              className={cn(
                'flex items-center justify-center w-12 h-12 overflow-hidden',
                getClassicImagePreviewClass(customTheme?.buttonStyle?.type)
              )}
            >
              <Image
                src={link.thumbnail}
                alt={link.title ?? 'thumbnail'}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="self-center">
          <p className="text-sm font-medium" style={{ color: textColor }}>
            {link.title}
          </p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center ">
          <MoreVertical style={{ color: textColor }} className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}
