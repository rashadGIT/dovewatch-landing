import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookieConsent } from '@/components/cookie-consent';

const STORAGE_KEY = 'dovewatch-cookie-consent';

jest.mock('@/lib/analytics', () => ({
  GA_MEASUREMENT_ID: 'G-TEST123',
}));

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the banner on a first visit with no prior choice', async () => {
    render(<CookieConsent />);

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument(),
    );
  });

  it('hides the banner and remembers the choice after accepting', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(await screen.findByRole('button', { name: 'Accept' }));

    expect(screen.queryByRole('button', { name: 'Accept' })).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('accepted');
  });

  it('hides the banner and remembers the choice after declining', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(await screen.findByRole('button', { name: 'Decline' }));

    expect(screen.queryByRole('button', { name: 'Decline' })).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('declined');
  });

  it('does not show the banner again once a choice was already stored', async () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    render(<CookieConsent />);

    await waitFor(() => expect(screen.queryByRole('button', { name: 'Accept' })).not.toBeInTheDocument());
  });
});
