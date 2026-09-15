'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { submitContactSales } from '@/lib/contact-sales-api';

// Mirrors frontend/src/app/contact-sales/page.tsx's fields and copy,
// submitting to the same backend endpoint directly — so a visitor fills
// this out here instead of being sent to the app just for a form.
export function ContactSalesForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    try {
      await submitContactSales({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        funeralHomeName: String(data.get('funeralHomeName') ?? ''),
        locationCount: Number(data.get('locationCount')),
        message: String(data.get('message') ?? '') || undefined,
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">Request received</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your request and will be in touch shortly.
        </p>
        <Link href="/pricing" className="mt-3 inline-block text-sm text-primary hover:underline">
          Back to pricing
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 max-w-md space-y-4 rounded-2xl border border-border bg-card p-6 text-left"
    >
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Your name
        </label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Work email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="funeralHomeName" className="text-sm font-medium text-foreground">
          Funeral home name
        </label>
        <Input id="funeralHomeName" name="funeralHomeName" required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="locationCount" className="text-sm font-medium text-foreground">
          Number of locations
        </label>
        <Input id="locationCount" name="locationCount" type="number" min={1} required />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Anything else we should know? (optional)
        </label>
        <Textarea id="message" name="message" rows={3} />
      </div>

      {error && (
        <div className="rounded-md bg-destructive-bg px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" disabled={submitting} className="w-full disabled:opacity-60">
        {submitting ? 'Sending…' : 'Send to sales'}
      </Button>
    </form>
  );
}
