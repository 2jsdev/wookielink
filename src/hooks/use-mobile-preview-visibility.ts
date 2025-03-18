import { useEffect, useState } from 'react';

export function useMobilePreviewVisibility() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const previewElement = document.getElementById('mobile-preview-container');
      if (!previewElement || getComputedStyle(previewElement).display === 'none') {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    updateVisibility();

    const observer = new ResizeObserver(updateVisibility);
    const target = document.getElementById('mobile-preview-container');

    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return isHidden;
}
