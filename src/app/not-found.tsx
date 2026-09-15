import { Section } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';

// `next build` with output: 'export' emits this as a static out/404.html —
// see infrastructure/lib/stacks/landing-stack.ts's CloudFront error
// response mapping, which routes both 403 (denied by OAC) and 404 here.
export default function NotFound() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </Section>
  );
}
