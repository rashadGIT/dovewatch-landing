import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
  outline: 'border border-border text-foreground hover:bg-secondary',
};

const buttonBaseClasses =
  'inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// A real <button> (form submit, etc.) — ButtonLink below is for navigation.
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button className={`${buttonBaseClasses} ${variantClasses[variant]} ${className}`} {...props} />
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  // Marks a link that leaves this site for the app (app.dovewatch.com) —
  // renders a small arrow so it doesn't look like a dead end / broken link
  // when the destination suddenly looks like a different product.
  external?: boolean;
  // Opens in a new tab, target="_blank" + rel="noopener noreferrer". Off by
  // default even for external links — the header's Sign In button
  // deliberately navigates in the same tab (2026-09-15 feedback); other
  // external CTAs (Select Starter/Growth, Contact Sales) opt in explicitly.
  newTab?: boolean;
}

export function ButtonLink({
  variant = 'primary',
  external = false,
  newTab = false,
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`${buttonBaseClasses} ${variantClasses[variant]} ${className}`}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && (
        <span aria-hidden="true" className="text-[0.85em] opacity-80">
          &#8599;
        </span>
      )}
    </a>
  );
}
