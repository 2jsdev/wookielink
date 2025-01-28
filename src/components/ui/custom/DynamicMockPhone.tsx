'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';

const mockData = [
  {
    username: '@2jsdev',
    profileImage: '/images/avatars/2jsdev.jpeg',
    links: ['GitHub', 'LinkedIn'],
    theme: {
      id: 'minimal-dark',
      name: 'Minimal Dark',
      preview:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YSxV5hqf21ScOw3kAqVQd91OHoGtNx.png',
      style: {
        background: 'bg-zinc-900',
        textColor: 'text-white',
        buttonStyle: 'bg-zinc-800 hover:bg-zinc-700',
      },
    },
  },
  {
    username: '@andre',
    profileImage: '/images/avatars/andrea.png',
    links: ['WhatsApp', 'Facebook'],
    theme: {
      id: 'pastel-dream',
      name: 'Pastel Dream',
      preview:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YSxV5hqf21ScOw3kAqVQd91OHoGtNx.png',
      style: {
        background: 'bg-gradient-to-b from-pink-200 to-blue-200',
        textColor: 'text-gray-800',
        buttonStyle: 'bg-white/50 backdrop-blur-sm hover:bg-white/70',
      },
    },
  },
  {
    username: '@sady',
    profileImage: '/images/avatars/sady.png',
    links: ['Portfolio', 'Twitter', 'Instagram'],
    theme: {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      preview:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YSxV5hqf21ScOw3kAqVQd91OHoGtNx.png',
      style: {
        background: 'bg-gradient-to-b from-blue-400 to-blue-600',
        textColor: 'text-white',
        buttonStyle: 'bg-white/20 backdrop-blur-sm hover:bg-white/30',
      },
    },
  },
  {
    username: '@maika',
    profileImage: '/images/avatars/maika.png',
    links: ['YouTube', 'Blog'],
    theme: {
      id: 'neon-nights',
      name: 'Neon Nights',
      preview:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YSxV5hqf21ScOw3kAqVQd91OHoGtNx.png',
      style: {
        background: 'bg-black',
        textColor: 'text-pink-500',
        buttonStyle: 'border border-pink-500 hover:bg-pink-500/10',
      },
    },
  },
];

const animations = [
  { in: { opacity: 0, y: 50 }, out: { opacity: 0, y: -50 } },
  { in: { opacity: 0, x: -50 }, out: { opacity: 0, x: 50 } },
  { in: { opacity: 0, scale: 0.5 }, out: { opacity: 0, scale: 1.5 } },
  { in: { opacity: 0, rotate: -90 }, out: { opacity: 0, rotate: 90 } },
];

export function DynamicMockPhone() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockData.length);
      setAnimationIndex(Math.floor(Math.random() * animations.length));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentData = mockData[currentIndex];
  const currentAnimation = animations[animationIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 hidden lg:block"
    >
      <div className="relative p-2 shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)] rounded-[2.5rem] border dark:border-gray-700 overflow-hidden w-[320px] h-[600px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentData.username + 'background'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${currentData.theme.style.background}`}
          />
        </AnimatePresence>
        <div className="relative flex flex-col items-center justify-start mt-4 px-4 space-y-6 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentData.username + 'avatar'}
              initial={currentAnimation.in}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              exit={currentAnimation.out}
              transition={{ duration: 0.5 }}
            >
              <Avatar className="w-24 h-24 bg-black">
                <AvatarImage
                  src={currentData.profileImage}
                  alt="Profile photo"
                />
                <AvatarFallback>
                  <UserRound className="w-2/3 h-2/3 text-white" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentData.username}
              initial={currentAnimation.in}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              exit={currentAnimation.out}
              transition={{ duration: 0.5 }}
              className={`text-lg font-semibold ${currentData.theme.style.textColor}`}
            >
              {currentData.username}
            </motion.h2>
          </AnimatePresence>
          <div className="w-full space-y-2">
            <AnimatePresence mode="wait">
              {currentData.links.map((link, index) => (
                <motion.div
                  key={currentData.username + link}
                  initial={currentAnimation.in}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  exit={currentAnimation.out}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`block w-full p-3 text-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${currentData.theme.style.buttonStyle} ${currentData.theme.style.textColor}`}
                >
                  {link}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
