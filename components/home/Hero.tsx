'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DotShield } from '@/components/ui/DotShield';

const TAGLINE = 'Building full-stack products.';

const showCV       = process.env.NEXT_PUBLIC_SHOW_CV_DOWNLOAD === 'true';
const showCalendly = process.env.NEXT_PUBLIC_CALENDLY_ENABLED === 'true';
const githubUrl    = process.env.NEXT_PUBLIC_GITHUB_URL  ?? '#';
const calendlyUrl  = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#';

const btnClass =
  'inline-flex items-center gap-2 rounded-full border border-accent text-text-accent ' +
  'font-body text-sm font-semibold px-6 py-3 bg-transparent ' +
  'transition-all duration-fast hover:bg-accent-subtle';

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function Headshot({ size }: { size: number }) {
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid var(--color-border-default)',
        position: 'relative',
        backgroundColor: 'var(--color-bg-surface)',
        flexShrink: 0,
      }}
    >
      <Image
        src="/headshot.jpg"
        alt="Profile photo"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [chevronVisible, setChevronVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(TAGLINE.slice(0, i));
      if (i === TAGLINE.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onScroll() {
      const current = window.scrollY;
      const projectsTop = document.getElementById('projects')?.offsetTop ?? Infinity;

      // Hide permanently once the projects section reaches the top of the viewport
      if (current >= projectsTop - 80) {
        setChevronVisible(false);
        lastScrollY.current = current;
        return;
      }

      // Above projects section — hide on scroll-down, show on scroll-up
      if (current > lastScrollY.current) {
        setChevronVisible(false);
      } else if (current < lastScrollY.current) {
        setChevronVisible(true);
      }
      lastScrollY.current = current;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      className="relative flex items-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Mobile: headshot above text */}
        <div className="flex justify-center mb-10 md:hidden">
          <Headshot size={200} />
        </div>

        {/* Layout: 2-col grid on desktop, single column on mobile */}
        <div
          className="flex flex-col md:grid md:items-center"
          style={{
            gap: '64px',
            gridTemplateColumns: '1fr 420px',
          }}
        >
          {/* Left column: text content — each element shielded individually */}
          <div>
            <DotShield tight>
              <h1
                className="font-heading font-bold text-text-primary"
                style={{ fontSize: '60px', lineHeight: 1.1, marginBottom: '16px' }}
              >
                Daniel Chen
              </h1>
            </DotShield>

            <DotShield tight>
              <h2
                className="font-heading font-bold text-text-primary"
                style={{ fontSize: '48px', lineHeight: 1.2, marginBottom: '24px' }}
              >
                {displayed}
                <span className="typewriter-cursor" aria-hidden="true">_</span>
              </h2>
            </DotShield>

            <DotShield tight>
              <p
                className="font-body text-text-secondary"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.6,
                  maxWidth: '480px',
                  marginBottom: '48px',
                }}
              >
                Student software engineer open to frontend, backend, full-stack,
                and security roles. Eager to build, ship, and learn.
              </p>
            </DotShield>

            <DotShield tight>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  <GitHubIcon />
                  View my GitHub
                </a>

                {showCV && (
                  <a href="/cv.pdf" download className={btnClass}>
                    <DownloadIcon />
                    Download CV
                  </a>
                )}

                {showCalendly && (
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnClass}
                  >
                    <CalendarIcon />
                    Book a call
                  </a>
                )}
              </div>
            </DotShield>
          </div>

          {/* Right column: headshot (desktop only) */}
          <div className="hidden md:flex justify-center items-center">
            <Headshot size={360} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — fixed to viewport, hides on scroll-down, reappears on scroll-up */}
      <button
        onClick={scrollToProjects}
        aria-label="Scroll to projects"
        className="rounded-full bg-transparent hover:bg-accent-subtle transition-colors duration-fast p-3"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          zIndex: 30,
          border: 'none',
          cursor: 'pointer',
          transform: 'translateX(-50%)',
          opacity: chevronVisible ? 1 : 0,
          pointerEvents: chevronVisible ? 'auto' : 'none',
          transition: 'opacity 250ms ease-out',
        }}
      >
        {/* Inner wrapper carries the bounce; outer carries the show/hide — two elements avoids transform conflict */}
        <div className="animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-tertiary"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
    </section>
  );
}
