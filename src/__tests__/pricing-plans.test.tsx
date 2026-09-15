import { render, screen, waitFor } from '@testing-library/react';
import { PricingPlans } from '@/components/pricing-plans';
import { appLinks } from '@/lib/app-links';

describe('PricingPlans', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders fetched plans with links to signup, plus a static Enterprise card', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { tier: 'starter', label: 'Starter', priceCents: 9900, seatLimit: 5 },
        { tier: 'growth', label: 'Growth', priceCents: 24900, seatLimit: 15, popular: true },
      ],
    } as Response);

    render(<PricingPlans />);

    await waitFor(() => screen.getByText('$99'));

    expect(screen.getByRole('link', { name: 'Select Starter' })).toHaveAttribute(
      'href',
      appLinks.planSignup('starter'),
    );
    expect(screen.getByRole('link', { name: 'Select Growth' })).toHaveAttribute(
      'href',
      appLinks.planSignup('growth'),
    );
    expect(screen.getByText('Most popular')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact Sales' })).toHaveAttribute('href', '/contact');
  });

  it('falls back to a link to the real pricing page if the fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network error'));

    render(<PricingPlans />);

    await waitFor(() =>
      expect(screen.getByRole('link', { name: /See plans/i })).toHaveAttribute(
        'href',
        appLinks.pricing,
      ),
    );
  });
});
