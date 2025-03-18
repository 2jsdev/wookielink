'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/link';
import { Theme } from '@/interfaces/theme';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn, getUserDeviceData } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/share-link-modal';
import useUiStore from '@/store/ui-store';
import {
  getButtonStyleProps,
  getClassicImagePreviewClass,
  getClassicLinkPreviewClass,
} from '@/lib/button-utils';
import { registerActivity } from '@/actions/register-activity';
import { ActivityType } from '@/interfaces/activity';

interface Props {
  link: Link;
  theme: Theme;
}

export default function ClassicLinkItem({ link, theme }: Props) {
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

  const buttonStyleClass = getClassicLinkPreviewClass(theme?.buttonStyle?.type);

  let dynamicStyle: React.CSSProperties = {};
  let dynamicTextColor = textColor;

  if (isOutline) {
    dynamicStyle = {
      borderColor: selectedColor,
      backgroundColor: hovered ? selectedColor : 'transparent',
    };
    dynamicTextColor = hovered ? theme.fontStyle?.color : textColor;
  } else if (isFill) {
    dynamicStyle = {
      backgroundColor: hovered ? 'transparent' : selectedColor,
      border: hovered ? `1px solid ${selectedColor}` : 'none',
    };
    dynamicTextColor = hovered ? selectedColor : textColor;
  } else if (isSoftShadow) {
    dynamicStyle = {
      backgroundColor: selectedColor,
      border: `1px solid ${selectedColor}`,
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

  const handleRegisterView = async () => {
    if (isOpen) return;
    setHovered(true);
    if (hasRegisteredView) return;

    handleRegisterActivity(ActivityType.View);
    setHasRegisteredView(true);
  };

  const handleLinkClick = async () => {
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
    <div
      className={cn('relative w-full', {
        'pointer-events-none': isOpen,
      })}
    >
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
        onContextMenu={(e) => e.preventDefault()}
        className={cn(
          'flex items-center min-h-[56px] w-full p-2 text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
          theme?.buttonStyle,
          buttonStyleClass,
          { 'highlighted-content': isHighlighted },
          { 'blurred-content': isBlurred }
        )}
        style={dynamicStyle}
        onMouseEnter={handleRegisterView}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center w-full">
          <div
            className={cn(
              'w-12 h-12 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center',
              getClassicImagePreviewClass(theme?.buttonStyle?.type)
            )}
          >
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

          <div className="flex-1 flex items-center justify-center">
            <p
              className="text-sm font-medium text-center w-full"
              style={{ color: dynamicTextColor }}
            >
              {link.title}
            </p>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setHovered(false);
              setIsOpen(true);
            }}
            className="group flex items-center justify-center w-7 h-7 rounded-full relative flex-shrink-0"
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity duration-200"></span>
            <MoreVertical
              className="w-4 h-4 relative z-10"
              style={{ color: dynamicTextColor }}
            />
          </div>
        </div>

        <ShareLinkModal
          link={link}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
