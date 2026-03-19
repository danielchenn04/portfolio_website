import Link from 'next/link';

interface ButtonProps {
  children:   React.ReactNode;
  href?:      string;
  onClick?:   () => void;
  icon?:      React.ReactNode;
  disabled?:  boolean;
  isLoading?: boolean;
  external?:  boolean;
  className?: string;
  type?:      'button' | 'submit' | 'reset';
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      style={{ animation: 'spin 0.6s linear infinite' }}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

const baseClass =
  'inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold ' +
  'px-6 py-3 transition-colors duration-fast bg-transparent ' +
  'hover:bg-accent-subtle disabled:opacity-50 disabled:cursor-not-allowed';

export function Button({
  children,
  href,
  onClick,
  icon,
  disabled   = false,
  isLoading  = false,
  external   = false,
  className  = '',
  type       = 'button',
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const content = (
    <>
      {isLoading ? <Spinner /> : icon}
      {children}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClass} ${className}`}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={`${baseClass} ${className}`}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClass} ${className}`}
    >
      {content}
    </button>
  );
}
