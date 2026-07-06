# NEXT_STEPS

更新時間：2026-07-06 08:52

## 目前狀態
- `kagawa-trip-2025` 已將 concept demo 改為資料夾入口
- `npm run test:concept` 已作為 concept demo smoke test 並通過
- `README.md` 與 `NEXT_STEPS.md` 已同步記錄新 route 與驗收方式

## 下一步（立即行動）
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
