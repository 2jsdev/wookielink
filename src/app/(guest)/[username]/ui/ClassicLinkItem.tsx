'use client';
import { useState } from 'react';
import { Link } from '@/interfaces/Link';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ShareLinkModal from '@/components/custom/ShareLinkModal';
import { Button } from '@/components/ui/button';

export default function ClassicLinkItem({ link }: { link: Link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center h-15 w-full p-2 pr-3 text-center text-white bg-gray-800 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer hover:bg-gray-700'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex w-12 h-12 rounded-md overflow-hidden">
          {link.thumbnail ? (
            <Image
              src={link.thumbnail}
              alt={link.title ?? 'thumbnail'}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              priority
            />
          ) : null}
        </div>

        <div className="flex-1 text-center">
          <p className="text-sm font-medium">{link.title}</p>
        </div>
        <Button
          className="ml-auto flex items-center justify-center"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <MoreVertical className="w-4 h-4 text-white" />
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
