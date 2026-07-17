# Kobe–Okayama Mobile Trip Mode v0.1

更新時間：2026-07-17 23:10

## Purpose

Trip Mode 讓旅行途中用手機選擇 Day 1～Day 7，快速看到當日站點順序、完成進度與下一站。它不取代去趣 App、Excel 或正式交通規劃；原本的收藏、篩選、新增、編輯、刪除與 starter data 仍保留在「收藏與編輯」。

## Usage

1. 在「收藏與編輯」替項目設定旅程日與當日順序。
2. 切換到「旅行模式」，選擇 Day 1～Day 7。
3. 依序開啟地圖、標記完成；進度與下一站會即時更新。
4. 若需調整順序，可在 stop card 使用「上移」或「下移」。

## Data Migration and Storage

- 沿用 `localStorage` key：`kobeOkayama2026Items`。
- 新欄位為 `tripDay`、`tripOrder`、`isCompleted`、`completedAt`。
- 舊資料缺少欄位時，讀取預設為 `Unscheduled`、順序 `1`、未完成；不清空 storage、不改 item id、不建立 duplicate。
- 無效旅程日會安全回到 `Unscheduled`，無效順序會回到 `1`。
- 完成切換與同日上移/下移會立即保存；重新整理後仍保留。
- 合併 starter data 不覆蓋既有項目；確認重置時，相同 starter item 仍保留既有旅程日、順序與完成狀態。

## Map and Link Safety

- 合法的 Google Maps URL 會直接使用；沒有 map URL 時，以標題、地區與日本產生 Google Maps 搜尋 URL。
- 原始連結只接受 `http:` 或 `https:`，並使用 `noopener noreferrer` 開啟；不安全 scheme 不會渲染成連結。

## Mobile Acceptance

執行 `npm run test:trip`。測試使用隔離的 synthetic Day 3：姬路城、午餐候選、咖啡店、晚餐候選，驗證四站順序、地圖 action、完成後進度 1/4、下一站移動、排序與 reload persistence；另驗證 390×844、412×915、舊 schema、invalid day、空白日與收藏編輯 regression。

本次 sandbox 阻擋 Chromium process（`browserType.launch: spawn EPERM`），內建 Browser 也禁止 localhost navigation。因此測試規格已建立，但 checkpoint 前仍須在可啟動 Chromium 的環境重跑並取得綠燈與 screenshot。

## Limitations and Deferred

- 不做 GPS、即時天氣、列車 API、自動路線最佳化、登入、多人同步、後端、推播、地圖 SDK 或 PWA 重構。
- 同日排序採數字與上移/下移，不提供 drag and drop。
- 旅程資料只存在目前瀏覽器的 localStorage，不會跨裝置同步。

## Rollback

若需回退 UI，可 revert Trip Mode commit。舊版本會忽略新增欄位；原有欄位與 item identity 仍可讀。回退前不要清除 `kobeOkayama2026Items`，日後恢復新版即可再次讀到旅程日與完成狀態。
