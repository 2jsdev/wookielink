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
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Check, Link as LinkIcon, Share } from 'lucide-react';
import { Link as LinkType } from '@/interfaces/link';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
      await navigator.clipboard.writeText(link.fullShortUrl!);
      setCopiedLink(true);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: link.title,
          url: link.fullShortUrl!,
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
          <div
            className={cn(
              'w-full md:w-[327px] rounded-lg p-6 shadow-low-elevation-light hover:scale-[1.01] hover:shadow-max-elevation-light',
              {
                'bg-primary text-white': link.ogData?.ogTitle,
                'bg-gray-100 text-black': !link.ogData?.ogTitle,
              }
            )}
          >
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
                  {link.ogData?.ogTitle || link.title}
                </h3>
                <p className="text-xs text-center text-gray-500 truncate">
                  {link.url}
                </p>
              </div>

              {link.ogData?.ogDescription && (
                <p className="text-xs text-center break-words text-balance line-clamp-3">
                  {link.ogData?.ogDescription}
                </p>
              )}
            </div>
          </div>
        </Card>

        <ScrollArea className="w-full">
          <div className="flex space-x-2 my-4">
            <div className="flex-shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-1 w-16"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  {copiedLink ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <LinkIcon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs text-gray-600 min-w-[60px] text-center',
                    {
                      'text-green-500': copiedLink,
                    }
                  )}
                >
                  {copiedLink ? 'Copied!' : 'Copy link'}
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <FacebookShareButton title={link.title!} url={link.url!}>
                <FacebookIcon className="w-12 h-12 rounded-full" />
              </FacebookShareButton>
              <span className="text-xs text-gray-600 min-w-[60px] text-center">
                Facebook
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <TwitterShareButton title={link.title!} url={link.url!}>
                <TwitterIcon className="w-12 h-12 rounded-full" />
              </TwitterShareButton>
              <span className="text-xs text-gray-600 min-w-[60px] text-center">
                Twitter
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <WhatsappShareButton title={link.title!} url={link.url!}>
                <WhatsappIcon className="w-12 h-12 rounded-full" />
              </WhatsappShareButton>
              <span className="text-xs text-gray-600 min-w-[60px] text-center">
                WhatsApp
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <LinkedinShareButton title={link.title!} url={link.url!}>
                <LinkedinIcon className="w-12 h-12 rounded-full" />
              </LinkedinShareButton>
              <span className="text-xs text-gray-600 min-w-[60px] text-center">
                LinkedIn
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <TelegramShareButton title={link.title!} url={link.url!}>
                <TelegramIcon className="w-12 h-12 rounded-full" />
              </TelegramShareButton>
              <span className="text-xs text-gray-600 min-w-[60px] text-center">
                Telegram
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <EmailShareButton title={link.title!} url={link.url!}>
                <EmailIcon className="w-12 h-12 rounded-full" />
              </EmailShareButton>
              <span className="text-xs text-gray-600 min-w-[60px] text-center">
                Email
              </span>
            </div>

            {isClient && (
              <div className="flex-shrink-0">
                <button
                  onClick={handleNativeShare}
                  className="flex flex-col items-center gap-1 w-16"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <Share className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-600 min-w-[60px] text-center">
                    More
                  </span>
                </button>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-6 text-center space-y-4">
          <h3 className="font-semibold">Join on Wookielink</h3>
          <p className="text-sm text-gray-500">
            Get your own free Wookielink. The only link in bio trusted by 50M+
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
