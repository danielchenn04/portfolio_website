'use client';

import { useState, useEffect, useCallback } from 'react';

interface DocModalProps {
  title: string;
  htmlContent: string;
}

function FileIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function DocModal({ title, htmlContent }: DocModalProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Trigger button — matches existing CTA button style */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
      >
        <FileIcon />
        Security Design Report
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          1000,
            display:         'flex',
            alignItems:      'flex-start',
            justifyContent:  'center',
            padding:         '2rem 1rem',
            backgroundColor: 'rgba(0,0,0,0.72)',
            backdropFilter:  'blur(4px)',
            overflowY:       'auto',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div
            style={{
              width:           '100%',
              maxWidth:        '780px',
              borderRadius:    '12px',
              border:          '1px solid var(--color-border-default)',
              backgroundColor: 'var(--color-bg-elevated)',
              display:         'flex',
              flexDirection:   'column',
              maxHeight:       'calc(100vh - 4rem)',
              overflow:        'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '1.25rem 1.5rem',
                borderBottom:   '1px solid var(--color-border-default)',
                flexShrink:     0,
              }}
            >
              <span
                className="font-heading text-base font-semibold text-text-primary"
                style={{ letterSpacing: '0.02em' }}
              >
                {title}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close document"
                className="text-text-secondary hover:text-text-primary transition-colors duration-fast"
                style={{
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  padding:    '4px',
                  display:    'flex',
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable content */}
            <div
              className="doc-modal-body"
              style={{ overflowY: 'auto', padding: '2rem 2rem 3rem' }}
              // Content is trusted — written at build time from a local file we own.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      )}
    </>
  );
}
