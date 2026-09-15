// Single source of truth for every link back into the real app
// (app.dovewatch.com), so a domain change or route rename only needs an
// edit here rather than a repo-wide find/replace. Overridable via
// NEXT_PUBLIC_APP_ORIGIN (see .env.example) so local dev can point at a
// locally running frontend (e.g. http://localhost:3000) instead of prod.
const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN ?? 'https://app.dovewatch.com';

export const appLinks = {
  login: `${APP_ORIGIN}/login`,
  signup: `${APP_ORIGIN}/signup`,
  // The real plan-selection page (frontend/src/app/signup/plan/page.tsx) —
  // kept as a fallback link for when the live plan fetch on this site's own
  // /pricing page fails (see plans-api.ts + pricing-plans.tsx).
  pricing: `${APP_ORIGIN}/signup/plan`,
  // Real, live lead-gen form + API (frontend/src/app/contact-sales/page.tsx).
  contactSales: `${APP_ORIGIN}/contact-sales`,
  // Where a plan card's "Select" button sends you, mirroring
  // frontend/src/app/signup/plan/page.tsx's own
  // router.push(`/signup/account?plan=${tier}`).
  planSignup: (tier: string) => `${APP_ORIGIN}/signup/account?plan=${tier}`,
} as const;
