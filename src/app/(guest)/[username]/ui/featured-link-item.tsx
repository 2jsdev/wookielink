'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/link';
import { Theme } from '@/interfaces/theme';
import { MoreVertical, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { cn, getUserDeviceData } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/share-link-modal';
import useUiStore from '@/store/ui-store';
import {
  getButtonStyleProps,
  getFeaturedLinkPreviewClass,
} from '@/lib/button-utils';
import { registerActivity } from '@/actions/register-activity';
import { ActivityType } from '@/interfaces/activity';

interface Props {
  link: Link;
  theme: Theme;
}

export default function FeaturedLinkItem({ link, theme }: Props) {
  const { isBlurred, highlightedLink } = useUiStore();
  const isHighlighted = highlightedLink === link.shortCode;
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hasRegisteredView, setHasRegisteredView] = useState(false);

  const {
    isOutline,
    isFill,
    isHardShadow,
    isSoftShadow,
    selectedColor,
    shadowColor,
    textColor,
  } = getButtonStyleProps(theme);

  const buttonStyleClass = getFeaturedLinkPreviewClass(
    theme?.buttonStyle?.type
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
      hovered && !link.thumbnail ? theme.fontStyle?.color : textColor;
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

  const handleRegisterActivity = async (type: ActivityType) => {
    const deviceData = await getUserDeviceData();
    if (!deviceData) return;

    registerActivity({
      type,
      linkId: link.id,
      userId: link.userId,
      ...deviceData,
    }).catch((error) =>
      console.error(`Error registering ${type} activity:`, error)
    );
  };

  const handleRegisterView = () => {
    if (isOpen) return;
    setHovered(true);
    if (hasRegisteredView) return;

    handleRegisterActivity(ActivityType.View);
    setHasRegisteredView(true);
  };

  const handleLinkClick = () => {
    if (isOpen) return;
    window.open(link.url, '_blank', 'noopener,noreferrer');
    handleRegisterActivity(ActivityType.Click);
  };

  const handleTouchStart = () => {
    handleRegisterView();
  };

  const handleTouchEnd = () => {
    handleLinkClick();
  };

  return (
    <>
      <div className={cn("relative w-full", {
        'pointer-events-none': isOpen,
      })}>
        {isHardShadow && (
          <div
            className="absolute w-full h-full"
            style={{
              top: '6px',
              left: '6px',
              backgroundColor: shadowColor,
              zIndex: 0,
            }}
          />
        )}
        <div
          id={`link-${link.shortCode}`}
          role="button"
          tabIndex={0}
          onClick={handleLinkClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLinkClick();
          }}
          className={cn(
            'relative block w-full h-80 overflow-hidden transition-all duration-300 ease-in-out cursor-pointer',
            isHardShadow ? '' : 'hover:scale-105 hover:shadow-lg',
            theme?.buttonStyle,
            buttonStyleClass,
            { 'highlighted-content': isHighlighted },
            { 'blurred-content': isBlurred }
          )}
          style={dynamicStyle}
          onMouseEnter={handleRegisterView}
          onMouseLeave={() => setHovered(false)}
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
              className="absolute top-2 right-2 opacity-70"
              style={{ color: dynamicTextColor }}
            >
              <LinkIcon className="w-5 h-5" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />
          <p
            className="absolute bottom-4 left-4 text-sm font-medium"
            style={{ color: dynamicTextColor }}
          >
            {link.title}
          </p>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setHovered(false);
              setIsOpen(true);
            }}
            className="absolute bottom-3 right-2 z-10 group flex items-center justify-center w-7 h-7 rounded-full"
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
            <MoreVertical
              className="w-4 h-4"
              style={{ color: dynamicTextColor }}
            />
          </div>
        </div>
      </div>

      <ShareLinkModal
        link={link}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
