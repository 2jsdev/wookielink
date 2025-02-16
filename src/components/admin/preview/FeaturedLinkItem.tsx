import { Link } from '@/interfaces/Link';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function FeaturedLinkItem({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'relative block w-full h-40 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer',
        !link.thumbnail && 'bg-gray-800'
      )}
    >
      {link.thumbnail ? (
        <Image
          src={link.thumbnail}
          alt={link.title ?? 'thumbnail'}
          fill
          sizes="100vw"
          className="w-full h-full object-cover object-[0%_20%]"
        />
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black to-transparent" />

      <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
        {link.title}
      </p>

      <div className="absolute bottom-3 right-2 text-white">
        <MoreVertical className="w-4 h-4" />
      </div>
    </a>
  );
}
