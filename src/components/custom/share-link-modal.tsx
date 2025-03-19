'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Check, Link as LinkIcon, Share, X } from 'lucide-react';
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
  const [isMounted, setIsMounted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (copiedLink) {
      const timer = setTimeout(() => setCopiedLink(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedLink]);

  const handleCopyLink = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(link.fullShortUrl!);
      setCopiedLink(true);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async (event: React.MouseEvent) => {
    event.stopPropagation();
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

  if (!open || !isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-lg p-6 max-w-lg w-full shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Share link</h2>

        <div
          className={cn(
            'w-full md:w-[327px] rounded-lg p-6 shadow-low-elevation-light hover:scale-[1.01] hover:shadow-max-elevation-light text-center transition-all duration-300 ease-in-out',
            {
              'bg-primary text-white': link.ogData?.ogTitle,
              'bg-gray-100 text-black': !link.ogData?.ogTitle,
            }
          )}
          onClick={() => window.open(link.url!, '_blank')}
        >
          {link.ogData?.ogImage?.[0]?.url && (
            <div className="flex justify-center mb-3">
              <Image
                src={link.ogData.ogImage[0].url}
                alt={link.ogData?.ogTitle || 'Thumbnail'}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
            </div>
          )}
          <h3 className="mt-3 text-2xl font-bold">
            {link.ogData?.ogTitle || link.title}
          </h3>
          <div className="flex justify-center w-full">
            <p className="text-sm mt-2 truncate max-w-[230px] text-ellipsis overflow-hidden whitespace-nowrap text-center">
              {link.url}
            </p>
          </div>
          {link.ogData?.ogDescription && (
            <div className="flex flex-col items-center justify-center mt-4 text-sm gap-3">
              <p
                className={`${
                  expanded || link.ogData.ogDescription.length <= 100
                    ? 'line-clamp-none'
                    : 'line-clamp-3'
                } break-words`}
              >
                {link.ogData.ogDescription}
              </p>

              {link.ogData.ogDescription.length > 100 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  className="px-3 py-1 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <span className="text-gray-800 dark:text-gray-100">
                    {expanded ? 'Less' : 'More'}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        <ScrollArea className="w-full mt-4" autoFocus={false}>
          <div className="flex space-x-2 my-4">
            <div className="flex-shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-1 w-16"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center 
        bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
        transition-colors duration-200 shadow-md"
                >
                  {copiedLink ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <LinkIcon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn('text-xs min-w-[60px] text-center', {
                    'text-green-500': copiedLink,
                  })}
                >
                  {copiedLink ? 'Copied!' : 'Copy link'}
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <FacebookShareButton title={link.title!} url={link.url!}>
                <FacebookIcon className="w-12 h-12 rounded-full" />
              </FacebookShareButton>
              <span className="text-xs min-w-[60px] text-center">Facebook</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <TwitterShareButton title={link.title!} url={link.url!}>
                <TwitterIcon className="w-12 h-12 rounded-full" />
              </TwitterShareButton>
              <span className="text-xs min-w-[60px] text-center">Twitter</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <WhatsappShareButton title={link.title!} url={link.url!}>
                <WhatsappIcon className="w-12 h-12 rounded-full" />
              </WhatsappShareButton>
              <span className="text-xs min-w-[60px] text-center">WhatsApp</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <LinkedinShareButton title={link.title!} url={link.url!}>
                <LinkedinIcon className="w-12 h-12 rounded-full" />
              </LinkedinShareButton>
              <span className="text-xs min-w-[60px] text-center">LinkedIn</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <TelegramShareButton title={link.title!} url={link.url!}>
                <TelegramIcon className="w-12 h-12 rounded-full" />
              </TelegramShareButton>
              <span className="text-xs min-w-[60px] text-center">Telegram</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-16">
              <EmailShareButton title={link.title!} url={link.url!}>
                <EmailIcon className="w-12 h-12 rounded-full" />
              </EmailShareButton>
              <span className="text-xs min-w-[60px] text-center">Email</span>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleNativeShare}
                className="flex flex-col items-center gap-1 w-16"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center 
          bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
          transition-colors duration-200 shadow-md"
                >
                  <Share className="w-5 h-5" />
                </div>
                <span className="text-xs min-w-[60px] text-center">More</span>
              </button>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-8 text-center">
          <h3 className="font-semibold">Join on Wookielink</h3>
          <p className="text-sm">
            Get your own free Wookielink. The only link in bio trusted by 50M+
            people.
          </p>
          <Link
            href="/"
            className="inline-block w-full mt-6 px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/50 transition"
          >
            Sign up free
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
