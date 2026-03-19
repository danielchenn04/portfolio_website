'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FadeUp }    from '@/components/ui/FadeUp';
import { TechBadge } from './TechBadge';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  delay?:  number;
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

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const router = useRouter();

  return (
    <FadeUp delay={delay}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(`/projects/${project.slug}`)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(`/projects/${project.slug}`);
          }
        }}
        aria-label={`View ${project.title} case study`}
        className="group bg-bg-surface border border-border-default rounded-md overflow-hidden"
        style={{
          cursor:     'pointer',
          boxShadow:  'var(--shadow-card)',
          transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
        }}
      >
        <div
          className="p-6 group-hover:-translate-y-0.5"
          style={{ transition: 'transform var(--duration-fast) var(--ease-out)' }}
        >
          {/* Screenshot — bleeds to card edges */}
          {project.screenshot && (
            <div
              className="relative overflow-hidden"
              style={{
                height:       '200px',
                margin:       '-24px -24px 20px -24px',
                borderRadius: '6px 6px 0 0',
              }}
            >
              <Image
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          )}

          {/* Category label */}
          <p
            className="font-heading font-semibold text-text-accent uppercase mb-2"
            style={{ fontSize: '11px', letterSpacing: '0.10em' }}
          >
            {project.category}
          </p>

          {/* Title */}
          <h3 className="font-body text-xl font-semibold text-text-primary mb-2">
            {project.title}
          </h3>

          {/* Summary */}
          <p
            className="font-body text-sm text-text-secondary mb-4"
            style={{ lineHeight: 1.6 }}
          >
            {project.summary}
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-sm text-text-tertiary transition-colors duration-fast hover:text-text-accent"
              onClick={e => e.stopPropagation()}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <GitHubIcon />
              Code
            </a>

            <span className="font-body text-sm font-medium text-text-accent inline-flex items-center gap-1">
              View project →
            </span>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
