'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

const STORAGE_KEY = 'dovewatch-cookie-consent';

type Consent = 'accepted' | 'declined';

// Gates GA4 behind an accept/decline choice: the gtag.js script (and the
// cookies it sets) only loads after the visitor accepts, and the choice is
// remembered in localStorage so returning visitors aren't asked again.
// Renders nothing at all when GA isn't configured (e.g. local dev).
// null = not yet read from localStorage (server-rendered / pre-hydration),
// undefined = read and no prior choice found — keeping these distinct
// avoids flashing the banner for a frame before localStorage is checked.
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null | undefined>(null);

  useEffect(() => {
    try {
      setConsent((localStorage.getItem(STORAGE_KEY) as Consent | null) ?? undefined);
    } catch {
      setConsent(undefined);
    }
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  function choose(next: Consent) {
    setConsent(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore — worst case we ask again next visit.
    }
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {consent === undefined && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background px-6 py-4 shadow-lg">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              We use cookies to understand how visitors use this site. See our{' '}
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="outline" onClick={() => choose('declined')}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => choose('accepted')}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
