interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  className?: string;
}

export function SectionHeading({ eyebrow, heading, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      {/* Eyebrow label */}
      <p
        className="font-heading text-xs font-semibold text-text-accent"
        style={{ letterSpacing: '0.12em', marginBottom: '8px', textTransform: 'uppercase' }}
      >
        {eyebrow}
      </p>

      {/* Accent divider bar */}
      <div
        aria-hidden="true"
        style={{
          width: '48px',
          height: '2px',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '2px',
          marginBottom: '32px',
        }}
      />

      {/* Section heading */}
      <h2
        className="font-heading text-3xl font-bold text-text-primary"
        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        {heading}
      </h2>
    </div>
  );
}
