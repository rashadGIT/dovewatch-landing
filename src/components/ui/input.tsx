import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const fieldClasses =
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={fieldClasses} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={fieldClasses} {...props} />;
}
