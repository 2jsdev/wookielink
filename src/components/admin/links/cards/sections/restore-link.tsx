import { Archive, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateUserLink } from '@/actions/update-user-link';
import { Link } from '@/interfaces/link';
import useUiStore from '@/store/ui-store';
import useLinkStore from '@/store/link-store';

interface Props {
  link: Link;
  onError: (message: string) => void;
}

export default function RestoreLink({ link, onError }: Props) {
  const { currentLinkId, setCurrentLinkId, setCurrentAction } = useUiStore();
  const {
    links,
    setLinks,
    archivedLinks,
    setArchivedLinks,
    deleteLinkFromArchived,
  } = useLinkStore();

  const handleRestore = async () => {
    if (!currentLinkId) return;
    const backupArchivedLinks = [...archivedLinks];
    const backupLinks = [...archivedLinks];

    deleteLinkFromArchived(currentLinkId);
    setLinks([...links, { ...link, archived: false, position: links.length }]);

    try {
      await updateUserLink({
        id: currentLinkId,
        archived: false,
        position: links.length,
      });

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
        <span className="text-sm font-medium w-full text-center">Restore</span>
        <div className="cursor-pointer" onClick={handleClose}>
          <X className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 md:p-6">
        <span className="self-center mb-4 mt-2 text-sm sm:text-base md:text-lg text-center">
          Restore this link to your Wookielink
        </span>

        <div className="flex justify-between items-center space-x-4 mt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex items-center justify-center space-x-2 w-full"
          >
            <span>Cancel</span>
          </Button>
          <Button
            onClick={handleRestore}
            className="flex items-center justify-center space-x-2 w-full py-2 rounded-lg"
          >
            <Archive className="h-5 w-5" />
            <span>Restore</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
