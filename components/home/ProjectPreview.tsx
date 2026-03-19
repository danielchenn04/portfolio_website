import Link from 'next/link';
import { getProjectsByCategory } from '@/lib/projects';
import type { Project } from '@/types/project';

function TeaserCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div
        className="h-full bg-bg-surface border border-border-default rounded-md p-6 transition-all duration-fast group-hover:border-border-strong group-hover:-translate-y-0.5"
      >
        {/* Category label */}
        <p
          className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
          style={{ letterSpacing: '0.10em' }}
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
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-body text-xs font-medium text-text-accent rounded-full px-2 py-0.5"
              style={{
                backgroundColor: 'var(--color-accent-subtle)',
                border: '1px solid var(--color-accent-border)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <span className="font-body text-sm font-medium text-text-accent inline-flex items-center gap-1">
          View project →
        </span>
      </div>
    </Link>
  );
}

export async function ProjectPreview() {
  const grouped = await getProjectsByCategory();
  const projects = Object.values(grouped)
    .flatMap(p => p ?? [])
    .slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map(project => (
          <TeaserCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/projects"
          className="font-body text-sm font-semibold text-text-accent hover:underline inline-flex items-center gap-1"
        >
          View all projects →
        </Link>
      </div>
    </div>
  );
}
