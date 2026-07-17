import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const STORAGE_KEY = 'kobeOkayama2026Items';
const tripPage = '/trips/kobe-okayama-2026/';
const syntheticItems = [
  {
    id: 'legacy-item',
    title: '舊資料景點',
    category: '景點',
    region: '岡山',
    note: '這筆資料刻意沒有 Trip Mode 欄位。',
    priority: '想去',
    status: '未確認',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'day3-1',
    title: '姬路城',
    category: '景點',
    region: '姬路',
    note: '很長的現場觀察備註，用來確認手機卡片不會因為內容較長而造成水平捲動或按鈕互相擠壓。',
    link: 'javascript:alert(1)',
    priority: '必去',
    status: '已確認',
    tripDay: 'Day 3',
    tripOrder: 1,
    createdAt: '2026-01-03T01:00:00.000Z',
    updatedAt: '2026-01-03T01:00:00.000Z'
  },
  {
    id: 'day3-2',
    title: '午餐候選',
    category: '美食',
    region: '姬路',
    note: '抵達後再決定。',
    priority: '想去',
    status: '未確認',
    tripDay: 'Day 3',
    tripOrder: 2,
    createdAt: '2026-01-03T02:00:00.000Z',
    updatedAt: '2026-01-03T02:00:00.000Z'
  },
  {
    id: 'day3-3',
    title: '咖啡店',
    category: '美食',
    region: '姬路',
    note: '下午休息。',
    link: 'https://example.com/cafe',
    priority: '想去',
    status: '未確認',
    tripDay: 'Day 3',
    tripOrder: 3,
    createdAt: '2026-01-03T03:00:00.000Z',
    updatedAt: '2026-01-03T03:00:00.000Z'
  },
  {
    id: 'day3-4',
    title: '晚餐候選',
    category: '美食',
    region: '神戶',
    note: '回程視時間選擇。',
    priority: '備案',
    status: '未確認',
    tripDay: 'Day 3',
    tripOrder: 4,
    createdAt: '2026-01-03T04:00:00.000Z',
    updatedAt: '2026-01-03T04:00:00.000Z'
  },
  {
    id: 'invalid-day',
    title: '錯誤日期資料',
    category: '其他',
    region: '其他',
    priority: '備案',
    status: '未確認',
    tripDay: 'Day 99',
    tripOrder: -3,
    createdAt: '2026-01-04T00:00:00.000Z',
    updatedAt: '2026-01-04T00:00:00.000Z'
  }
];

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(({ key, items }) => {
    localStorage.setItem(key, JSON.stringify(items));
  }, { key: STORAGE_KEY, items: syntheticItems });
});

test('Day 3 Trip Mode completes, advances, maps, reorders, and persists', async ({ page, context }) => {
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));

  await page.goto(tripPage);
  await page.getByRole('button', { name: '旅行模式' }).click();
  await page.getByRole('button', { name: 'Day 3', exact: true }).click();

  const stops = page.getByTestId('trip-stop');
  await expect(stops).toHaveCount(4);
  await expect(stops.nth(0)).toContainText('姬路城');
  await expect(stops.nth(1)).toContainText('午餐候選');
  await expect(stops.nth(2)).toContainText('咖啡店');
  await expect(stops.nth(3)).toContainText('晚餐候選');
  await expect(page.getByText('今日進度 0 / 4')).toBeVisible();
  await expect(page.getByTestId('next-stop')).toContainText('姬路城');

  const mapAction = stops.first().getByRole('link', { name: '在地圖中開啟' });
  await expect(mapAction).toHaveAttribute('href', /^https:\/\/www\.google\.com\/maps\/search/);
  const popupPromise = context.waitForEvent('page');
  await mapAction.click();
  const mapPage = await popupPromise;
  await expect.poll(() => mapPage.url()).toContain('google.com/maps');
  await mapPage.close();
  await expect(stops.first().getByRole('link', { name: '原始連結' })).toHaveCount(0);

  await stops.first().getByRole('button', { name: '標記完成' }).click();
  await expect(page.getByText('今日進度 1 / 4')).toBeVisible();
  await expect(page.getByTestId('next-stop')).toContainText('午餐候選');

  await stops.nth(1).getByRole('button', { name: '下移' }).click();
  await expect(stops.nth(1)).toContainText('咖啡店');
  await expect(stops.nth(2)).toContainText('午餐候選');

  await page.reload();
  await page.getByRole('button', { name: '旅行模式' }).click();
  await page.getByRole('button', { name: 'Day 3', exact: true }).click();
  await expect(page.getByText('今日進度 1 / 4')).toBeVisible();
  await expect(page.getByTestId('next-stop')).toContainText('咖啡店');
  await expect(page.getByTestId('trip-stop').first()).toContainText('取消完成');

  const storedItems = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
  expect(storedItems.find((item) => item.id === 'day3-1').isCompleted).toBe(true);
  expect(storedItems.find((item) => item.id === 'day3-2').tripOrder).toBe(3);
  expect(storedItems.find((item) => item.id === 'day3-3').tripOrder).toBe(2);
  expect(runtimeErrors).toEqual([]);

  await mkdir(resolve('test-results'), { recursive: true });
  await page.screenshot({ path: resolve('test-results', 'trip-mode-390x844.png'), fullPage: true });
});

test('legacy data, empty day, collection editing, and mobile layout remain usable', async ({ page }) => {
  await page.goto(tripPage);

  const legacyCard = page.getByRole('article').filter({ hasText: '舊資料景點' });
  await expect(legacyCard).toContainText('未排日');
  await expect(page.getByRole('article').filter({ hasText: '錯誤日期資料' })).toContainText('未排日');
  await legacyCard.getByRole('button', { name: '編輯' }).click();
  await expect(page.getByLabel('旅程日')).toHaveValue('Unscheduled');
  await expect(page.getByLabel('當日順序')).toHaveValue('1');

  await page.getByLabel('旅程日').selectOption('Day 2');
  await page.getByLabel('當日順序').fill('2');
  await page.getByRole('button', { name: '更新這筆資料' }).click();
  await expect(page.getByText('已更新資料。')).toBeVisible();

  await page.getByRole('button', { name: '旅行模式' }).click();
  await page.getByRole('button', { name: 'Day 2', exact: true }).click();
  await expect(page.getByTestId('trip-stop')).toHaveCount(1);
  await expect(page.getByTestId('trip-stop')).toContainText('舊資料景點');

  await page.getByRole('button', { name: 'Day 7', exact: true }).click();
  await expect(page.getByText('這一天還是空白的')).toBeVisible();

  await page.setViewportSize({ width: 412, height: 915 });
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasHorizontalOverflow).toBe(false);
});
