import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/footer';

describe('Footer', () => {
  it('renders the current year in the copyright line', () => {
    render(<Footer />);

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it('renders nav links to every page', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/features');
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });
});
