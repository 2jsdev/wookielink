import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useMobilePreviewVisibility() {
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();

  const excludedRoutes = ['/admin/analytics'];

  useEffect(() => {
    const updateVisibility = () => {
      const previewElement = document.getElementById(
        'mobile-preview-container'
      );
      if (
        !previewElement ||
        getComputedStyle(previewElement).display === 'none'
      ) {
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

  const isExcludedRoute = excludedRoutes.includes(pathname);

  return isHidden && !isExcludedRoute;
}
