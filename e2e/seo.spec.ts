import { test, expect } from '@playwright/test';

const routes = ['/', '/features', '/pricing', '/contact', '/privacy'];

for (const route of routes) {
  test(`${route || '/'} has title, description, canonical, and OG/Twitter tags`, async ({
    page,
  }) => {
    await page.goto(route);

    await expect(page).toHaveTitle(/DoveWatch/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://dovewatch.com${route === '/' ? '' : route}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://dovewatch.com/opengraph-image.png',
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
  });
}

test('home page JSON-LD declares DoveWatch as an Organization', async ({ page }) => {
  await page.goto('/');

  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  const parsed = JSON.parse(jsonLd ?? '{}');

  expect(parsed['@context']).toBe('https://schema.org');
  const organization = parsed['@graph'].find((entry: { '@type': string }) => entry['@type'] === 'Organization');
  expect(organization).toMatchObject({ name: 'DoveWatch', url: 'https://dovewatch.com' });
});

test('robots.txt allows crawling and points at the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('User-Agent: *');
  expect(body).toContain('Allow: /');
  expect(body).toContain('User-Agent: GPTBot');
  expect(body).toContain('Sitemap: https://dovewatch.com/sitemap.xml');
});

test('sitemap.xml lists every real page', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);

  const body = await response.text();
  for (const route of routes) {
    expect(body).toContain(`https://dovewatch.com${route === '/' ? '' : route}`);
  }
});
