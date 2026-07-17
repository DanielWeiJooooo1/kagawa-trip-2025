# NEXT_STEPS

更新時間：2026-07-17 23:10

## 目前狀態
- `kagawa-trip-2025` 已將 concept demo 改為資料夾入口
- `npm run test:concept` 已作為 concept demo smoke test 並通過
- `README.md` 與 `NEXT_STEPS.md` 已同步記錄新 route 與驗收方式
- 已整理出 `docs/product-direction.md`，記錄太太回饋與下一階段方向
- 已補上 `docs/travel-prep-cadence.md`，把網站方向對齊旅行準備節奏
- 已完成 Mobile Trip Mode v0.1 程式與 synthetic Playwright acceptance，等待可執行 Chromium 的環境完成最終 browser gate

## 下一步（立即行動）
- 在允許啟動 Chromium 的環境執行 `npm run test:trip`，確認 Day 3 synthetic scenario 與兩個手機尺寸通過
- 通過後再執行 `npm test`，同時驗證 concept demo regression
- 旅行資料仍以實際準備節奏逐步設定 Day 1～Day 7，不自動改寫既有收藏
- 先不要增加即時天氣、路線最佳化、登入、同步或地圖 SDK
- 故事卡內容仍等租車天數、每日區域、必去景點較穩定後再開始

## 已完成
- Mobile Trip Mode v0.1：旅程日、同日順序、完成狀態、下一站、進度與地圖動作
- 舊 localStorage schema 向後相容，缺失或無效旅程日安全回到未安排
- 新增 `tests/trip-mode.spec.js` synthetic acceptance，不使用正式使用者資料
- 將 concept demo 從 `concept.html` 改為 `concept/index.html`
- 主頁 demo 連結改為 `./concept/`
- Playwright 測試路徑改為 `/trips/kobe-okayama-2026/concept/`
- `playwright.config.js` 修正 Windows 下 repoRoot 尾端斜線問題
- 建立 `package.json`
- 建立 `playwright.config.js`
- 建立 `tests/concept.spec.js`
- 補上 `.gitignore`
- 完成 concept demo smoke test 並推送
