# Codex Course Agent Guide

適用整個 repository。只修改本次任務範圍，不覆蓋既有修改或其他協作者內容。

## 專案

- VitePress 1.6.4；內容在 `docs/`。
- `npm run docs:build` 輸出至 `site/`；`site/` 不要提交。
- GitHub Pages 只在合併至 `main` 後部署。

## Git

開始前確認狀態：

```bash
git status --short --branch
git remote -v
git fetch origin --prune
```

- 工作區乾淨時，從最新 `origin/main` 建立 `codex/<task>` 分支。
- 有既有修改時，保留、避開，不還原或混入提交。
- 不使用 `git reset --hard`、`git checkout --` 或強制推送。
- 只有使用者要求時才 push、建立 PR、merge 或刪除分支。
- 提交前執行 `git diff --check`；只 stage 本次檔案。

```bash
git add <本次檔案>
git diff --cached --check
```

## 圖片

- 照片、截圖與大型視覺優先用 WebP；Logo、圖示與線條圖優先用 SVG。
- 一般圖片寬度不超過 1800px；小檔案不必為了統一格式轉檔。
- 轉檔後先更新引用、用 `rg` 確認舊副檔名已無引用，再刪除原檔。
- 大量新增或替換前，先檢查資料夾大小、檔案大小與圖片尺寸。

```bash
du -sh docs/public/images/<資料夾>
sips -g pixelWidth -g pixelHeight docs/public/images/<資料夾>/*
```

## MediaTabs 與驗證

- 首張圖片載入後，只預載同一組其他分頁；使用 `requestIdleCallback`，並提供 `setTimeout` fallback。
- 預載物件要保留可靠 reference；不要只依賴 `loading="lazy"`。
- `window`、`document`、`Image` 等瀏覽器 API 只在 mounted 後使用；mounted 時檢查首張圖片的 `complete`。
- 調整圖片或 `MediaTabs` 後執行：

```bash
npm run docs:build
git diff --check
```

- 用桌機與手機檢查無水平溢出、圖片成功載入、Console 無錯誤，且切換分頁不會重新下載圖片。
- build 後若 preview server 正在執行，先重啟再測試。
