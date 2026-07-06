# kagawa-trip-2025

## Objective
這個 repo 是 `2026 神戶岡山之旅` 的靜態網站。主頁仍保留原本高松網站，`trips/kobe-okayama-2026/` 則承載神戶岡山旅程內容與 concept demo。

## Topology
- `index.html`：根目錄主站，保留原本高松網站
- `trips/kobe-okayama-2026/index.html`：神戶岡山旅程主頁
- `trips/kobe-okayama-2026/concept/index.html`：旅途策展 concept demo
- `tests/concept.spec.js`：Playwright smoke test
- `playwright.config.js`：本機靜態站驗收設定

## Route Notes
- 主頁的「查看旅途策展 Demo」連結指向 `./concept/`
- 若手機曾快取舊版，請優先直接開 `trips/kobe-okayama-2026/concept/`
- Demo 內保留回饋流程、複製按鈕與 fallback textarea

## Index
- `npm run test:concept`
- `npm run test:concept:headed`
- `npm run test:concept:ui`

## Constraints
- 不修改根目錄 `index.html`
- 不接 Firebase、登入、多人同步、圖片上傳、地圖或交通時間計算
- 以 GitHub Pages 靜態站為準
- Playwright 測試輸出保留在 `test-results/`，不納入版本控管
