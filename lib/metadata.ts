import type { Metadata } from 'next';

// TODO: Replace OWNER_NAME with your full name before launch
const OWNER_NAME = '[Your Name]';

export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title:        string;
  description:  string;
  path:         string;
  image?:       string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const url     = `${siteUrl}${path}`;

  return {
    title:       `${title} | ${OWNER_NAME}`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: `${OWNER_NAME} — Software Engineer`,
      images:   [{ url: image ?? `${siteUrl}/og-default.png` }],
      type:     'website',
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  };
}
