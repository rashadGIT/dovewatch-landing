import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <Logo className="text-sm" />
        <nav className="flex items-center gap-6">
          <Link href="/features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
        <span>&copy; {new Date().getFullYear()} DoveWatch. All rights reserved.</span>
      </div>
    </footer>
  );
}
