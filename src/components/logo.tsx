// Abstract mark (no external asset) — a wing/flight glyph in a filled
// rounded-square badge, the standard "icon + wordmark" SaaS logo pattern.
// Stands in for a real logo until one exists.
function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M7 20c2.5-1 5.5-1 7 1 1-5 4.5-9 10-10.5-1.5 3-1.5 5.5 0 8-4 1-8 1-10.5-1-1 2-3.5 3-6.5 2.5Z"
        fill="white"
      />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-foreground ${className}`}>
      <LogoMark className="h-7 w-7 text-primary" />
      DoveWatch
    </span>
  );
}
