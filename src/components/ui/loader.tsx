import React from 'react';

export function Loader({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full h-5 w-5 border-t-2 border-primary ${className}`}
    ></div>
  );
}
