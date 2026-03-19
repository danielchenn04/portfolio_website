'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryGroup } from './CategoryGroup';
import type { Project, ProjectCategory } from '@/types/project';

type FilterValue = 'All' | ProjectCategory;

interface ProjectsClientProps {
  grouped:    Partial<Record<ProjectCategory, Project[]>>;
  categories: ProjectCategory[];
}

export function ProjectsClient({ grouped, categories }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');

  // Build the set of entries to render based on the active filter
  const entries: Array<{ category: ProjectCategory; projects: Project[] }> = [];

  const keysToShow: ProjectCategory[] =
    activeFilter === 'All' ? categories : [activeFilter];

  for (const key of keysToShow) {
    const projects = grouped[key];
    if (projects && projects.length > 0) {
      entries.push({ category: key, projects });
    }
  }

  // Compute the running card index for stagger delays
  let cardOffset = 0;

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by category">
        {(['All', ...categories] as FilterValue[]).map(cat => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              aria-pressed={isActive}
              className="font-body rounded-full transition-all duration-fast"
              style={{
                padding:         '6px 16px',
                fontSize:        '13px',
                fontWeight:      isActive ? 600 : 500,
                border:          `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
                backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                color:           isActive ? 'var(--color-text-accent)'  : 'var(--color-text-secondary)',
                cursor:          'pointer',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filtered content — AnimatePresence cross-fades on filter change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-16">
            {entries.map(({ category, projects }) => {
              const startIndex = cardOffset;
              cardOffset += projects.length;
              return (
                <CategoryGroup
                  key={category}
                  category={category}
                  projects={projects}
                  startIndex={startIndex}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
