import type { IContactSalesRequest } from '@rashadgit/shared-types';

// Submits directly to the same backend endpoint app.dovewatch.com/contact-sales
// posts to (backend/src/modules/contact-sales), so the lead form lives on
// this site instead of bouncing visitors to the app for it. Shares the
// NEXT_PUBLIC_API_ORIGIN override with plans-api.ts for local dev.
const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN ?? 'https://api.dovewatch.com';

// IContactSalesRequest is the shared source of truth for this shape (also
// used by backend's CreateContactSalesDto and frontend's
// lib/api/contact-sales.ts) — see packages/shared-types.
export async function submitContactSales(dto: IContactSalesRequest): Promise<void> {
  const res = await fetch(`${API_ORIGIN}/contact-sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit: ${res.status}`);
  }
}
