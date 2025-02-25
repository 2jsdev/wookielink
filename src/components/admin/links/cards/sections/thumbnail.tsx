import { X } from 'lucide-react';
import { Link } from '@/interfaces/link';
import useUiStore from '@/store/ui-store';
import useLinkStore from '@/store/link-store';
import { ThumbnailUploader } from './thumbnail-uploader';
import { uploadUserLinkThumbnail } from '@/actions/upload-user-link-thumbnail';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { deleteUserLinkThumbnail } from '@/actions/delete-user-link-thumbnail';

interface Props {
  link: Link;
  onError: (message: string) => void;
}

export default function Thumbnail({ link, onError }: Props) {
  const { setCurrentLinkId, setCurrentAction } = useUiStore();
  const { updateLink } = useLinkStore();

  const handleClose = () => {
    setCurrentAction(null);
    setCurrentLinkId(null);
  };

  const handleUpload = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const thumbnail = {
        name: `${Date.now()}-${file.name}`,
        size: file.size,
        type: file.type,
        extension: file.name.split('.').pop() ?? '',
        content: arrayBuffer,
      };

      const updatedLink = await uploadUserLinkThumbnail({
        linkId: link.id,
        thumbnail,
      });

      updateLink(updatedLink);
    } catch (error) {
      console.error('Failed to upload thumbnail.', error);
      onError('Failed to upload thumbnail.');
    }
  };

  const handleRemove = async () => {
    try {
      await deleteUserLinkThumbnail({ linkId: link.id });

      updateLink({ ...link, thumbnail: undefined });
    } catch (error) {
      updateLink(link);
      console.error('Failed to remove thumbnail.', error);
      onError('Failed to remove thumbnail');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center py-2 px-5 w-full border-y-2">
        <span className="text-sm font-medium w-full text-center">
          Add Thumbnail
        </span>
        <div className="cursor-pointer" onClick={handleClose}>
          <X className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 md:p-6">
        {!link.thumbnail ? (
          <>
            <span className="self-center mb-4 mt-2 text-lg text-center">
              Add a Thumbnail to this Link.
            </span>
            <ThumbnailUploader onUpload={handleUpload} />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-[98px] h-[98px] overflow-hidden rounded-md">
              <Image
                src={link.thumbnail}
                alt="Link Thumbnail"
                width={98}
                height={98}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <ThumbnailUploader
                onUpload={handleUpload}
                buttonLabel="Change"
                dialogTitle="Change Thumbnail"
              />
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
