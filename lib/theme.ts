export const THEME_COOKIE_NAME = 'theme';

export type Theme = 'dark' | 'light';

/** Normalises a raw cookie value to a valid Theme. Defaults to 'dark'. */
export function parseTheme(value: string | undefined): Theme {
  return value === 'light' ? 'light' : 'dark';
}

/** Builds a document.cookie assignment string for the theme cookie. */
export function buildThemeCookieString(theme: Theme): string {
  return `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}
