import type { Metadata }    from 'next';
import { getProjectsByCategory } from '@/lib/projects';
import { buildMetadata }         from '@/lib/metadata';
import { DotShield }             from '@/components/ui/DotShield';
import { ProjectsClient }        from '@/components/projects/ProjectsClient';
import type { ProjectCategory }  from '@/types/project';

export const metadata: Metadata = buildMetadata({
  title:       'Projects',
  description: 'A collection of software engineering projects spanning full-stack web apps, systems programming, and more.',
  path:        '/projects',
});

const pageStyle = {
  maxWidth: '1200px',
  margin:   '0 auto',
  padding:  '4rem 2rem 8rem',
};

export default async function ProjectsPage() {
  const grouped    = await getProjectsByCategory();
  const categories = Object.keys(grouped) as ProjectCategory[];

  return (
    <main style={pageStyle}>
      {/* Page heading */}
      <DotShield tight className="mb-12">
        <p
          className="font-heading text-xs font-semibold text-text-accent uppercase mb-2"
          style={{ letterSpacing: '0.12em' }}
        >
          My Work
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
          Projects
        </h1>
      </DotShield>

      <ProjectsClient grouped={grouped} categories={categories} />
    </main>
  );
}
