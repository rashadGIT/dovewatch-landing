import Link from 'next/link';
import { ClipboardList, FolderKanban, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';

const highlights = [
  {
    icon: ClipboardList,
    title: 'Digital intake',
    body: 'Replace paper intake packets with a guided online form families can complete from anywhere.',
  },
  {
    icon: FolderKanban,
    title: 'Case management',
    body: 'Track every case, task, and deadline from first call through service, in one shared view.',
  },
  {
    icon: ShieldCheck,
    title: 'FTC GPL compliance',
    body: 'Generate a compliant General Price List automatically from your price list, every time.',
  },
  {
    icon: HeartHandshake,
    title: 'Grief follow-ups',
    body: 'Automatic 1-week, 1-month, 6-month, and 1-year check-ins with every family you serve.',
  },
];

const steps = [
  {
    number: '1',
    title: 'Families complete intake online',
    body: 'A guided form replaces the paper packet — no re-keying handwritten details back at the office.',
  },
  {
    number: '2',
    title: 'Your team runs the case in one place',
    body: 'Tasks, deadlines, contacts, and e-signatures live on one shared timeline your whole staff can see.',
  },
  {
    number: '3',
    title: 'DoveWatch handles what comes after',
    body: 'The GPL, follow-up emails, and compliance paperwork generate themselves — nothing falls through.',
  },
];

export default function HomePage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
        >
          <div className="h-72 w-[36rem] rounded-full bg-primary/10 blur-3xl" />
        </div>
        <Section className="text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Built for independent funeral homes
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Funeral home operations, without the paperwork
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            DoveWatch brings intake, case management, e-signatures, and compliance into one system
            built for independent funeral homes.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <ButtonLink href="/pricing">See Pricing</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Talk to Sales
            </ButtonLink>
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <Card key={item.title} className="transition-shadow hover:shadow-md">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/features" className="text-sm font-medium text-primary hover:underline">
            See all features &rarr;
          </Link>
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-center text-2xl font-semibold text-foreground">How it works</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
