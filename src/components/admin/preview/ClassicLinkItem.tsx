import { Link } from '@/interfaces/Link';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ClassicLinkItem({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'block w-full p-2 pr-3 text-center text-white bg-gray-800 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer hover:bg-gray-700'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex w-8 h-8 rounded-md overflow-hidden">
          {link.thumbnail ? (
            <Image
              src={link.thumbnail}
              alt={link.title ?? 'thumbnail'}
              width={30}
              height={30}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="self-center">
          <p className="text-sm font-medium">{link.title}</p>
        </div>
        <div className="self-end w-8 h-8 rounded-full flex items-center justify-end">
          <MoreVertical className="w-4 h-4 text-white" />
        </div>
      </div>
    </a>
  );
}
