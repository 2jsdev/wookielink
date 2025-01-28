'use client';

import { motion } from 'framer-motion';
import { Rocket, Link, Shield } from 'lucide-react';
import { useState } from 'react';

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: 'Lightning Fast',
      description:
        'Create your WookieLink in seconds and start sharing immediately.',
    },
    {
      icon: <Link className="h-10 w-10 text-primary" />,
      title: 'All Your Links',
      description:
        'Combine all your social media and important links in one place.',
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Secure & Private',
      description: 'Your data is protected with top-notch security measures.',
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
    <section id="features" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-16"
        >
          Why Choose{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
            WookieLink
          </span>
          ?
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className="bg-primary/10 p-5 rounded-full mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
              <motion.div
                className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-2xl -z-10"
                initial={{ scale: 0 }}
                animate={{ scale: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
