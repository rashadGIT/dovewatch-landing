import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { ContactSalesForm } from '@/components/contact-sales-form';

export const metadata: Metadata = {
  title: 'Contact — DoveWatch',
};

// Same form + endpoint as app.dovewatch.com/contact-sales (see
// contact-sales-form.tsx / contact-sales-api.ts), embedded directly here
// instead of sending visitors to the app just to fill it out.
export default function ContactPage() {
  return (
    <Section className="text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Enterprise plan
      </p>
      <h1 className="mt-1 text-3xl font-semibold text-foreground">Contact sales</h1>
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
        Tell us about your locations and we&apos;ll follow up to build a plan that fits.
      </p>
      <ContactSalesForm />
    </Section>
  );
}
