import { test, expect, type Page } from '@playwright/test';
import { appLinks } from '../src/lib/app-links';

// The /pricing page fetches live data from the real backend (see
// plans-api.ts) — mocked here so CI doesn't depend on network access to a
// real environment and stays deterministic regardless of what's actually
// priced right now.
async function mockPlansApi(page: Page) {
  await page.route('**/signup/plans', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        { tier: 'starter', label: 'Starter', priceCents: 9900, seatLimit: 5 },
        { tier: 'growth', label: 'Growth', priceCents: 24900, seatLimit: 15, popular: true },
      ]),
    }),
  );
}

test('homepage loads and nav moves between the two real pages', async ({ page }) => {
  await mockPlansApi(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Funeral home operations/i })).toBeVisible();

  const nav = page.getByRole('banner').getByRole('navigation');
  await nav.getByRole('link', { name: 'Features' }).click();
  await expect(page).toHaveURL(/\/features/);
  await expect(page.getByRole('heading', { name: /Everything a funeral home needs/i })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Features' })).toHaveAttribute('aria-current', 'page');

  await nav.getByRole('link', { name: 'Pricing' }).click();
  await expect(page).toHaveURL(/\/pricing/);
  await expect(page.getByRole('heading', { name: /Choose a plan/i })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');

  await nav.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact/);
  await expect(page.getByRole('heading', { name: /Contact sales/i })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('button', { name: 'Send to sales' })).toBeVisible();
});

test('Sign In is the only header CTA, and every hero CTA points somewhere real', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Sign In' })).toHaveAttribute(
    'href',
    appLinks.login,
  );
  await expect(page.getByRole('link', { name: 'Get Started' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'See Pricing' })).toHaveAttribute('href', '/pricing');
  await expect(page.getByRole('link', { name: 'Talk to Sales' })).toHaveAttribute('href', '/contact');
});

test('pricing plan cards link to signup with the right plan', async ({ page }) => {
  await mockPlansApi(page);
  await page.goto('/pricing');

  await expect(page.getByRole('link', { name: 'Select Starter' })).toHaveAttribute(
    'href',
    appLinks.planSignup('starter'),
  );
  await expect(page.getByRole('link', { name: 'Select Growth' })).toHaveAttribute(
    'href',
    appLinks.planSignup('growth'),
  );
  await expect(page.getByText('Most popular')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact Sales' })).toHaveAttribute('href', '/contact');
  await expect(page.getByRole('link', { name: 'Sign In' }).last()).toHaveAttribute(
    'href',
    appLinks.login,
  );
});

test('contact form submits to the backend and shows a success state', async ({ page }) => {
  await page.route('**/contact-sales', (route) => route.fulfill({ status: 201, body: '{}' }));
  await page.goto('/contact');

  await page.getByLabel('Your name').fill('Jane Doe');
  await page.getByLabel('Work email').fill('jane@example.com');
  await page.getByLabel('Funeral home name').fill('Doe Family Funeral Home');
  await page.getByLabel('Number of locations').fill('5');
  await page.getByRole('button', { name: 'Send to sales' }).click();

  await expect(page.getByText('Request received')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to pricing' })).toHaveAttribute(
    'href',
    '/pricing',
  );
});
