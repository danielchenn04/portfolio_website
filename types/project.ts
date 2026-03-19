export type ProjectCategory =
  | 'Full Stack'
  | 'Security'
  | 'Frontend'
  | 'Backend'
  | 'Systems';

export interface ProjectFrontmatter {
  title:      string;
  slug:       string;
  category:   ProjectCategory;
  order:      number;
  stack:      string[];
  tags:       string[];
  summary:    string;
  liveUrl:    string;
  repoUrl:    string;
  embedUrl?:  string;
  screenshot: string;
  date:       string;   // "YYYY-MM"
}

export interface Project extends ProjectFrontmatter {
  content: string;    // raw MDX body — compiled at render time by MDXRemote
}
