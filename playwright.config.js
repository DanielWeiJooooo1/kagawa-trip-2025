import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
process.env.TRAVEL_REPO_ROOT = repoRoot;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:8001',
    trace: 'on-first-retry',
  },
  webServer: {
    command: `python -m http.server 8001 --bind 127.0.0.1 --directory "${repoRoot}"`,
    url: 'http://127.0.0.1:8001',
    reuseExistingServer: true,
  },
});
