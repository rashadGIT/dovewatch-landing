'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { appLinks } from '@/lib/app-links';
import { getPlans, type PlanCatalogEntry } from '@/lib/plans-api';

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

function FeatureLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      {children}
    </li>
  );
}

// Mirrors frontend/src/app/signup/plan/page.tsx's card layout, fetching the
// same live GET /signup/plans data — so this site's pricing page shows real,
// current tiers instead of a static copy that drifts out of sync.
export function PricingPlans() {
  const [plans, setPlans] = useState<PlanCatalogEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getPlans()
      .then(setPlans)
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Plans are taking a moment to load.
        </p>
        <ButtonLink href={appLinks.pricing} className="mt-4" external newTab>
          See plans &amp; pricing
        </ButtonLink>
      </div>
    );
  }

  if (!plans) {
    return (
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-secondary" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.tier}
          className={`relative flex flex-col rounded-2xl border bg-card p-6 ${
            plan.popular ? 'border-2 border-primary shadow-sm' : 'border-border'
          }`}
        >
          {plan.popular && (
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              Most popular
            </span>
          )}
          <h2 className="text-lg font-semibold text-foreground">{plan.label}</h2>
          <p className="mt-1 text-3xl font-semibold text-foreground">
            {formatPrice(plan.priceCents)}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </p>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            {plan.tier === 'starter'
              ? 'For a single location just getting started'
              : 'For homes running one or two locations'}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground">
            <FeatureLine>Up to {plan.seatLimit} seats</FeatureLine>
            <FeatureLine>Unlimited cases</FeatureLine>
            {plan.tier === 'growth' && <FeatureLine>All compliance packs included</FeatureLine>}
          </ul>
          <ButtonLink href={appLinks.planSignup(plan.tier)} className="mt-5" external newTab>
            Select {plan.label}
          </ButtonLink>
        </div>
      ))}

      <div className="relative flex flex-col rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Enterprise</h2>
        <p className="mt-1 text-3xl font-semibold text-foreground">Custom pricing</p>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          For funeral homes with 3+ locations
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-foreground">
          <FeatureLine>Unlimited seats</FeatureLine>
          <FeatureLine>Unlimited cases</FeatureLine>
          <FeatureLine>Dedicated onboarding</FeatureLine>
          <FeatureLine>Priority support</FeatureLine>
        </ul>
        <ButtonLink href="/contact" variant="outline" className="mt-5">
          Contact Sales
        </ButtonLink>
      </div>
    </div>
  );
}
