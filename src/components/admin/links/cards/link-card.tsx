'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from '@/interfaces/link';
import { Switch } from '@/components/ui/switch';
import { GripVertical } from 'lucide-react';
import EditableInput from '@/components/custom/editable-input';
import { motion, AnimatePresence } from 'framer-motion';
import Confirmation from '@/components/admin/links/cards/sections/confirmation';
import { updateUserLink } from '@/actions/update-user-link';
import useUiStore, { CURRENT_ACTION } from '@/store/ui-store';
import useLinkStore from '@/store/link-store';
import LinkActions from '@/components/admin/links/cards/link-actions';
import LayoutSelector from '@/components/admin/links/cards/sections/layout-selector';
import Thumbnail from './sections/thumbnail';
import { cn } from '@/lib/utils';

interface Props {
  link: Link;
  isDragging: boolean;
  listeners?: Record<string, any>;
}

export default function LinkCard({ link, isDragging, listeners }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const {
    currentLinkId,
    setCurrentLinkId,
    currentAction,
    setCurrentAction,
    errorMessage,
    triggerError,
    isAnyCardOpen,
  } = useUiStore();
  const { updateLink } = useLinkStore();

  const isActive = currentLinkId === link.id;

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [isActive]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        setTimeout(() => {
          contentRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        }, 200);
      });

      resizeObserverRef.current.observe(contentRef.current);
    }

    return () => resizeObserverRef.current?.disconnect();
  }, [currentAction]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
  //       if (currentLinkId === link.id && currentAction) {
  //         setCurrentAction(null);
  //         setCurrentLinkId(null);
  //       }
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [
  //   currentLinkId,
  //   currentAction,
  //   link.id,
  //   setCurrentAction,
  //   setCurrentLinkId,
  // ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!cardRef.current) return;

      // Detecta si el clic ocurrió dentro de algún Dialog
      const dialogs = document.querySelectorAll('[role="dialog"]');
      for (const dialog of dialogs) {
        if (dialog.contains(event.target as Node)) {
          return; // No cerrar si el clic está dentro del Dialog
        }
      }

      // Si el clic fue fuera del card, cerrar el action
      if (!cardRef.current.contains(event.target as Node)) {
        if (currentLinkId === link.id && currentAction) {
          setCurrentAction(null);
          setCurrentLinkId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [
    currentLinkId,
    currentAction,
    link.id,
    setCurrentAction,
    setCurrentLinkId,
  ]);

  const handleSaveTitle = async (newTitle: string) => {
    if (currentLinkId !== link.id) {
      setCurrentLinkId(link.id);
      setCurrentAction(null);
    }

    const backupLink = { ...link };
    const optimisticallyUpdatedLink = { ...link, title: newTitle };
    updateLink(optimisticallyUpdatedLink);

    try {
      const updatedLink = await updateUserLink({
        id: link.id,
        title: newTitle,
      });
      updateLink(updatedLink);
    } catch (error) {
      updateLink(backupLink);
      triggerError('Error updating title. Please try again.');
    }
  };

  const handleSaveUrl = async (url: string) => {
    if (currentLinkId !== link.id) {
      setCurrentLinkId(link.id);
      setCurrentAction(null);
    }

    const backupLink = { ...link };
    const optimisticallyUpdatedLink = { ...link, url };
    updateLink(optimisticallyUpdatedLink);

    try {
      const updatedLink = await updateUserLink({ id: link.id, url });
      updateLink(updatedLink);
    } catch (error) {
      updateLink(backupLink);
      triggerError('Error updating URL. Please try again.');
    }
  };

  const handleToggle = async () => {
    if (currentLinkId !== link.id) {
      setCurrentLinkId(link.id);
      setCurrentAction(null);
    }

    const backupLink = { ...link };
    const optimisticallyUpdatedLink = { ...link, active: !link.active };
    updateLink(optimisticallyUpdatedLink);

    try {
      const updatedLink = await updateUserLink({
        id: link.id,
        visible: !link.active,
      });
      updateLink(updatedLink);
    } catch (error) {
      updateLink(backupLink);
      triggerError('Error updating status. Please try again.');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'flex bg-background my-4 cursor-auto border-2 rounded-md transition-all duration-300',
        {
          'opacity-100 filter blur-[2px] pointer-events-none':
            !isActive && isAnyCardOpen(),
        }
      )}
    >
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div
            className="flex items-center justify-center w-8 h-full text-primary cursor-grab shrink-0"
            {...listeners}
          >
            <GripVertical className="w-4 h-4" aria-label="Drag to reorder" />
          </div>

          <div className="flex flex-col w-full p-2 sm:p-3 md:p-4 overflow-hidden">
            <div className="flex w-full min-w-0 items-center gap-2 flex-nowrap overflow-hidden">
              <div className="flex flex-col flex-1 min-w-0 gap-2 overflow-hidden">
                <EditableInput
                  initialValue={link.title ?? ''}
                  onSave={handleSaveTitle}
                />
                <EditableInput
                  initialValue={link.url ?? ''}
                  onSave={handleSaveUrl}
                />
              </div>
              <div className="shrink-0 flex items-center">
                <Switch checked={link.active} onCheckedChange={handleToggle} />
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <LinkActions link={link} />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentLinkId === link.id && !!currentAction && (
            <motion.div
              ref={contentRef}
              key={currentAction}
              layout
              layoutRoot
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full overflow-hidden"
            >
              {currentAction === CURRENT_ACTION.confirmation && (
                <Confirmation onError={triggerError} />
              )}

              {currentAction === CURRENT_ACTION.layout && (
                <LayoutSelector link={link} onError={triggerError} />
              )}

              {currentAction === CURRENT_ACTION.thumbnail && (
                <Thumbnail link={link} onError={triggerError} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {errorMessage && currentLinkId === link.id ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm flash-error"
          >
            {errorMessage}
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
