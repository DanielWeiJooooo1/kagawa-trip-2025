import { test, expect } from '@playwright/test';
import { access, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = process.env.TRAVEL_REPO_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('concept demo smoke test', async ({ page }) => {
  await page.goto('/trips/kobe-okayama-2026/concept.html');

  await expect(page).toHaveTitle(/旅途策展小手冊/);

  const taskSection = page.locator('section').filter({ hasText: '今日任務卡 Demo' });
  const drawSection = page.locator('section').filter({ hasText: '抽一張今日靈感卡' });
  const storySection = page.locator('section').filter({ hasText: '景點故事卡' });
  const feedbackSection = page.locator('section').filter({ hasText: '給太太的回饋問題' });

  await taskSection.getByRole('checkbox').first().check();

  await drawSection.getByRole('button', { name: '抽一張今日靈感卡' }).click();

  await storySection.getByRole('button', { name: /展開|收合/ }).first().click();

  await page.locator('input[name="feedback-task"]').first().click();
  await page.locator('input[name="feedback-draw"]').first().click();
  await page.locator('input[name="feedback-story"]').first().click();
  await page.locator('input[name="feedback-post-trip"]').first().click();
  await feedbackSection.locator('input[type="radio"]').last().click();

  const note = feedbackSection.getByPlaceholder('有什麼想補充的？例如：哪裡有趣、哪裡麻煩、哪個功能最不像會用。');
  await note.fill('這是一個測試回饋');

  await expect(note).toHaveValue('這是一個測試回饋');
  await expect(page.getByText('這是一個測試回饋').nth(1)).toBeVisible();
  await expect(page.getByText('複製回饋給 Daniel')).toBeVisible();

  const screenshotPath = resolve(repoRoot, 'test-results', 'concept-demo.png');
  await mkdir(resolve(repoRoot, 'test-results'), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await access(screenshotPath);
});
