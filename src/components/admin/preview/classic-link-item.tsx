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
  let dynamicTextColor = textColor;

  if (isOutline) {
    dynamicStyle = {
      border:
        !hovered && !link.thumbnail ? `1px solid ${selectedColor}` : 'none',
      borderColor: selectedColor,
      backgroundColor: hovered ? selectedColor : 'transparent',
    };
    dynamicTextColor = hovered
      ? (customTheme?.fontStyle?.color ?? textColor)
      : textColor;
  } else if (isFill) {
    dynamicStyle = {
      backgroundColor: hovered ? 'transparent' : selectedColor,
      border: hovered ? `1px solid ${selectedColor}` : 'none',
    };
    dynamicTextColor = hovered ? selectedColor : textColor;
  } else if (isSoftShadow) {
    dynamicStyle = {
      backgroundColor: selectedColor,
      border: `2px solid ${selectedColor}`,
      boxShadow: `0 4px 8px ${shadowColor}`,
    };
  } else if (isHardShadow) {
    dynamicStyle = {
      position: 'relative',
      backgroundColor: selectedColor,
      border: `2px solid ${selectedColor}`,
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
        className={cn(
          'flex items-center min-h-[56px] w-full text-center transition-all duration-300 ease-in-out',
          isHardShadow ? '' : 'hover:scale-105 hover:shadow-lg',
          customTheme?.buttonStyle,
          buttonStyleClass
        )}
        style={dynamicStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center justify-between w-full relative z-10">
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
            <p
              className="text-sm font-medium"
              style={{ color: dynamicTextColor }}
            >
              {link.title}
            </p>
          </div>

          <div className="w-10 h-10 flex items-center justify-center ">
            <MoreVertical
              style={{ color: dynamicTextColor }}
              className="w-4 h-4"
            />
          </div>
        </div>
      </a>
    </div>
  );
}
