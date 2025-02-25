'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/link';
import { Theme } from '@/interfaces/theme';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/share-link-modal';
import { Button } from '@/components/ui/button';
import useUiStore from '@/store/ui-store';
import {
  getButtonStyleProps,
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

  dynamicStyle.border = 'none';
  dynamicStyle.borderColor = 'transparent';

  return (
    <a
      id={`link-${link.shortCode}`}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center h-15 w-full p-2 pr-3 text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
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
            <Image
              src={link.thumbnail}
              alt={link.title ?? 'thumbnail'}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              priority
            />
          )}
        </div>

        <div className="flex-1 text-center">
          <p className="text-sm font-medium" style={{ color: textColor }}>
            {link.title}
          </p>
        </div>

        <Button
          className="ml-auto flex items-center justify-center"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <MoreVertical className="w-4 h-4" style={{ color: textColor }} />
        </Button>
      </div>

      <ShareLinkModal
        link={link}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </a>
  );
}
