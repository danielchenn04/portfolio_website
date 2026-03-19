'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ProjectEmbedFallback } from './ProjectEmbedFallback';

interface ProjectEmbedProps {
  embedUrl:      string;
  title:         string;
  screenshotSrc: string;
  screenshotAlt: string;
  liveUrl:       string;
}

function EmbedSpinner() {
  return (
    <div
      aria-hidden="true"
      style={{
        width:       '32px',
        height:      '32px',
        border:      '2px solid var(--color-accent-subtle)',
        borderTop:   '2px solid var(--color-accent)',
        borderRadius:'50%',
        animation:   'spin 0.6s linear infinite',
      }}
    />
  );
}

export function ProjectEmbed({
  embedUrl,
  title,
  screenshotSrc,
  screenshotAlt,
  liveUrl,
}: ProjectEmbedProps) {
  const iframeRef             = useRef<HTMLIFrameElement>(null);
  const [height, setHeight]   = useState(600);
  const [isLoaded, setIsLoaded] = useState(false);
  const [failed, setFailed]   = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      let expectedOrigin: string;
      try {
        expectedOrigin = new URL(embedUrl).origin;
      } catch {
        return;
      }
      if (event.origin !== expectedOrigin) return;

      const data = event.data as { type?: string; height?: number } | null;
      if (data?.type !== 'portfolio-embed-resize') return;
      if (typeof data.height === 'number') {
        setHeight(data.height);
      }
      setIsLoaded(true);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [embedUrl]);

  return (
    <>
      {/* Mobile: always show screenshot fallback */}
      <div className="block md:hidden">
        <ProjectEmbedFallback
          src={screenshotSrc}
          alt={screenshotAlt}
          liveUrl={liveUrl}
        />
      </div>

      {/* Desktop: iframe with loading crossfade */}
      <div
        className="hidden md:block relative overflow-hidden rounded-md"
        style={{
          border:    '1px solid var(--color-border-default)',
          minHeight: `${height}px`,
        }}
      >
        {/* Screenshot placeholder — fades out once iframe loads */}
        <div
          className="absolute inset-0"
          style={{
            opacity:       isLoaded ? 0 : 1,
            transition:    'opacity 300ms ease',
            pointerEvents: isLoaded ? 'none' : 'auto',
            zIndex:        1,
          }}
        >
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            fill
            className="object-cover object-top"
            sizes="900px"
          />
          {/* Semi-transparent overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--color-bg-surface)', opacity: 0.4 }}
          />
          {/* Spinner */}
          {!failed && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
              <EmbedSpinner />
            </div>
          )}
        </div>

        {/* Live iframe */}
        {!failed && (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            height={height}
            width="100%"
            style={{ border: 'none', display: 'block' }}
            sandbox="allow-scripts allow-same-origin allow-forms"
            onError={() => setFailed(true)}
          />
        )}

        {/* Failed state overlay */}
        {failed && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
            style={{ zIndex: 2 }}
          >
            <p className="font-body text-sm text-text-secondary text-center">
              Live demo unavailable in embedded view
            </p>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
            >
              Open full demo →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
