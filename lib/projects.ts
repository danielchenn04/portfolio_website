import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, ProjectCategory, ProjectFrontmatter } from '@/types/project';

const VALID_CATEGORIES: readonly ProjectCategory[] = [
  'Full Stack',
  'Security',
  'Frontend',
  'Backend',
  'Systems',
];

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');

function isValidCategory(value: unknown): value is ProjectCategory {
  return (
    typeof value === 'string' &&
    (VALID_CATEGORIES as readonly string[]).includes(value)
  );
}

function parseFrontmatter(
  filename: string,
  data: Record<string, unknown>,
): ProjectFrontmatter {
  const required = [
    'title', 'slug', 'category', 'order',
    'stack', 'tags', 'summary', 'liveUrl',
    'repoUrl', 'screenshot', 'date',
  ] as const;

  for (const field of required) {
    const val = data[field];
    if (val === undefined || val === null || val === '') {
      throw new Error(
        `[content/projects/${filename}] Missing required frontmatter field: "${field}"`,
      );
    }
  }

  if (!isValidCategory(data['category'])) {
    throw new Error(
      `[content/projects/${filename}] Invalid category "${String(data['category'])}". ` +
      `Must be one of: ${VALID_CATEGORIES.join(', ')}`,
    );
  }

  const fm: ProjectFrontmatter = {
    title:      String(data['title']),
    slug:       String(data['slug']),
    category:   data['category'],
    order:      Number(data['order']),
    stack:      data['stack'] as string[],
    tags:       data['tags'] as string[],
    summary:    String(data['summary']),
    liveUrl:    String(data['liveUrl']),
    repoUrl:    String(data['repoUrl']),
    screenshot: String(data['screenshot']),
    date:       String(data['date']),
  };

  const embedUrl = data['embedUrl'];
  if (embedUrl !== undefined && embedUrl !== null && embedUrl !== '') {
    fm.embedUrl = String(embedUrl);
  }

  return fm;
}

function readProject(filename: string): Project {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(filename, data as Record<string, unknown>);
  return { ...frontmatter, content };
}

export async function getAllSlugs(): Promise<string[]> {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  return files.map(f => f.replace(/\.mdx$/, ''));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readProject(`${slug}.mdx`);
}

export async function getProjectsByCategory(): Promise<Partial<Record<ProjectCategory, Project[]>>> {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  const projects = files.map(readProject);

  const grouped: Partial<Record<ProjectCategory, Project[]>> = {};

  for (const project of projects) {
    const existing = grouped[project.category];
    if (existing) {
      existing.push(project);
    } else {
      grouped[project.category] = [project];
    }
  }

  // Sort alphabetically by category key, then by `order` within each category
  const sorted: Partial<Record<ProjectCategory, Project[]>> = {};
  const sortedKeys = (Object.keys(grouped) as ProjectCategory[]).sort();

  for (const key of sortedKeys) {
    const categoryProjects = grouped[key];
    if (categoryProjects) {
      sorted[key] = [...categoryProjects].sort((a, b) => a.order - b.order);
    }
  }

  return sorted;
}
