'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/Link';
import { MoreVertical, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/ShareLinkModal';
import { Button } from '@/components/ui/button';
import useUiStore from '@/store/uiStore';
import useThemeStore from '@/store/theme-store';
import {
  getButtonStyleProps,
  getFeaturedLinkPreviewClass,
} from '@/lib/buttonUtils';

export default function FeaturedLinkItem({ link }: { link: Link }) {
  const { isBlurred, highlightedLink } = useUiStore();
  const isHighlighted = highlightedLink === link.shortCode;
  const [isOpen, setIsOpen] = useState(false);
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
    customTheme.buttonStyle?.type
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
    <>
      <div
        id={`link-${link.shortCode}`}
        className={cn(
          'relative block w-full h-80 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
          customTheme.buttonStyle,
          buttonStyleClass,
          { 'highlighted-content': isHighlighted },
          { 'blurred-content': isBlurred }
        )}
        style={dynamicStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('absolute inset-0')}
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
            <div className="absolute top-3 right-3  opacity-70">
              <LinkIcon className="w-5 h-5" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />
          <p
            className="absolute bottom-4 left-6 text-sm font-medium"
            style={{ color: textColor }}
          >
            {link.title}
          </p>
        </a>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="absolute bottom-3 right-3 z-10"
        >
          <MoreVertical className="w-4 h-4" style={{ color: textColor }} />
        </Button>
      </div>

      <ShareLinkModal
        link={link}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
