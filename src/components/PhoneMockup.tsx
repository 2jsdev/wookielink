import { FC, ReactNode, useState, useEffect } from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';

interface PhoneMockupProps {
  children: ReactNode;
}

export const PhoneMockup: FC<PhoneMockupProps> = ({ children }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    const setIntervalAtStartOfNextMinute = () => {
      const now = new Date();
      const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      updateTime();

      setTimeout(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
      }, delay);
    };

    const cleanup = setIntervalAtStartOfNextMinute();
    return cleanup;
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="relative p-2 shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)] rounded-[2.5rem] border dark:border-gray-700 overflow-hidden w-[320px] h-[600px] mx-auto">
      <div className="flex justify-between items-center mt-4 px-8 z-10">
        <span className="text-xs font-semibold">{formatTime(time)}</span>
        <div className="flex items-center space-x-1">
          <Signal size={12} color="currentColor" />
          <Wifi size={12} color="currentColor" />
          <Battery size={12} color="currentColor" />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};
