'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { Link as LinkType } from '@/interfaces/Link';
import Link from 'next/link';

interface ShareLinkModalProps {
  link: LinkType;
  open: boolean;
  onClose: () => void;
}

export default function ShareLinkModal({
  link,
  open,
  onClose,
}: ShareLinkModalProps) {
  const [isClient, setIsClient] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (copiedLink) {
      const timer = setTimeout(() => setCopiedLink(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedLink]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link.url!);
      setCopiedLink(true);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: link.ogData?.ogTitle,
          url: link.url!,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Native sharing is not supported in this browser.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-none max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Share link</DialogTitle>
        </DialogHeader>
        <Card
          className="shadow-none border-none flex items-center justify-center text-white cursor-pointer"
          onClick={() => window.open(link.url!, '_blank')}
        >
          <div className="w-full md:w-[327px] bg-primary rounded-lg p-6 shadow-low-elevation-light hover:scale-[1.01] hover:shadow-max-elevation-light">
            {link.ogData && (
              <div className="flex flex-col items-center justify-center gap-4">
                {link.ogData?.ogImage?.[0]?.url && (
                  <div className="h-[120px] w-[120px] flex items-center justify-center">
                    <Image
                      src={link.ogData?.ogImage?.[0]?.url}
                      alt={link.ogData?.ogTitle || 'Thumbnail'}
                      width={80}
                      height={80}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className="text-[20px] font-extrabold text-center leading-normal text-balance">
                    {link.ogData?.ogTitle || 'Untitled'}
                  </h3>
                  <p className="text-xs text-center text-gray-300 truncate">
                    {link.url!}
                  </p>
                </div>

                <p className="text-xs text-center break-words text-balance line-clamp-3">
                  {link.ogData?.ogDescription}
                </p>
              </div>
            )}
          </div>
        </Card>

        <ScrollArea className="w-full">
          <div className="flex space-x-3 my-4">
            <div className="flex-shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-600">
                  {copiedLink ? 'Copied!' : 'Copy link'}
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-1">
              <FacebookShareButton title={link.title!} url={link.url!}>
                <FacebookIcon className="w-12 h-12 rounded-full" />
              </FacebookShareButton>
              <span className="text-xs text-gray-600">Facebook</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <TwitterShareButton title={link.title!} url={link.url!}>
                <TwitterIcon className="w-12 h-12 rounded-full" />
              </TwitterShareButton>
              <span className="text-xs text-gray-600">Twitter</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <WhatsappShareButton title={link.title!} url={link.url!}>
                <WhatsappIcon className="w-12 h-12 rounded-full" />
              </WhatsappShareButton>
              <span className="text-xs text-gray-600">WhatsApp</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <LinkedinShareButton title={link.title!} url={link.url!}>
                <LinkedinIcon className="w-12 h-12 rounded-full" />
              </LinkedinShareButton>
              <span className="text-xs text-gray-600">LinkedIn</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <TelegramShareButton title={link.title!} url={link.url!}>
                <TelegramIcon className="w-12 h-12 rounded-full" />
              </TelegramShareButton>
              <span className="text-xs text-gray-600">Telegram</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <EmailShareButton title={link.title!} url={link.url!}>
                <EmailIcon className="w-12 h-12 rounded-full" />
              </EmailShareButton>
              <span className="text-xs text-gray-600">Email</span>
            </div>

            {isClient && (
              <div className="flex-shrink-0">
                <button
                  onClick={handleNativeShare}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <MoreHorizontal className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-600">More</span>
                </button>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-6 text-center space-y-4">
          <h3 className="font-semibold">Join on WookieLink</h3>
          <p className="text-sm text-gray-500">
            Get your own free WookieLink. The only link in bio trusted by 50M+
            people.
          </p>
          <Link
            href="/"
            className="flex items-center justify-center w-auto px-6 py-2 bg-primary text-primary-foreground dark:bg-primary-foreground dark:text-primary border-none rounded-full shadow-lg space-x-2 hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all duration-300"
          >
            <span className="text-sm font-semibold">Sign up free</span>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
