'use client';

import { ProjectCard }      from './ProjectCard';
import type { Project, ProjectCategory } from '@/types/project';

interface CategoryGroupProps {
  category:   ProjectCategory;
  projects:   Project[];
  /** Stagger offset — pass the total card count before this group */
  startIndex?: number;
}

export function CategoryGroup({
  category,
  projects,
  startIndex = 0,
}: CategoryGroupProps) {
  return (
    <div>
      {/* Eyebrow label */}
      <p
        className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
        style={{ letterSpacing: '0.12em' }}
      >
        Category
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

      {/* Category heading */}
      <h2
        className="font-heading text-3xl font-bold text-text-primary mb-8"
        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        {category}
      </h2>

      {/* 2-col responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            delay={(startIndex + idx) * 0.08}
          />
        ))}
      </div>
    </div>
  );
}
