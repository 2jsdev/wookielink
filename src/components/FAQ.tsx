'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export function FAQ() {
  const faqs = [
    {
      question: 'What is Wookielink?',
      answer:
        'Wookielink is a platform that allows you to create a personalized landing page with all your important links in one place, making it easy to share your online presence.',
    },
    {
      question: 'How do I create my Wookielink?',
      answer:
        "Simply sign up, choose your unique username, and start adding your links. It's that easy!",
    },
    {
      question: 'Can I customize my Wookielink?',
      answer:
        'Yes! You can customize your Wookielink with different themes, colors, and even add your own branding.',
    },
    {
      question: 'Is there a limit to how many links I can add?',
      answer:
        'The number of links you can add depends on your plan. Free users can add a limited number, while paid plans offer more or unlimited links.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="faq" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-white"
        >
          Frequently Asked{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
            Questions
          </span>
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="overflow-hidden"
                >
                  <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
