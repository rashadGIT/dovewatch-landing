// Fetches the same live plan catalog app.dovewatch.com/signup/plan renders
// (backend/src/modules/signup, GET /signup/plans) — so this site's pricing
// page shows real numbers instead of a static copy that drifts. Overridable
// via NEXT_PUBLIC_API_ORIGIN for local dev (see .env.example).
const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN ?? 'https://api.dovewatch.com';

export interface PlanCatalogEntry {
  tier: 'starter' | 'growth';
  label: string;
  priceCents: number;
  seatLimit: number;
  popular?: boolean;
}

export async function getPlans(): Promise<PlanCatalogEntry[]> {
  const res = await fetch(`${API_ORIGIN}/signup/plans`);
  if (!res.ok) {
    throw new Error(`Failed to load plans: ${res.status}`);
  }
  return res.json();
}
