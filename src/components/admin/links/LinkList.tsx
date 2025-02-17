'use client';

import { Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import DraggableLinkList from './DraggableLinkList';
import ArchivedLinkCard from './cards/ArchivedLinkCard';
import useUiStore from '@/store/uiStore';
import useLinkStore from '@/store/linkStore';
import { cn } from '@/lib/utils';

export default function LinkList() {
  const {
    viewArchived,
    setViewArchived,
    setCurrentLinkId,
    setCurrentAction,
    isAnyCardOpen,
  } = useUiStore();
  const { linksLoading, archivedLinks } = useLinkStore();

  if (linksLoading) {
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
        <>
          <div className="flex items-center mb-4 relative">
            <button
              onClick={() => {
                setViewArchived(false);
                setCurrentLinkId(null);
                setCurrentAction(null);
              }}
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hover:underline">Back</span>
            </button>
            <h2 className="absolute left-1/2 transform -translate-x-1/2 text-sm sm:text-base md:text-lg font-semibold">
              Archived Links
            </h2>
          </div>

          {archivedLinks.length === 0 && (
            <div className="flex flex-col items-center justify-center text-muted-foreground mt-32">
              <Archive className="w-20 h-20" />

              <p className="text-center text-md mt-8 font-medium">
                {`Keep your link admin clean and focused by.
                archiving links you're not currently using.`}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {archivedLinks.map((link) => (
              <ArchivedLinkCard key={link.id} link={link} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 relative">
            <button
              onClick={() => {
                setViewArchived(true);
                setCurrentLinkId(null);
                setCurrentAction(null);
              }}
              className={cn(
                'ml-auto flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base md:text-lg',
                {
                  'opacity-100 filter blur-[2px] pointer-events-none':
                    isAnyCardOpen(),
                }
              )}
            >
              <Archive className="hidden sm:block w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm sm:text-base md:text-lg hover:underline">
                View Archived
              </span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <DraggableLinkList />
        </>
      )}
    </div>
  );
}
