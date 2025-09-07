import { useLayoutEffect, useState } from 'react';

export function useResizeObserver(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [mainSize, setMainSize] = useState<{ width: number; height: number } | null>(null);
  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMainSize({ width: rect.width, height: rect.height });
    }
  }, []);

  return mainSize;
}
