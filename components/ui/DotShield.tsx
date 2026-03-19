'use client';

import { useEffect, useRef } from 'react';
import { registerShield } from '@/lib/dotShield';

/**
 * Invisible wrapper that prevents dot-background dots from lifting
 * when the cursor is over the covered area. Use it around buttons,
 * headings, or any text that floats over the canvas.
 */
/**
 * tight — applies width: fit-content so the shield hugs text/buttons
 *         instead of expanding to the full container width.
 */
export function DotShield({
  children,
  className,
  style,
  tight = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerShield(() => el.getBoundingClientRect());
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={tight ? { width: 'fit-content', ...style } : style}
    >
      {children}
    </div>
  );
}
