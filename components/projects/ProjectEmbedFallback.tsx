import Image from 'next/image';

interface ProjectEmbedFallbackProps {
  src:     string;
  alt:     string;
  liveUrl: string;
  failed?: boolean;
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function ProjectEmbedFallback({
  src,
  alt,
  liveUrl,
  failed = false,
}: ProjectEmbedFallbackProps) {
  return (
    <div>
      <div
        className="relative overflow-hidden rounded-md"
        style={{
          height: '400px',
          border: '1px solid var(--color-border-default)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 900px"
        />
        {failed && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <p className="font-body text-sm text-text-secondary text-center px-4">
              Live demo unavailable in embedded view
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
        >
          <ExternalLinkIcon />
          Open full demo →
        </a>
      </div>
    </div>
  );
}
