'use client';

import { ImageIcon, MoreVertical, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { updateUserLink } from '@/actions/updateUserLink';
import { useState } from 'react';
import { Link, LinkLayout } from '@/interfaces/Link';
import useUiStore, { CURRENT_ACTION } from '@/store/uiStore';
import useLinkStore from '@/store/linkStore';
import { cn } from '@/lib/utils';

interface Props {
  link: Link;
  onError: (message: string) => void;
}

export default function LayoutSelector({ link, onError }: Props) {
  const { currentLinkId, setCurrentLinkId, setCurrentAction } = useUiStore();

  const { updateLink } = useLinkStore();
  const [selectedLayout, setSelectedLayout] = useState<LinkLayout>(
    link.layout!
  );

  const handleClose = () => {
    setCurrentAction(null);
    setCurrentLinkId(null);
  };

  const handleLayoutChange = async (value: LinkLayout) => {
    if (!currentLinkId) return;

    const previousLayout = selectedLayout;
    setSelectedLayout(value);

    const backupLink = { ...link };
    const optimisticallyUpdatedLink = { ...link, layout: value };
    updateLink(optimisticallyUpdatedLink);

    try {
      const updatedLink = await updateUserLink({
        id: currentLinkId,
        layout: value,
      });
      updateLink(updatedLink);
    } catch (error) {
      updateLink(backupLink);
      setSelectedLayout(previousLayout);
      onError('Failed to update link layout');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center py-2 px-5 w-full border-y-2">
        <span className="text-sm font-medium w-full text-center">Layout</span>
        <div className="cursor-pointer" onClick={handleClose}>
          <X className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 md:p-6">
        <span className="self-center mb-4 mt-2 text-lg text-center">
          Choose a layout for your link
        </span>

        <RadioGroup
          value={selectedLayout}
          onValueChange={handleLayoutChange}
          className="space-y-4"
        >
          <div className="relative">
            <Label
              className={cn(
                'flex flex-col md:flex-row items-center gap-4 p-5 rounded-lg border cursor-pointer transition-colors',
                {
                  'border-2 border-primary':
                    selectedLayout === LinkLayout.Classic,
                }
              )}
            >
              <RadioGroupItem value={LinkLayout.Classic} />
              <div className="flex-1 flex flex-col md:flex-row items-center gap-4 md:gap-10 w-full">
                <div className="w-full md:w-[50%] py-1">
                  <div className="space-y-3">
                    <h3 className="font-medium">Classic</h3>
                    <p className="text-muted-foreground text-sm">
                      Efficient, direct and compact.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-[50%] flex justify-start md:justify-end">
                  <div className="flex flex-col justify-center w-full md:w-[200px]">
                    <div className="flex rounded-lg items-center justify-between w-full bg-gray-800 p-2">
                      <div className="flex w-8 h-8 rounded-md overflow-hidden">
                        <Image
                          src="https://minio-api.2jsdev.me/wookielink/public/example.jpg"
                          alt="Profile preview"
                          width={30}
                          height={30}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <div className="ml-auto flex items-center justify-center">
                        <MoreVertical className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Label>
          </div>

          <div className="relative">
            <Label
              className={cn(
                'flex flex-col md:flex-row items-center gap-4 p-5 rounded-lg border cursor-pointer transition-colors',
                {
                  'border-2 border-primary':
                    selectedLayout === LinkLayout.Feature,
                }
              )}
            >
              <RadioGroupItem value={LinkLayout.Feature} />
              <div className="flex-1 flex flex-col md:flex-row items-center gap-1 md:gap-5">
                <div className="w-full md:w-[50%] py-1 space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-medium">Featured</h3>
                    <p className="text-muted-foreground text-sm">
                      Make your link stand out with a larger, more attractive
                      display.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center w-full gap-2 h-12"
                    onClick={() => {
                      setCurrentAction(CURRENT_ACTION.thumbnail);
                    }}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Add thumbnail
                  </Button>
                </div>
                <div className="w-full md:w-[50%] flex justify-start md:justify-end">
                  <div className="flex flex-col justify-center w-full md:w-[200px]">
                    <div className="relative h-28 rounded-lg overflow-hidden w-full">
                      <Image
                        src="https://minio-api.2jsdev.me/wookielink/public/example.jpg"
                        alt="Featured preview"
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover object-[0%_20%]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-sm font-medium">
                        LinkedIn
                      </p>
                      <div className="absolute bottom-3 right-2 text-white">
                        <MoreVertical className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
