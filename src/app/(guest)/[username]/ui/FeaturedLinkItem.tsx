'use client';

import { useState } from 'react';
import { Link } from '@/interfaces/Link';
import { MoreVertical, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/ShareLinkModal';
import { Button } from '@/components/ui/button';
import useUiStore from '@/store/uiStore';

interface Props {
  link: Link;
}

export default function FeaturedLinkItem({ link }: Props) {
  const { isBlurred, highlightedLink } = useUiStore();
  const isHighlighted = highlightedLink === link.shortCode;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        id={`link-${link.shortCode}`}
        className={cn(
          'relative bg-gray-800 block w-full h-80 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
          { 'highlighted-content': isHighlighted },
          { 'blurred-content': isBlurred }
        )}
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
            <div className="absolute top-3 right-3 text-white opacity-70">
              <LinkIcon className="w-5 h-5" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black to-transparent" />
          <p className="absolute bottom-4 left-6 text-white text-sm font-medium">
            {link.title}
          </p>
        </a>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="absolute bottom-3 right-3 text-white z-10"
        >
          <MoreVertical className="w-4 h-4" />
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
