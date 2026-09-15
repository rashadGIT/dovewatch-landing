import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /Funeral home operations/i }),
    ).toBeInTheDocument();
  });

  it('links the primary CTA to the pricing page, with no competing Get Started CTA', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: 'See Pricing' })).toHaveAttribute('href', '/pricing');
    expect(screen.queryByRole('link', { name: 'Get Started' })).not.toBeInTheDocument();
  });
});
