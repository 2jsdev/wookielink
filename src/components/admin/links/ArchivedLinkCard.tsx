'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Trash,
  Archive,
  X,
  LinkIcon,
  Facebook,
  MessageCircle,
  Music,
  Youtube,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  useDeleteLinkMutation,
  useRestoreLinkMutation,
} from '@/lib/api/linksApi';
import { selectLinkById } from '@/lib/store/slices/linksSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchivedLinkCardProps {
  id: string;
}

export default function ArchivedLinkCard({ id }: ArchivedLinkCardProps) {
  const [deleteLink] = useDeleteLinkMutation();
  const [restoreLink] = useRestoreLinkMutation();

  const link = useSelector((state: RootState) => selectLinkById(state)(id));

  const [showConfirmation, setShowConfirmation] = useState<
    'delete' | 'restore' | null
  >(null);

  if (!link) return null;

  const handleDelete = () => {
    deleteLink(id);
    setShowConfirmation(null);
  };

  const handleRestore = () => {
    restoreLink(id);
    setShowConfirmation(null);
  };

  const getIcon = (label: string) => {
    switch (label) {
      case 'Website':
        return <LinkIcon className="h-5 w-5" />;
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      case 'WhatsApp':
        return <MessageCircle className="h-5 w-5" />;
      case 'TikTok':
        return <Music className="h-5 w-5" />;
      case 'YouTube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-background">
      <CardContent className="flex flex-col p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-grow">
            <div className="rounded-full p-2">{getIcon(link.label)}</div>
            <div className="space-y-1 flex-grow">
              <p className="text-sm font-medium">{link.label}</p>
              <p className="text-xs">{link.url}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmation('restore')}
            >
              <Archive className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmation('delete')}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showConfirmation === 'restore' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col mt-4 w-full"
            >
              <div className="flex justify-between items-center pt-5 pb-2 w-full border-t-2">
                <span className="text-sm font-medium w-full text-center">
                  Restore
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmation(null)}
                >
                  <X className="h-5 w-5" />
                </div>
              </div>

              <span className="self-center mb-4 text-xs mt-2 text-center">
                Restore this link to your Wookielink
              </span>

              <div className="flex justify-between items-center space-x-4 mt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(null)}
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
            </motion.div>
          )}

          {showConfirmation === 'delete' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col mt-4 w-full"
            >
              <div className="flex justify-between items-center pt-5 pb-2 w-full border-t-2">
                <span className="text-sm font-medium w-full text-center">
                  Delete
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmation(null)}
                >
                  <X className="h-5 w-5" />
                </div>
              </div>

              <span className="self-center mb-4 text-xs mt-2 text-center">
                Permanently delete this link and its analytics data?
              </span>

              <div className="flex justify-between items-center space-x-4 mt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(null)}
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
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
