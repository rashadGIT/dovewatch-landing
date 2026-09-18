import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';
import './globals.css';

const SITE_URL = 'https://dovewatch.com';
const SITE_DESCRIPTION =
  'Digital intake, case management, task checklists, e-signatures, FTC GPL compliance, and grief follow-ups for independent funeral homes.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DoveWatch — Funeral Home Operations Software',
    template: '%s — DoveWatch',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'DoveWatch',
    locale: 'en_US',
    url: '/',
    title: 'DoveWatch — Funeral Home Operations Software',
    description: SITE_DESCRIPTION,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2447c6',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'DoveWatch',
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      '@type': 'SoftwareApplication',
      name: 'DoveWatch',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: SITE_DESCRIPTION,
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/pricing`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
