'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
] as const;

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Navbar() {
  const pathname    = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastScrollY = useRef(0);

  // Scroll-hide behaviour
  useEffect(() => {
    function handleScroll() {
      const curr = window.scrollY;
      if (curr > lastScrollY.current && curr > 64) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrolled(curr > 10);
      lastScrollY.current = curr;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close overlay on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close overlay on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const githubUrl   = process.env.NEXT_PUBLIC_GITHUB_URL   ?? '#';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#';

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position:         'fixed',
          top:              0,
          left:             0,
          right:            0,
          zIndex:           40,
          height:           '4rem',
          transform:        hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition:       'transform 250ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out',
          backdropFilter:   scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          backgroundColor:  scrolled ? 'var(--color-navbar-bg)' : 'transparent',
          borderBottom:     scrolled ? '1px solid var(--color-border-default)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth:           '1200px',
            margin:             '0 auto',
            height:             '100%',
            display:            'grid',
            gridTemplateColumns:'1fr auto 1fr',
            alignItems:         'center',
            padding:            '0 2rem',
          }}
        >
          {/* Left: Name */}
          <Link
            href="/"
            className="font-heading text-text-primary hover:text-text-accent transition-colors duration-fast"
            style={{ fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}
          >
            Daniel Chen
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-body text-sm font-medium transition-colors duration-fast ${
                    isActive ? 'text-text-accent' : 'text-text-primary hover:text-text-accent'
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right: GitHub + ThemeToggle (desktop) / Hamburger (mobile) */}
          <div className="flex items-center justify-end" style={{ gap: '1rem' }}>
            <div className="hidden md:flex items-center" style={{ gap: '1rem' }}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-text-secondary hover:text-text-accent transition-colors duration-fast flex"
              >
                <GitHubIcon />
              </a>
              <ThemeToggle />
            </div>

            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden text-text-primary flex items-center justify-center"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          50,
            backgroundColor: 'var(--color-bg-base)',
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            justifyContent:  'center',
            animation:       'fadeInScale 200ms ease-out forwards',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-text-primary hover:text-text-accent transition-colors duration-fast"
            style={{
              position:   'absolute',
              top:        '1.25rem',
              right:      '2rem',
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '4px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
            {NAV_LINKS.map(({ href, label }, i) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-heading font-bold transition-colors duration-fast ${
                    isActive ? 'text-text-accent' : 'text-text-primary hover:text-text-accent'
                  }`}
                  style={{
                    fontSize:    '2rem',
                    textDecoration: 'none',
                    animation:   `fadeInUp 300ms ease-out ${i * 80}ms both`,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Social icons at bottom of overlay */}
          <div
            style={{
              marginTop:  '3rem',
              display:    'flex',
              alignItems: 'center',
              gap:        '1.5rem',
              animation:  `fadeInUp 300ms ease-out ${NAV_LINKS.length * 80}ms both`,
            }}
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary hover:text-text-accent transition-colors duration-fast flex"
            >
              <GitHubIcon />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary hover:text-text-accent transition-colors duration-fast flex"
            >
              <LinkedInIcon />
            </a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
