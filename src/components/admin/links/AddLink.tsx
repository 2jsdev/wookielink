'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateLinkForm from './CreateLinkForm';
import { motion, AnimatePresence } from 'framer-motion';
import useUiStore from '@/store/uiStore';
import { cn } from '@/lib/utils';

const AddLink = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { viewArchived, isAnyCardOpen } = useUiStore();

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  };

  return (
    <>
      <Button
        className={cn('mb-6 w-full h-12 transition-all block', {
          'opacity-100 filter blur-[2px] pointer-events-none': isAnyCardOpen(),
          'hidden ': isFormOpen || viewArchived,
        })}
        onClick={openForm}
      >
        + Add
      </Button>

      {isFormOpen && (
        <AnimatePresence>
          <motion.div key="create-link-form" {...animationProps}>
            <CreateLinkForm onClose={closeForm} />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default AddLink;
