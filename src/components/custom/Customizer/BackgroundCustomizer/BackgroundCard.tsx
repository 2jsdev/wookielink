import React from 'react';
import cn from 'classnames';

interface BackgroundCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  isPro?: boolean;
  badgeContent?: React.ReactNode;
}

const BackgroundCard = ({
  selected,
  onClick,
  label,
  children,
  isPro = false,
  badgeContent,
  ...props
}: BackgroundCardProps) => {
  return (
    <button
      className="upgrade-lock-tooltip group relative flex w-full flex-col items-center focus:outline-none"
      data-testid="ThemeItem"
      data-selected={selected ? 'true' : 'false'}
      aria-label={label}
      type="button"
      onClick={onClick}
      {...props}
    >
      <span
        className={cn(
          'relative flex w-full flex-shrink-0 rounded-sm border-2 pt-[150%] ring-black ring-offset-2 transition-all ease-out group-focus-visible:ring-2',
          selected ? 'border-pebble' : 'border-transparent'
        )}
      >
        <span
          className={cn(
            'absolute left-0 top-0 flex h-full w-full rounded-sm border-transparent transition-all ease-out',
            selected ? 'border-8 scale-100' : 'border'
          )}
        >
          <span className="relative w-full overflow-hidden rounded-sm border border-sand">
            {children}
          </span>
        </span>
        {isPro && (
          <div
            data-testid="ProBadge"
            className="upgrade-lock-tooltip group inline-flex items-center justify-between overflow-hidden rounded-xl bg-black bg-opacity-50 px-1.5 py-0.5 text-xs font-semibold text-white absolute right-3 top-3"
          >
            <span className="w-0 select-none overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:w-6 group-hover:opacity-100">
              Pro
            </span>
            {badgeContent}
          </div>
        )}
      </span>
      <p className=" text-sm align-self-end mt-1 text-center">{label}</p>
    </button>
  );
};

export default BackgroundCard;
