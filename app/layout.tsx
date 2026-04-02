import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { DotBackground } from '@/components/ui/DotBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const PageTransition = dynamic(
  () => import('@/components/ui/PageTransition').then(m => m.PageTransition),
  { ssr: false },
);

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-heading',
  display:  'swap',
});

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-body',
  display:  'swap',
});

export const metadata: Metadata = {
  title:       'Daniel Chen - Tech Portfolio',
  description: 'Software engineer portfolio - building clean, functional products across full-stack, backend, and security.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme       = cookieStore.get('theme')?.value ?? 'dark';

  return (
    <html lang="en" className={theme}>
      <body className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>
        <DotBackground />

        {/* All visible UI lives above the canvas (z-index 1) */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          {/* Offset content below the fixed navbar (64px = 4rem) */}
          <div style={{ paddingTop: '4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <PageTransition>
              {children}
            </PageTransition>
          </div>

          <Footer />
        </div>

        <Analytics />
      </body>
    </html>
  );
}
