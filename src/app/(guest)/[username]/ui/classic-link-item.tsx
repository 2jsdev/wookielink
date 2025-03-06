'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/link';
import { Theme } from '@/interfaces/theme';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/share-link-modal';
import useUiStore from '@/store/ui-store';
import {
  getButtonStyleProps,
  getClassicImagePreviewClass,
  getClassicLinkPreviewClass,
} from '@/lib/button-utils';

interface Props {
  link: Link;
  theme: Theme;
}

export default function ClassicLinkItem({ link, theme }: Props) {
  const { isBlurred, highlightedLink } = useUiStore();
  const isHighlighted = highlightedLink === link.shortCode;
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const {
    isOutline,
    isFill,
    isHardShadow,
    isSoftShadow,
    selectedColor,
    shadowColor,
    textColor,
  } = getButtonStyleProps(theme);

  const buttonStyleClass = getClassicLinkPreviewClass(theme?.buttonStyle?.type);

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
      id={`link-${link.shortCode}`}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center min-h-[56px] w-full p-2 text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
        theme?.buttonStyle,
        buttonStyleClass,
        { 'highlighted-content': isHighlighted },
        { 'blurred-content': isBlurred }
      )}
      style={dynamicStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex w-12 h-12 rounded-md overflow-hidden">
          {link.thumbnail && (
            <div
              className={cn(
                'ml-1 flex items-center justify-center w-12 h-12 overflow-hidden',
                getClassicImagePreviewClass(theme?.buttonStyle?.type)
              )}
            >
              <Image
                src={link.thumbnail}
                alt={link.title ?? 'thumbnail'}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}
        </div>

        <div className="self-center">
          <p className="text-sm font-medium" style={{ color: textColor }}>
            {link.title}
          </p>
        </div>

        <div
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="group flex items-center justify-center w-7 h-7 rounded-full relative"
        >
          <span className="absolute inset-0 w-full h-full rounded-full bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity duration-200"></span>
          <MoreVertical
            className="w-4 h-4 relative z-10"
            style={{ color: textColor }}
          />
        </div>
      </div>

      <ShareLinkModal
        link={link}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </a>
  );
}
