'use client';

import { useState } from 'react';
import { Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import DraggableLinkList from './DraggableLinkList';
import ArchivedLinkCard from './ArchivedLinkCard';
import { useGetLinksQuery } from '@/lib/api/linksApi';
import { useSelector } from 'react-redux';
import {
  selectArchivedLinks,
  selectLinks,
} from '@/lib/store/slices/linksSlice';
import { Skeleton } from '@/components/ui/skeleton';

const LinkList = () => {
  const { isLoading } = useGetLinksQuery();
  const [viewArchived, setViewArchived] = useState(false);

  const links = useSelector(selectLinks);
  const archivedLinks = useSelector(selectArchivedLinks);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-20"></div>
          <h2 className="text-center flex-1" />
          <Skeleton className="w-48 h-8" />
        </div>
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-full h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {viewArchived ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setViewArchived(false)}
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>Back</span>
            </button>
            <h2 className="text-center flex-1 text-sm sm:text-base md:text-lg font-semibold">
              Archived Links
            </h2>
            <div className="w-20"></div>
          </div>
          <div className="space-y-4">
            {archivedLinks.map((link) => (
              <ArchivedLinkCard key={link.id} id={link.id} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="w-20"></div>
            <h2 className="text-center flex-1 text-sm sm:text-base md:text-lg font-semibold">
              Your Links
            </h2>
            <button
              onClick={() => setViewArchived(true)}
              className="self-end flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base md:text-lg"
            >
              <Archive className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>View Archived</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <DraggableLinkList links={links} />
        </div>
      )}
    </div>
  );
};

export default LinkList;
