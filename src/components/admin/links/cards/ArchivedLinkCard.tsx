import { Button } from '@/components/ui/button';
import { Trash, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/interfaces/Link';
import PermanentElimination from '@/components/admin/links/cards/sections/PermanentElimination';
import RestoreLink from '@/components/admin/links/cards/sections/RestoreLink';
import useUiStore, { CURRENT_ACTION, CurrentAction } from '@/store/uiStore';

interface Props {
  link: Link;
}

export default function ArchivedLinkCard({ link }: Props) {
  const {
    currentLinkId,
    setCurrentLinkId,
    currentAction,
    setCurrentAction,
    errorMessage,
    triggerError,
  } = useUiStore();

  const checkIfActionIsSelected = (action: CurrentAction) => {
    return currentAction === action && currentLinkId === link.id;
  };

  return (
    <div className="flex bg-background my-4 cursor-auto border-2 rounded-md transition-all duration-300">
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div className="flex flex-col w-full p-2 sm:p-3 md:p-4 overflow-hidden ml-3">
            <div className="flex w-full min-w-0 items-center gap-2 flex-nowrap overflow-hidden">
              <div className="flex flex-col flex-1 min-w-0 gap-2 overflow-hidden">
                <div className="min-w-0 overflow-hidden truncate">
                  <p className="text-sm md:text-base lg:text-lg truncate">
                    {link.title}
                  </p>
                </div>
                <div className="min-w-0 overflow-hidden truncate">
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground truncate">
                    {link.url}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <Button
                  variant={
                    checkIfActionIsSelected(CURRENT_ACTION.restoreLink)
                      ? 'default'
                      : 'ghost'
                  }
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    if (
                      currentLinkId === link.id &&
                      currentAction === CURRENT_ACTION.restoreLink
                    ) {
                      setCurrentLinkId(null);
                      setCurrentAction(null);
                    } else {
                      setCurrentLinkId(link.id);
                      setCurrentAction(CURRENT_ACTION.restoreLink);
                    }
                  }}
                >
                  <Archive className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    checkIfActionIsSelected(CURRENT_ACTION.permanentElimination)
                      ? 'default'
                      : 'ghost'
                  }
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    if (
                      currentLinkId === link.id &&
                      currentAction === CURRENT_ACTION.permanentElimination
                    ) {
                      setCurrentLinkId(null);
                      setCurrentAction(null);
                    } else {
                      setCurrentLinkId(link.id);
                      setCurrentAction(CURRENT_ACTION.permanentElimination);
                    }
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {currentLinkId === link.id && !!currentAction && (
          <AnimatePresence>
            <motion.div
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="w-full"
            >
              {currentAction === CURRENT_ACTION.permanentElimination && (
                <PermanentElimination onError={triggerError} />
              )}

              {currentAction === CURRENT_ACTION.restoreLink && (
                <RestoreLink link={link} onError={triggerError} />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {errorMessage && currentLinkId === link.id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-center text-sm flash-error"
          >
            {errorMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
}
