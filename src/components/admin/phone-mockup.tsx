'use client';

import { type FC, type ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
}

export const PhoneMockup: FC<PhoneMockupProps> = ({ children }) => {
  return (
    <div
      id="phone-preview"
      className="relative shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)] rounded-[2.5rem] border dark:border-gray-700 overflow-hidden w-[320px] h-[600px] mx-auto"
    >
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
        {children}
      </div>
    </div>
  );
};
