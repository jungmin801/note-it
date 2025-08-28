import { useEffect, useState } from 'react';

export function useResizeObserver() {
  const [mainSize, setMainSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setMainSize({ width, height });
      }
    });

    observer.observe(mainEl);

    return () => observer.disconnect();
  }, []);

  return mainSize;
}
