import { Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteUserLink } from '@/actions/deleteUserLink';
import useUiStore from '@/store/uiStore';
import useLinkStore from '@/store/linkStore';

interface Props {
  onError: (message: string) => void;
}

export default function PermanentElimination({ onError }: Props) {
  const { currentLinkId, setCurrentLinkId, setCurrentAction } = useUiStore();
  const { archivedLinks, setArchivedLinks, deleteLinkFromArchived } =
    useLinkStore();

  const handleDelete = async () => {
    if (!currentLinkId) return;
    const backupLinks = [...archivedLinks];
    deleteLinkFromArchived(currentLinkId);
    try {
      await deleteUserLink({ linkId: currentLinkId });
      setCurrentAction(null);
      setCurrentLinkId(null);
    } catch (error) {
      setArchivedLinks(backupLinks);
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
      <div className="flex flex-col p-4 sm:p-5 md:p-6">
        <span className="self-center mb-4 mt-2 text-sm sm:text-base md:text-lg text-center">
          Permanently delete this link and its analytics data?
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
            onClick={handleDelete}
            className="flex items-center justify-center space-x-2 w-full py-2 rounded-lg"
          >
            <Trash className="h-5 w-5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
