import { test, expect } from '@playwright/test';

test.describe('cookie consent banner', () => {
  test('shows on first visit and dismisses after accepting, remembered on reload', async ({
    page,
  }) => {
    await page.goto('/');

    const banner = page.getByText('We use cookies to understand how visitors use this site.');
    await expect(banner).toBeVisible();

    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(banner).not.toBeVisible();

    await page.reload();
    await expect(banner).not.toBeVisible();
  });

  test('declining dismisses the banner without showing it again on reload', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Decline' }).click();
    await expect(page.getByRole('button', { name: 'Decline' })).not.toBeVisible();

    await page.reload();
    await expect(page.getByRole('button', { name: 'Decline' })).not.toBeVisible();
  });
});
