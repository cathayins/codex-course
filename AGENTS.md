# Codex Course Agent Guide

本檔案適用於整個 repository。後續處理 Git、GitHub、GitHub Pages、VitePress 或圖片素材時，先依照這裡的流程執行，避免重複踩到已知問題。

## 專案基本資訊

- 網站使用 VitePress 1.6.4，內容位於 `docs/`。
- `docs/public/` 內的檔案會原樣複製到輸出；Vite 不會自動壓縮這些圖片。
- `npm run docs:build` 的輸出位於已忽略版本控制的 `site/`，不要提交 `site/`。
- GitHub Pages 只會在 `main` 的指定路徑變更時部署，規則以 `.github/workflows/pages.yml` 為準。
- 不要修改不在當次任務範圍內的進階課程或其他協作者內容。

## 開始修改前的 Git 流程

每次都先確認目前分支與工作區：

```bash
git status --short --branch
git remote -v
git fetch origin --prune
```

若上一個 PR 已合併，不能繼續從舊分支往下做。工作區乾淨後，先同步 `main`，再開新分支：

```bash
git switch main
git merge --ff-only origin/main
git switch -c codex/<清楚的任務名稱>
```

注意事項：

- 不要只看本機 `main`；它可能落後已合併的 remote commit。
- 優先使用 `git merge --ff-only origin/main`，避免在同步時意外產生 merge commit。
- 若工作區有既有修改，先判斷是否為使用者或其他協作者的內容；不得覆蓋、還原或混入 commit。
- 工作途中若出現不是自己造成的新修改，先停止並詢問使用者。
- 不使用 `git reset --hard`、`git checkout --` 或強制推送，除非使用者明確要求並了解影響。

## Commit、Push 與 PR

提交前依序檢查：

```bash
git diff --check
git status --short
git add <本次任務的檔案>
git diff --cached --stat
git diff --cached --check
```

Commit message 要說明成果，不使用 `update files` 這類模糊訊息。建議格式：

```text
<type>: <具體成果>

<為什麼修改、主要做法、會影響哪些畫面或流程>
```

推送目前分支：

```bash
git push -u origin HEAD
```

GitHub 專案使用 **Pull Request（PR）**；使用者說 MR 時也視為 PR。操作邊界如下：

- 使用者只說「push」：只推送，不自行建立 PR。
- 使用者說「發 MR／PR 到 main」：推送後使用 `gh pr create --base main` 建立 PR。
- 使用者說「merge」：先確認 checks，再執行 merge；不要從「建立 PR」自行推定為「可以 merge」。
- 建立 PR 時清楚寫出修改內容、測試方式與可能風險，不只使用 `--fill` 產生含糊內容。

常用指令：

```bash
gh repo view
gh pr create --base main --title "<標題>" --body "<修改與測試說明>"
gh pr checks --watch
gh pr view --json state,mergedAt,mergeCommit,url
```

## Merge 後與 GitHub Pages 部署

Feature branch 推上 GitHub 不會更新正式網站；只有合併進 `main` 後，Pages workflow 才會部署。

合併後的確認順序：

1. 使用 `gh pr view` 確認 PR 真的已合併。
2. `git fetch origin --prune`，再讓本機 `main` fast-forward 到 `origin/main`。
3. 使用 `gh run list` 或 `gh run watch` 確認 Pages workflow 成功。
4. 開啟正式網站時使用 hard refresh，並確認請求的是新檔名，而不是舊快取。
5. 若正式站沒有變更，先檢查 workflow、部署 commit 與資產 URL，不要直接重做內容。

正式站資源由 GitHub Pages／CDN 快取。曾觀察到圖片回應約為 `Cache-Control: max-age=600`，首次 edge cache miss 仍可能超過一秒，因此不能只靠瀏覽器快取解決圖片延遲。

## 分支清理

只刪除使用者明確指定、且屬於本次工作的分支。不要批次清掉 remote，也不要碰其他協作者分支。

```bash
git switch main
git branch -d <已合併的本機分支>
git push origin --delete <同一個 remote 分支>
git fetch origin --prune
```

- `git branch -D` 只在使用者明確要求強制刪除時使用。
- 刪除前再次核對完整分支名稱與 merge 狀態。
- 清理後以 `git branch -vv` 和 remote branch list 確認只刪到目標分支。

## 圖片載入與檔案大小

### 先找出真正的瓶頸

新增或替換大量圖片時，先檢查格式、尺寸與總量：

```bash
du -sh docs/public/images/<資料夾>
find docs/public/images/<資料夾> -type f -maxdepth 1 -print0 | xargs -0 du -k | sort -nr
sips -g pixelWidth -g pixelHeight docs/public/images/<資料夾>/*
```

已知問題：`MediaTabs.vue` 只會把目前分頁的圖片放進 DOM。若其他分頁使用大型 PNG，使用者第一次點擊時才開始下載，因此會看到 1–3 秒空白；第二次切換才會因快取變快。

### 圖片格式規則

- 照片、App 截圖與大幅課程視覺優先使用 WebP。
- Logo、圖示與線條圖優先使用 SVG；很小且已有透明需求的 PNG 可以保留。
- 一般內容區不需要超過 1800px 寬；超過時縮至 1800px，避免傳輸原始 Retina 尺寸。
- 截圖可先用 `cwebp -q 88 -sharp_yuv`，再目視確認細字、程式碼與 UI 邊界。
- 不要為了統一格式而轉換只有幾十 KB 的圖片；先衡量實際收益。
- 轉檔後先更新所有引用，再用 `rg` 確認舊副檔名已無引用，最後才刪除原檔。

轉換範例：

```bash
cwebp -quiet -mt -m 6 -q 88 -sharp_yuv -resize 1800 0 input.png -o output.webp
```

這次 QuickStart 的 21 張大型 PNG 轉成 WebP 後，整個圖片資料夾約由 14 MB 降到 3 MB。後續若新增同類素材，應維持相近的檔案預算。

### 水平分頁的預載規則

圖片壓縮完成後，再預載「同一個 `MediaTabs` 群組」的其他圖片：

- 首張圖片優先顯示。
- 首張載入後，使用 `requestIdleCallback` 預載其他分頁；不支援時用短時間 `setTimeout` fallback。
- 只預載同組圖片，不要一次預載整站圖片。
- 不要只加 `loading="lazy"`；未選取的 tab 根本還沒有 `<img>`，lazy loading 無法讓第一次點擊變快。
- 使用動態 `<link rel="preload" as="image">` 或確保 `Image` 物件在載入完成前有可靠 reference。單純建立 `new Image()` 且 reference 未被實際使用，可能被 bundler tree-shake 或在下載前被回收。

### SSR 與 hydration 注意事項

VitePress 會先產生 SSR HTML。首張圖片可能在 Vue hydration 完成前就已載入，因此不能只監聽 `@load`：

- 保留 `@load` 與 `@error` 作為正常路徑。
- `onMounted` 時也檢查圖片 element 的 `complete`；若已完成，仍要排入預載。
- 所有 `window`、`document`、`Image` 與 `requestIdleCallback` 操作只能在 client mounted 之後執行。

## 圖片與互動驗證

每次調整圖片或 `MediaTabs` 後至少完成：

```bash
npm run docs:build
git diff --check
```

接著使用本機 preview 與瀏覽器檢查：

1. 桌機與手機頁面都沒有水平 overflow。
2. 所有 `<img>` 的 `complete` 為 true 且 `naturalWidth > 0`。
3. Console 沒有 404、hydration 或資源格式錯誤。
4. 等背景預載完成後，點擊其他圖片 tab。
5. 點擊前後的 image response 數量應相同，代表圖片已從 cache 顯示，而不是點擊後才下載。

重要：如果在 preview server 運行期間重新執行 `npm run docs:build`，必須重新啟動 preview server。VitePress 產生的 asset filename 會帶 hash；舊 server／舊 HTML 與新輸出混用時可能產生 404，造成錯誤的測試結論。

## 完成條件

交付前確認：

- 修改是從最新 `origin/main` 建立的新分支開始。
- 沒有混入其他協作者或不在範圍內的修改。
- `npm run docs:build` 成功。
- `git diff --check` 成功。
- 圖片引用不存在 404，第一次 tab 切換不會重新下載大型圖片。
- Commit message 與 PR 說明清楚描述成果及驗證方式。
- Push、建立 PR、merge、刪分支與部署操作都沒有超出使用者當次授權。
