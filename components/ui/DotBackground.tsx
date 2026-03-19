'use client';

import { useEffect, useRef } from 'react';
import { getShieldRects } from '@/lib/dotShield';

const DOT_GAP       = 24;
const DOT_RESTING_R = 1;
const DOT_MAX_R     = 3;
const INFLUENCE_R   = 100;
const BG_DARK       = '#0f0f1a';
const BG_LIGHT      = '#f8f8fc';

export function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    function draw() {
      if (!canvas || !ctx) return;
      const W     = canvas.width;
      const H     = canvas.height;
      const mx    = mouse.current.x;
      const my    = mouse.current.y;
      const light = document.documentElement.classList.contains('light');

      ctx.fillStyle = light ? BG_LIGHT : BG_DARK;
      ctx.fillRect(0, 0, W, H);

      const cols       = Math.ceil(W / DOT_GAP) + 1;
      const rows       = Math.ceil(H / DOT_GAP) + 1;
      const shieldRects = getShieldRects();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_GAP;
          const y = r * DOT_GAP;

          const shielded = shieldRects.some(
            rect => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom,
          );

          const dist = shielded ? Infinity : Math.hypot(x - mx, y - my);
          const raw  = Math.max(0, 1 - dist / INFLUENCE_R);
          const t    = raw * raw * (3 - 2 * raw);

          const radius = DOT_RESTING_R + t * (DOT_MAX_R - DOT_RESTING_R);
          const alpha  = light
            ? 0.10 + t * 0.25   // light: 10% resting → 35% max
            : 0.35 + t * 0.45;  // dark:  35% resting → 80% max (unchanged)

          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = t > 0 ? t * 3 : 0;
          ctx.shadowBlur    = t > 0 ? t * 6 : 0;
          ctx.shadowColor   = t > 0 ? `rgba(0,0,0,${t * 0.5})` : 'transparent';

          ctx.fillStyle = light
            ? `rgba(82,82,122,${alpha})`   // echoes --color-text-secondary
            : `rgba(150,150,150,${alpha})`;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowColor   = 'transparent';
      ctx.shadowBlur    = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
