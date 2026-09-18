import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "How DoveWatch's marketing site uses analytics cookies and handles visitor data.",
  alternates: { canonical: '/privacy' },
};

// Deliberately minimal — placeholder copy so the cookie-consent banner's
// link isn't a dead end. Replace with real legal copy before relying on it
// for compliance.
export default function PrivacyPage() {
  return (
    <Section>
      <h1 className="text-3xl font-semibold text-foreground">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          This site uses Google Analytics to understand how visitors use dovewatch.com. We only
          load analytics cookies after you accept them via the cookie banner; declining means no
          analytics cookies are set.
        </p>
        <p>
          Google Analytics collects standard usage data (pages visited, referring site, device
          type) and does not receive any information about funeral home cases, families, or other
          data stored in the DoveWatch application itself.
        </p>
        <p>
          Questions about this policy or your data can be sent to{' '}
          <a href="mailto:privacy@dovewatch.com" className="underline hover:text-foreground">
            privacy@dovewatch.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
