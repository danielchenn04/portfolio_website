'use client';

import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FieldErrors {
  name?:    string | undefined;
  email?:   string | undefined;
  message?: string | undefined;
}

function WarningIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}
    >
      <path d="M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
    </svg>
  );
}

const inputBase: React.CSSProperties = {
  width:           '100%',
  backgroundColor: 'var(--color-bg-subtle)',
  border:          '1px solid var(--color-border-default)',
  borderRadius:    'var(--radius-sm)',
  padding:         '12px 16px',
  fontFamily:      'var(--font-body)',
  fontSize:        '15px',
  color:           'var(--color-text-primary)',
  outline:         'none',
  display:         'block',
};

const inputError: React.CSSProperties = {
  ...inputBase,
  border:          '1px solid var(--color-error)',
  backgroundColor: 'var(--color-error-subtle)',
};

export function ContactForm() {
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [message,     setMessage]     = useState('');
  const [honeypot,    setHoneypot]    = useState('');
  const [status,      setStatus]      = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim())    errors.name    = 'Name is required.';
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) errors.message = 'Message is required.';
    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus('loading');
    setServerError('');

    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message, honeypot }),
      });
      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        setServerError(data.error ?? 'Failed to send message. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setServerError('Failed to send message. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="flex items-center gap-3 rounded-md px-4 py-3 font-body text-sm"
        style={{
          backgroundColor: 'rgba(52, 211, 153, 0.10)',
          border:          '1px solid var(--color-success)',
          color:           'var(--color-success)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Message sent! I&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}
    >
      {/* Honeypot — hidden from real users, filled by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        aria-hidden="true"
        style={{ position: 'absolute', opacity: 0, height: 0, pointerEvents: 'none' }}
      />

      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block font-body text-sm font-medium text-text-secondary mb-1.5"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={fieldErrors.name ? inputError : inputBase}
        />
        {fieldErrors.name && (
          <p className="font-body text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            <WarningIcon />{fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block font-body text-sm font-medium text-text-secondary mb-1.5"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={fieldErrors.email ? inputError : inputBase}
        />
        {fieldErrors.email && (
          <p className="font-body text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            <WarningIcon />{fieldErrors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block font-body text-sm font-medium text-text-secondary mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="What's on your mind?"
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{
            ...(fieldErrors.message ? inputError : inputBase),
            minHeight: '140px',
            resize:    'vertical',
          }}
        />
        {fieldErrors.message && (
          <p className="font-body text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            <WarningIcon />{fieldErrors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <span
              aria-hidden="true"
              style={{
                width:           '16px',
                height:          '16px',
                border:          '2px solid transparent',
                borderTopColor:  'var(--color-accent)',
                borderRadius:    '50%',
                animation:       'spin 0.8s linear infinite',
                display:         'inline-block',
                flexShrink:      0,
              }}
            />
            Sending…
          </>
        ) : 'Send Message'}
      </button>

      {status === 'error' && serverError && (
        <p className="font-body text-sm text-center" style={{ color: 'var(--color-error)' }}>
          <WarningIcon />{serverError}
        </p>
      )}
    </form>
  );
}
