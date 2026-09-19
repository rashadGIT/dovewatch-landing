import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header';
import { appLinks } from '@/lib/app-links';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('Header', () => {
  it('links Sign In to the real app, with no competing Get Started CTA', () => {
    render(<Header />);

    const signIn = screen.getByRole('link', { name: 'Sign In' });
    expect(signIn).toHaveAttribute('href', appLinks.login);
    expect(signIn).not.toHaveAttribute('target');
    expect(screen.queryByRole('link', { name: 'Get Started' })).not.toBeInTheDocument();
  });

  // QA #1 — the menu scrolled away with the page.
  it('stays pinned to the top of the viewport while scrolling', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header?.className).toMatch(/\bsticky\b/);
    expect(header?.className).toMatch(/\btop-0\b/);
    expect(header?.className).toMatch(/\bz-40\b/);
  });

  it('renders nav links to every page', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/features');
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('marks the current page as active in the nav', () => {
    (jest.requireMock('next/navigation') as { usePathname: jest.Mock }).usePathname.mockReturnValue(
      '/pricing',
    );
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Features' })).not.toHaveAttribute('aria-current');
  });
});
