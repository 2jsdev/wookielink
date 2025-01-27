'use client';

import { useRegisterLinkClickMutation } from '@/lib/api/linksApi';

export default function LinkItem({ user, link }: { user: any; link: any }) {
  const [registerLinkClick] = useRegisterLinkClickMutation();

  const handleClick = async () => {
    try {
      await registerLinkClick({ linkId: link.id, userId: user.id });
    } catch (error) {
      console.error('Failed to register link click:', error);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full p-3 text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      {link.label}
    </a>
  );
}
