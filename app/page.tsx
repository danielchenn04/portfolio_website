import { Suspense } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { ProjectPreview } from '@/components/home/ProjectPreview';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FadeUp } from '@/components/ui/FadeUp';
import { DotShield } from '@/components/ui/DotShield';

const sectionStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem 8rem',
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Featured projects ─────────────────────────────── */}
      <FadeUp>
        <section id="projects" style={{ ...sectionStyle, paddingTop: '6rem' }}>
          <SectionHeading eyebrow="Featured Work" heading="Projects" />
          <Suspense fallback={null}>
            <ProjectPreview />
          </Suspense>
        </section>
      </FadeUp>

      {/* ── About snippet ─────────────────────────────────── */}
      <FadeUp>
        <section style={sectionStyle}>
          <SectionHeading eyebrow="About Me" heading="Who I Am" />
          <DotShield tight>
            <p
              className="font-body text-base text-text-secondary mt-8"
              style={{ maxWidth: '600px', lineHeight: 1.75 }}
            >
              I&apos;m a student software engineer with a passion for building clean,
              functional products. Open to frontend, backend, full-stack, and security
              roles — wherever I can contribute, grow, and make an impact.
            </p>
          </DotShield>
          <DotShield tight className="mt-8">
            <Link
              href="/about"
              className="font-body text-sm font-semibold text-text-accent hover:underline inline-flex items-center gap-1"
            >
              Learn more about me →
            </Link>
          </DotShield>
        </section>
      </FadeUp>

      {/* ── Contact CTA ───────────────────────────────────── */}
      <FadeUp>
        <section style={sectionStyle}>
          <SectionHeading eyebrow="Let's Talk" heading="Get In Touch" />
          <DotShield tight>
            <p
              className="font-body text-base text-text-secondary mt-8"
              style={{ maxWidth: '520px', lineHeight: 1.75 }}
            >
              Whether you have a project in mind, want to chat about engineering, or
              are looking to hire — I&apos;d love to hear from you.
            </p>
          </DotShield>
          <DotShield tight className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent text-text-accent font-body text-sm font-semibold px-6 py-3 bg-transparent transition-all duration-fast hover:bg-accent-subtle"
            >
              Send me a message →
            </Link>
          </DotShield>
        </section>
      </FadeUp>
    </>
  );
}
