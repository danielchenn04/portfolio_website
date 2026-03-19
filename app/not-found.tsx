import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="dot-pattern"
      style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '2rem',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        {/* Eyebrow */}
        <p
          className="font-heading text-text-accent"
          style={{
            fontSize:      '0.75rem',
            fontWeight:    600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom:  '0.5rem',
          }}
        >
          Error
        </p>

        {/* Ghosted 404 */}
        <div
          className="font-heading text-text-primary"
          aria-hidden="true"
          style={{
            fontSize:     '120px',
            fontWeight:   700,
            lineHeight:   1,
            opacity:      0.08,
            userSelect:   'none',
            marginBottom: '-1.5rem',
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="font-heading text-text-primary"
          style={{
            fontSize:      '1.875rem',
            fontWeight:    700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            lineHeight:    1.2,
            marginBottom:  '1rem',
          }}
        >
          Page Not Found
        </h1>

        {/* Sub-copy */}
        <p
          className="font-body text-text-secondary text-base"
          style={{ marginBottom: '2rem', lineHeight: 1.6 }}
        >
          This page doesn&apos;t exist or has been moved.
        </p>

        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 transition-colors duration-fast bg-transparent hover:bg-accent-subtle"
          style={{ textDecoration: 'none' }}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
