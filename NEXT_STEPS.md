# NEXT_STEPS

更新時間：2026-07-06 21:06

## 目前狀態
- `kagawa-trip-2025` 已將 concept demo 改為資料夾入口
- `npm run test:concept` 已作為 concept demo smoke test 並通過
- `README.md` 與 `NEXT_STEPS.md` 已同步記錄新 route 與驗收方式
- 已整理出 `docs/product-direction.md`，記錄太太回饋與下一階段方向
- 已補上 `docs/travel-prep-cadence.md`，把網站方向對齊旅行準備節奏

## 下一步（立即行動）
- 先不要再加功能
- 下一步優先追蹤旅行準備狀態
- 等租車天數、每日區域、必去景點較穩定後，再開始故事卡候選內容
- 若要改 UI，仍以故事卡為主入口，但現在不急
- `npm run test:concept` 仍需通過
- 手機驗收時先開主頁，再點 `./concept/`，確認頁面底部版本標記與「複製回饋給 Daniel」仍可見
- 若 concept demo 再有互動調整，先補 `tests/concept.spec.js` 的 smoke test，再同步更新 README 與 NEXT_STEPS

## 已完成
- 將 concept demo 從 `concept.html` 改為 `concept/index.html`
- 主頁 demo 連結改為 `./concept/`
- Playwright 測試路徑改為 `/trips/kobe-okayama-2026/concept/`
- `playwright.config.js` 修正 Windows 下 repoRoot 尾端斜線問題
- 建立 `package.json`
- 建立 `playwright.config.js`
- 建立 `tests/concept.spec.js`
- 補上 `.gitignore`
- 完成 concept demo smoke test 並推送
