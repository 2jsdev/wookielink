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
    <div className=" lg:w-[290px] lg:h-[calc(100vh-360px)] xl:w-[360px] xl:h-[calc(100vh-240px)] rounded-[40px] border-4 border-gray-800 flex flex-col relative overflow-y-auto overflow-hidden">
      <div className="flex justify-between items-center mt-4 px-8 z-10">
        <span className="text-xs font-semibold">{formatTime(time)}</span>
        <div className="flex items-center space-x-1">
          <Signal size={12} color="currentColor" />
          <Wifi size={12} color="currentColor" />
          <Battery size={12} color="currentColor" />
        </div>
      </div>

      <div className="rounded-[40px] sm:rounded-[40px] md:rounded-[50px] p-4 flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};
