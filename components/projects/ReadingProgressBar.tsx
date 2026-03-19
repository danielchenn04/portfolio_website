'use client';

import { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
      setProgress(pct);
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        height:          '2px',
        width:           `${progress}%`,
        backgroundColor: 'var(--color-accent)',
        borderRadius:    '0 2px 2px 0',
        transition:      'width 50ms linear',
        zIndex:          100,
      }}
    />
  );
}
