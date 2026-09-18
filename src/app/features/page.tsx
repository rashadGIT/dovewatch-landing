import type { Metadata } from 'next';
import {
  ClipboardList,
  FolderKanban,
  ListChecks,
  PenLine,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Digital intake, case management, task checklists, e-signatures, FTC GPL compliance, and grief follow-ups — everything an independent funeral home needs in one system.',
  alternates: { canonical: '/features' },
};

const features = [
  {
    icon: ClipboardList,
    title: 'Digital intake',
    body: 'A guided, mobile-friendly intake form families complete on their own time — no more handwritten packets to re-key.',
  },
  {
    icon: FolderKanban,
    title: 'Case management',
    body: 'One shared timeline per case: tasks, deadlines, contacts, and status, visible to every staff member assigned.',
  },
  {
    icon: ListChecks,
    title: 'Task checklists',
    body: 'Templated checklists per service type keep every case on track from first call to final follow-up.',
  },
  {
    icon: PenLine,
    title: 'E-signatures',
    body: 'Families sign authorizations and disclosures electronically, with a full audit trail attached to the case.',
  },
  {
    icon: ShieldCheck,
    title: 'FTC GPL compliance',
    body: 'A compliant General Price List is generated straight from your price list — no manual document upkeep.',
  },
  {
    icon: HeartHandshake,
    title: 'Grief follow-ups',
    body: 'Automatic 1-week, 1-month, 6-month, and 1-year check-in emails, scheduled the moment a case closes.',
  },
];

export default function FeaturesPage() {
  return (
    <Section>
      <h1 className="text-3xl font-semibold text-foreground">Everything a funeral home needs</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        DoveWatch replaces the spreadsheets, paper forms, and sticky notes with one system built
        specifically for how independent funeral homes work.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-shadow hover:shadow-md">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <feature.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-lg font-semibold text-foreground">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/pricing">See Pricing</ButtonLink>
      </div>
    </Section>
  );
}
