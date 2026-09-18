import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

// next dev loads .env.local automatically (so the rendered page can pick up
// a local NEXT_PUBLIC_APP_ORIGIN override); this test-runner process doesn't
// get that for free, so the smoke test's assertions (imported from
// src/lib/app-links) would otherwise check against prod URLs even while the
// page under test shows local ones. Minimal manual load — no dotenv
// dependency needed for one optional file.
const envLocalPath = path.resolve(__dirname, '.env.local');
if (existsSync(envLocalPath)) {
  for (const line of readFileSync(envLocalPath, 'utf-8').split('\n')) {
    const match = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/.exec(line);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2] ?? '';
    }
  }
}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3100',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3100',
        reuseExistingServer: !process.env.CI,
        // Lets the cookie-consent e2e spec exercise the real banner instead
        // of it no-op'ing the way it does with no GA ID configured (e.g.
        // local dev without this var set).
        env: { ...process.env, NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-E2ETEST' },
      },
});
