import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { DotBackground } from '@/components/ui/DotBackground';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Software engineer portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value ?? 'dark';

  return (
    <html lang="en" className={theme}>
      <body className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>
        <DotBackground />
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
