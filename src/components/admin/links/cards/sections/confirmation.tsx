'use client';

import { Button } from '@/components/ui/button';
import { Archive, Trash, X } from 'lucide-react';
import { deleteUserLink } from '@/actions/delete-user-link';
import { updateUserLink } from '@/actions/update-user-link';
import useUiStore from '@/store/ui-store';
import useLinkStore from '@/store/link-store';

interface Props {
  onError: (message: string) => void;
}

export default function Confirmation({ onError }: Props) {
  const { currentLinkId, setCurrentLinkId, setCurrentAction } = useUiStore();
  const {
    links,
    setLinks,
    archivedLinks,
    setArchivedLinks,
    archiveLink,
    deleteLink,
  } = useLinkStore();

  const handleDelete = async () => {
    if (!currentLinkId) return;

    const backupLinks = [...links];

    deleteLink(currentLinkId);

    try {
      await deleteUserLink({ linkId: currentLinkId });
      setCurrentAction(null);
      setCurrentLinkId(null);
    } catch (error) {
      setLinks(backupLinks);
      onError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleArchive = async () => {
    if (!currentLinkId) return;
    const backupLinks = [...links];
    const backupArchivedLinks = [...archivedLinks];

    archiveLink(currentLinkId);

    try {
      await updateUserLink({ id: currentLinkId, archived: true });
      setCurrentAction(null);
      setCurrentLinkId(null);
    } catch (error) {
      setLinks(backupLinks);
      setArchivedLinks(backupArchivedLinks);
      onError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleClose = () => {
    setCurrentAction(null);
    setCurrentLinkId(null);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center py-2 px-5 w-full border-y-2">
        <span className="text-sm font-medium w-full text-center">Delete</span>
        <div className="cursor-pointer" onClick={handleClose}>
          <X className="h-5 w-5" />
        </div>
      </div>

      <div className="flex justify-between items-start space-x-2 sm:space-x-4 mt-2 p-4 sm:p-5 md:p-6">
        <div className="flex flex-col items-center w-1/3 rounded-lg">
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center justify-center space-x-1 w-full"
          >
            <Trash className="h-5 w-5 hidden sm:block" />
            <span>Delete</span>
          </Button>
          <span className="text-xs mt-2 text-center text-muted-foreground truncate">
            Delete forever.
          </span>
        </div>

        <div className="flex flex-col items-center w-2/3 rounded-lg">
          <Button
            onClick={handleArchive}
            className="flex items-center justify-center space-x-1 w-full py-2 rounded-lg"
          >
            <Archive className="h-5 w-5 hidden sm:block" />
            <span>Archive</span>
          </Button>
          <span className="text-xs mt-2 text-center text-muted-foreground">
            Reduce clutter, keep your analytics and restore anytime.
          </span>
        </div>
      </div>
    </div>
  );
}
