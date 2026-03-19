interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span
      className="font-body text-xs font-medium text-text-accent rounded-full px-2 py-0.5"
      style={{
        backgroundColor: 'var(--color-accent-subtle)',
        border:          '1px solid var(--color-accent-border)',
        letterSpacing:   '0.04em',
      }}
    >
      {tech}
    </span>
  );
}
