import type { ReactNode } from 'react';

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto w-full max-w-5xl px-6 py-16 ${className}`}>{children}</section>
  );
}
