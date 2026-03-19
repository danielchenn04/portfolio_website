import type { Metadata }     from 'next';
import { buildMetadata }      from '@/lib/metadata';
import { DotShield }          from '@/components/ui/DotShield';
import { CalendlyButton }     from '@/components/contact/CalendlyButton';
import { ContactForm }        from '@/components/contact/ContactForm';

export const metadata: Metadata = buildMetadata({
  title:       'Contact',
  description: "Get in touch — I'd love to hear about your project or opportunity.",
  path:        '/contact',
});

const pageStyle = {
  maxWidth: '860px',
  margin:   '0 auto',
  padding:  '4rem 2rem 8rem',
};

export default function ContactPage() {
  return (
    <main style={pageStyle}>
      {/* Page heading */}
      <DotShield tight className="mb-12">
        <p
          className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
          style={{ letterSpacing: '0.12em' }}
        >
          Get In Touch
        </p>
        <div
          aria-hidden="true"
          style={{
            width:           '48px',
            height:          '2px',
            backgroundColor: 'var(--color-accent)',
            borderRadius:    '2px',
            marginBottom:    '16px',
          }}
        />
        <h1
          className="font-heading text-4xl font-bold text-text-primary mb-4"
          style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          Contact
        </h1>
        <p
          className="font-body text-lg text-text-secondary"
          style={{ lineHeight: 1.6, maxWidth: '560px' }}
        >
          Have a project in mind, a role you think I&apos;d be a great fit for, or just want
          to say hello? Fill out the form below and I&apos;ll get back to you promptly.
        </p>
      </DotShield>

      {/* Calendly link — shown only when env var is "true" */}
      <div className="mb-10">
        <CalendlyButton />
      </div>

      {/* Contact form — max 560px per design spec */}
      <div style={{ maxWidth: '560px' }}>
        <ContactForm />
      </div>
    </main>
  );
}
