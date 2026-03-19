import type { Metadata }     from 'next';
import { notFound }           from 'next/navigation';
import Image                  from 'next/image';
import { MDXRemote }          from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllSlugs } from '@/lib/projects';
import { buildMetadata }      from '@/lib/metadata';
import { ReadingProgressBar } from '@/components/projects/ReadingProgressBar';
import { ProjectEmbed }       from '@/components/projects/ProjectEmbed';
import { DotShield }          from '@/components/ui/DotShield';

interface PageProps {
  params: { slug: string };
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Not Found' };
  return buildMetadata({
    title:       project.title,
    description: project.summary,
    path:        `/projects/${project.slug}`,
    image:       project.screenshot,
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}

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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const pageStyle = {
  maxWidth: '860px',
  margin:   '0 auto',
  padding:  '4rem 2rem 8rem',
};

export default async function ProjectSlugPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const readTime = calculateReadTime(project.content);

  return (
    <>
      <ReadingProgressBar />

      <article style={pageStyle}>
        {/* ── Header ──────────────────────────────────────────── */}
        <DotShield tight>
          {/* Category eyebrow */}
          <p
            className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
            style={{ letterSpacing: '0.12em' }}
          >
            {project.category}
          </p>

          {/* Accent divider bar */}
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

          {/* Title */}
          <h1
            className="font-heading text-4xl font-bold text-text-primary mb-4"
            style={{ letterSpacing: '0.04em' }}
          >
            {project.title}
          </h1>

          {/* Meta row: date · read time */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-body text-sm text-text-secondary">{project.date}</span>
            <span className="font-body text-sm text-text-tertiary" aria-hidden="true">·</span>
            <span className="font-body text-sm text-text-secondary">{readTime} min read</span>
          </div>

          {/* Summary */}
          <p
            className="font-body text-lg text-text-secondary mb-8"
            style={{ lineHeight: 1.6, maxWidth: '640px' }}
          >
            {project.summary}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
            >
              <ExternalLinkIcon />
              Live Demo
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-colors duration-fast hover:bg-accent-subtle"
            >
              <GitHubIcon />
              View Code
            </a>
          </div>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="font-body text-xs font-medium text-text-accent rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: 'var(--color-accent-subtle)',
                  border:          '1px solid var(--color-accent-border)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </DotShield>

        {/* ── Live embed (if available) ─────────────────────── */}
        {project.embedUrl !== undefined && (
          <div className="mb-14">
            <ProjectEmbed
              embedUrl={project.embedUrl}
              title={project.title}
              screenshotSrc={project.screenshot}
              screenshotAlt={`${project.title} screenshot`}
              liveUrl={project.liveUrl}
            />
          </div>
        )}

        {/* ── Static screenshot (no embed) ─────────────────── */}
        {project.embedUrl === undefined && (
          <div
            className="relative overflow-hidden rounded-md mb-14"
            style={{
              height: '400px',
              border: '1px solid var(--color-border-default)',
            }}
          >
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              sizes="860px"
              priority
            />
          </div>
        )}

        {/* ── MDX case study content ────────────────────────── */}
        <div className="prose-content">
          <MDXRemote source={project.content} />
        </div>
      </article>
    </>
  );
}
