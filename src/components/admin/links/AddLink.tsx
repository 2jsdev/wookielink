'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateLinkForm from './CreateLinkForm';
import { motion, AnimatePresence } from 'framer-motion';

const AddLink = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  };

  return (
    <div>
      <AnimatePresence>
        {!isFormOpen && (
          <motion.div key="add-button" {...animationProps}>
            <Button className="mb-6 w-full" onClick={openForm}>
              + Add link
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div key="create-link-form" {...animationProps}>
            <CreateLinkForm onClose={closeForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddLink;
