import type { Metadata } from 'next';
import Image             from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { DotShield }     from '@/components/ui/DotShield';
import { FadeUp }        from '@/components/ui/FadeUp';

export const metadata: Metadata = buildMetadata({
  title:       'About',
  description: 'Software engineer with a passion for building well-crafted, performant systems — open to full-stack, backend, and security roles.',
  path:        '/about',
});

// ── Placeholder skills — owner updates these in Phase 8 ──────────────────────
const SKILLS: Record<string, string[]> = {
  'Languages':      ['TypeScript', 'Python', 'Go', 'Rust', 'SQL', 'Bash'],
  'Frameworks':     ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS'],
  'Databases':      ['PostgreSQL', 'Redis', 'SQLite', 'Prisma'],
  'Tools & DevOps': ['Git', 'Docker', 'Vercel', 'GitHub Actions', 'Linux'],
  'Security':       ['Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'OWASP'],
};

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function DownloadIcon() {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const pageStyle = {
  maxWidth: '1200px',
  margin:   '0 auto',
  padding:  '4rem 2rem 8rem',
};

export default function AboutPage() {
  const showSecurity = process.env.NEXT_PUBLIC_SHOW_SECURITY_SKILLS === 'true';
  const showCV       = process.env.NEXT_PUBLIC_SHOW_CV_DOWNLOAD     === 'true';
  const githubUrl    = process.env.NEXT_PUBLIC_GITHUB_URL            ?? '#';

  return (
    <main style={pageStyle}>

      {/* ── Page heading ───────────────────────────────────────── */}
      <DotShield tight className="mb-16">
        <p
          className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
          style={{ letterSpacing: '0.12em' }}
        >
          My Story
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
          className="font-heading text-4xl font-bold text-text-primary"
          style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          About Me
        </h1>
      </DotShield>

      {/* ── Bio + headshot ─────────────────────────────────────── */}
      {/*
        Mobile:  column-reverse → headshot above text
        Desktop: flex-row → text left, headshot right
      */}
      <div className="flex flex-col-reverse md:flex-row gap-12 mb-20 items-start">

        {/* Left — bio, role statement, CTAs */}
        <FadeUp className="flex-1 min-w-0">
          {/* Role openness statement — prominently displayed, not buried */}
          <div
            className="mb-6 rounded-md px-4 py-3"
            style={{
              border:          '1px solid var(--color-accent-border)',
              backgroundColor: 'var(--color-accent-subtle)',
            }}
          >
            <p className="font-body text-sm font-medium text-text-accent">
              Open to full-stack, backend, and security engineering opportunities.
            </p>
          </div>

          {/* Bio — placeholder, owner replaces in Phase 8 */}
          <p
            className="font-body text-base text-text-secondary mb-4"
            style={{ lineHeight: 1.75 }}
          >
            I&apos;m a software engineer with a genuine curiosity for how systems are built and
            broken. My background spans full-stack web development, systems programming, and
            application security — I find the overlap between them the most interesting place
            to work.
          </p>
          <p
            className="font-body text-base text-text-secondary mb-4"
            style={{ lineHeight: 1.75 }}
          >
            I care deeply about writing code that is correct, maintainable, and fast. I&apos;ve
            built production web apps, contributed to open-source tooling, and spent time
            poking at security vulnerabilities in controlled environments — each of which has
            made me a better engineer.
          </p>
          <p
            className="font-body text-base text-text-secondary"
            style={{ lineHeight: 1.75 }}
          >
            I&apos;m currently a student finishing my degree and actively looking for roles where
            I can contribute meaningfully from day one while continuing to learn from an
            experienced team. If that sounds like your organisation, I&apos;d love to talk.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
            >
              <GitHubIcon />
              View GitHub
            </a>

            {showCV && (
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
              >
                <DownloadIcon />
                Download CV
              </a>
            )}
          </div>
        </FadeUp>

        {/* Right — headshot */}
        <FadeUp delay={0.1} className="self-center md:self-start flex-shrink-0">
          <Image
            src="/headshot.jpg"
            alt="Profile photo"
            width={240}
            height={240}
            priority
            className="rounded-full object-cover"
            style={{ border: '2px solid var(--color-border-default)' }}
          />
        </FadeUp>
      </div>

      {/* ── Skills ─────────────────────────────────────────────── */}
      <FadeUp>
        <DotShield tight className="mb-10">
          <p
            className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
            style={{ letterSpacing: '0.12em' }}
          >
            What I Know
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
          <h2
            className="font-heading text-3xl font-bold text-text-primary"
            style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Skills
          </h2>
        </DotShield>
      </FadeUp>

      {/* Skill categories */}
      {Object.entries(SKILLS).map(([category, items], i) => {
        if (category === 'Security' && !showSecurity) return null;

        return (
          <FadeUp key={category} delay={i * 0.06} className="mb-10">
            <h3
              className="font-body text-xs font-semibold text-text-tertiary uppercase mb-3"
              style={{ letterSpacing: '0.10em' }}
            >
              {category}
            </h3>

            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap:                 '12px',
              }}
            >
              {items.map(skill => (
                <div
                  key={skill}
                  className="group rounded-md text-center transition-all duration-fast bg-bg-surface border border-border-default hover:border-accent-border hover:bg-accent-subtle"
                  style={{ padding: '16px 12px', cursor: 'default' }}
                >
                  <p className="font-body text-xs font-medium text-text-secondary group-hover:text-text-accent transition-colors duration-fast">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        );
      })}
    </main>
  );
}
