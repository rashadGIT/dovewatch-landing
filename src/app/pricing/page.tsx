import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { PricingPlans } from '@/components/pricing-plans';
import { appLinks } from '@/lib/app-links';

export const metadata: Metadata = {
  title: 'Pricing — DoveWatch',
};

export default function PricingPage() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl font-semibold text-foreground">Choose a plan</h1>
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
        Sized around what an independent funeral home actually needs, from a single location to a
        multi-location group — no per-case pricing, no confusing tiers.
      </p>
      <PricingPlans />
      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href={appLinks.login}
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          Sign In
          <span aria-hidden="true" className="text-[0.85em] opacity-70">
            &#8599;
          </span>
        </Link>
      </p>
    </Section>
  );
}
